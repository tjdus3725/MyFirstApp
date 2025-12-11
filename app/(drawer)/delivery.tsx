import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
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

  const [formFields, setFormFields] = useState<FormField[]>([
    { id: "recipientName", label: "수령자 이름", placeholder: "최서연", value: "" },
    { id: "address", label: "주소", placeholder: "chltjdus", value: "" },
    { id: "orderItems", label: "주문 물품", placeholder: "ex) 음식, 서류 등 / 주문 상세 내역", value: "" },
  ]);

  const [orderDetails, setOrderDetails] = useState<string>("");

  const handleFieldChange = (id: string, value: string) => {
    setFormFields((prevFields) =>
      prevFields.map((field) => field.id === id ? { ...field, value } : field)
    );
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

          {/* 헤더 영역 수정 */}
          <View style={styles.header}>
            <Text style={styles.headerLogo}>RoboQuick</Text>

            <View style={styles.headerIcons}>
              {/* 알림 아이콘 */}
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="notifications-outline" size={24} color="#1b285c" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <Ionicons name="menu-outline" size={24} color="#1b285c" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Ionicons name="cart" size={24} color="#1b285c" />
            <Text style={styles.titleText}>배달 주문하기</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.fieldsContainer}>
              {formFields.map((field) => (
                <View key={field.id} style={styles.inputRow}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{field.label}</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={field.value}
                    onChangeText={(text) => handleFieldChange(field.id, text)}
                    placeholder={field.placeholder}
                    placeholderTextColor="#A0A0A0"
                  />
                </View>
              ))}
            </View>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                value={orderDetails}
                onChangeText={setOrderDetails}
                placeholder="주문 상세 내용 (선택사항)"
                placeholderTextColor="#A0A0A0"
                multiline={true} numberOfLines={3} textAlignVertical="top"
              />
            </View>
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.8} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>주문 접수</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    paddingBottom: 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  headerLogo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3D56'
  },
  // 헤더 아이콘 스타일 추가
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 8
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b285c'
  },
  formCard: {
    marginHorizontal: 20,
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    padding: 20
  },
  fieldsContainer: {
    marginBottom: 20
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 10,
    marginBottom: 10
  },
  labelContainer: {
    width: 90
  },
  labelText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f193e'
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingVertical: 5
  },
  textAreaContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 15,
    marginBottom: 25,
    height: 120
  },
  textArea: {
    flex: 1,
    fontSize: 15,
    color: '#333'
  },
  submitButton: {
    backgroundColor: '#4966d5',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  submitButtonText: {
    color: '#e3eafe',
    fontSize: 18,
    fontWeight: 'bold'
  },
});