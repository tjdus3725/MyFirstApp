import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert, // 1. 추가됨
  FlatList // 2. 추가됨
  ,


  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [lab, setLab] = useState('');

  // 3. 모달 상태 관리 변수 추가
  const [isModalVisible, setModalVisible] = useState(false);
  // 101호 ~ 137호 데이터 생성
  const range1 = Array.from({ length: 37 }, (_, i) => (101 + i).toString());
  // 301호 ~ 338호 데이터 생성
  const range2 = Array.from({ length: 38 }, (_, i) => (301 + i).toString());

  const roomData = [...range1, ...range2];

  const handleSignUp = () => {
    // 간단한 유효성 검사 예시
    if (!id || !name || !password || !phone || !lab) {
      Alert.alert("알림", "모든 정보를 입력해주세요.");
      return;
    }

    Alert.alert(
      "회원가입 완료",
      "로그인 화면으로 이동합니다.",
      [
        { text: "확인", onPress: () => router.push('/login') }
      ]
    );
  };

  // 5. 강의실 선택 함수
  const handleSelectRoom = (selectedRoom: string) => {
    setLab(selectedRoom);
    setModalVisible(false); // 선택 후 모달 닫기
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>회원가입</Text>

        {/* 아이디 + 중복확인 버튼 */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputInRow}
            placeholder="아이디"
            placeholderTextColor="#AAAAAA"
            value={id}
            onChangeText={setId}
          />
          <TouchableOpacity style={styles.checkButton} activeOpacity={0.7}>
            <Text style={styles.checkButtonText}>중복확인</Text>
          </TouchableOpacity>
        </View>

        {/* 이름 */}
        <TextInput
          style={styles.input}
          placeholder="이름"
          placeholderTextColor="#AAAAAA"
          value={name}
          onChangeText={setName}
        />

        {/* 비밀번호 */}
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#AAAAAA"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* 비밀번호 확인 */}
        <TextInput
          style={styles.input}
          placeholder="비밀번호 다시 입력하기"
          placeholderTextColor="#AAAAAA"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* 휴대폰 번호 */}
        <TextInput
          style={styles.input}
          placeholder="휴대폰 번호"
          placeholderTextColor="#AAAAAA"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.selectText, !lab && { color: '#AAAAAA' }]}>
            {lab ? `${lab}호` : "소속 연구실 / 강의실 (선택)"}
          </Text>
        </TouchableOpacity>

        {/* 회원가입 버튼 */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleSignUp}>

          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>

      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>강의실 선택</Text>

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

// 스타일 시트
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3F3D56',
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 25,
  },
  inputInRow: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingLeft: 5,
  },
  checkButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 10,
  },
  checkButtonText: {
    color: '#666666',
    fontSize: 13,
  },
  input: {
    width: '90%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 25,
    fontSize: 16,
    paddingLeft: 5,
  },
  selectButton: {
    width: '90%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 25,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  selectText: {
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#4966d5',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // 반투명 배경
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '60%', // 모달 높이
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
    color: '#3F3D56',
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