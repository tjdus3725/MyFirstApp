import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert, // 추가
  FlatList // 추가
  ,

  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  value: string;
}

export default function DeliveryScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  // 1. 모달 상태 변수 추가
  const [isModalVisible, setModalVisible] = useState(false);

  // 2. 강의실 데이터 생성 (101~137, 301~338)
  const roomData = [
    ...Array.from({ length: 37 }, (_, i) => (101 + i).toString()),
    ...Array.from({ length: 38 }, (_, i) => (301 + i).toString())
  ];

  const [formFields, setFormFields] = useState<FormField[]>([
    { id: "recipientName", label: "수령자 이름", placeholder: "최서연", value: "" },
    { id: "address", label: "주소", placeholder: "주소 선택", value: "" },
    { id: "orderItems", label: "주문 물품", placeholder: "ex) 음식, 서류 등 / 주문 상세 내역", value: "" },
  ]);

  const [orderDetails, setOrderDetails] = useState<string>("");

  const handleFieldChange = (id: string, value: string) => {
    setFormFields((prevFields) =>
      prevFields.map((field) => field.id === id ? { ...field, value } : field)
    );
  };

  // 3. 주소 선택 핸들러
  const handleSelectRoom = (selectedRoom: string) => {
    handleFieldChange('address', selectedRoom);
    setModalVisible(false);
  };

  const handleSubmit = () => {
    const recipientName = formFields.find(f => f.id === 'recipientName')?.value || "";
    const address = formFields.find(f => f.id === 'address')?.value || "";
    const orderItems = formFields.find(f => f.id === 'orderItems')?.value || "";

    if (recipientName.trim() === "" || address.trim() === "" || orderItems.trim() === "") {
      Alert.alert("알림", "수령자 이름, 주소, 주문 물품은 필수 입력 항목입니다.");
      return;
    }

    Alert.alert("주문 접수 완료", "성공적으로 주문이 접수되었습니다.", [
      { text: "확인", onPress: () => router.replace('/(drawer)/home') }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* 1. 헤더 영역 */}
          <View style={styles.header}>
            <Text style={styles.headerLogo}>Delivery Order</Text>

            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="notifications-outline" size={24} color="#1b285c" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <Ionicons name="menu-outline" size={28} color="#1b285c" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contentWrapper}>
            {/* 2. 타이틀 (아이콘 + 텍스트) */}
            <View style={styles.titleContainer}>
              <Ionicons name="cart-outline" size={24} color="#1b285c" />
              <Text style={styles.titleText}>주문하기</Text>
            </View>

            {/* 3. 입력 폼 영역 */}
            <View style={styles.formContainer}>
              {/* 기본 입력 필드 (밑줄 스타일) */}
              <View style={styles.fieldsContainer}>
                {formFields.map((field) => (
                  <View key={field.id} style={styles.inputRow}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.labelText}>{field.label}</Text>
                    </View>

                    {/* 👇 [수정됨] 주소 필드는 버튼으로, 나머지는 입력창으로 표시 */}
                    {field.id === 'address' ? (
                      <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => setModalVisible(true)}
                      >
                        <Text style={[styles.inputText, { color: '#333' }]}>
                          {field.value ? `${field.value}호` : field.placeholder}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TextInput
                        style={styles.input}
                        value={field.value}
                        onChangeText={(text) => handleFieldChange(field.id, text)}
                        placeholder={field.placeholder}
                        placeholderTextColor="#999"
                      />
                    )}
                  </View>
                ))}
              </View>

              {/* 상세 내용 (회색 박스 스타일) */}
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  value={orderDetails}
                  onChangeText={setOrderDetails}
                  placeholder="주문 내용"
                  placeholderTextColor="#999"
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* 4. 주문 접수 버튼 */}
              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>주문 접수</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* 5. 주소 선택 모달 추가 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>배달 장소 선택</Text>

            <View style={styles.listContainer}>
              <FlatList
                data={roomData}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleSelectRoom(item)}
                  >
                    <Text style={styles.modalItemText}>{item}호</Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={true}
              />
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerLogo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1b285c',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  iconButton: {
    padding: 0,
  },
  contentWrapper: {
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b285c',
  },
  formContainer: {
    width: '100%',
  },
  fieldsContainer: {
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  labelContainer: {
    width: 100,
  },
  labelText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1b285c',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1',
  },
  // 선택 버튼 스타일 (input과 동일하게 보이도록)
  selectButton: {
    flex: 1,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1',
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 15,
    color: '#333',
  },
  textAreaContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    padding: 20,
    marginBottom: 40,
    height: 150,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4966d5',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#4966d5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1b285c',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 15,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    backgroundColor: '#4966d5',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});