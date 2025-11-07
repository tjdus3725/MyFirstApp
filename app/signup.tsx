import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert //완료 알림창
  ,


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

  const handleSignUp = () => {
    // (나중에 여기에 아이디 중복확인, 비밀번호 일치 여부 등 로직 추가)

    // 1. 완료 알림창 띄우기 (선택 사항)
    Alert.alert(
      "회원가입 완료",
      "로그인 화면으로 이동합니다.",
      [
        // 2. 알림창의 '확인' 버튼을 누르면 로그인 페이지로 이동
        { text: "확인", onPress: () => router.push('/login') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* 2. View 대신 ScrollView를 사용합니다. */}
      {/* contentContainerStyle을 사용해 내부 요소를 중앙 정렬합니다. */}
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled" // 키보드 외 영역 터치 시 키보드 닫기
      >
        <Text style={styles.title}>회원가입</Text>

        {/* 아이디 + 중복확인 버튼 */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputInRow} // 3. 행 내부의 TextInput 스타일
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
          secureTextEntry // 비밀번호 가리기
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
          keyboardType="phone-pad" // 숫자 키패드
        />

        {/* 소속 연구실 / 강의실 */}
        <TextInput
          style={styles.input}
          placeholder="소속 연구실 / 강의실"
          placeholderTextColor="#AAAAAA"
          value={lab}
          onChangeText={setLab}
        />

        {/* 회원가입 버튼 */}
        <TouchableOpacity
          style={styles.button} 
          activeOpacity={0.8}
          onPress={handleSignUp}>
        
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>

      </ScrollView>
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
    flexGrow: 1, // 4. ScrollView에서 flex: 1 대신 flexGrow: 1 사용
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30, // 스크롤을 위해 상하 패딩 추가
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3F3D56',
    marginBottom: 40,
  },
  // 5. 아이디 + 중복확인 버튼 행 스타일
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 25,
  },
  // 6. 행 내부의 TextInput 스타일 (flex: 1로 공간 차지)
  inputInRow: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingLeft: 5,
  },
  // 7. 중복확인 버튼 스타일
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
  // 8. 일반 TextInput 스타일
  input: {
    width: '90%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 25,
    fontSize: 16,
    paddingLeft: 5,
  },
  // 9. 메인 회원가입 버튼
  button: {
    backgroundColor: '#6A5AE0',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});