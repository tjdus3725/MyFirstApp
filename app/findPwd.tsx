import { useRouter } from 'expo-router'; // 페이지 이동을 위해 import
import React, { useState } from 'react';
import {
  Alert // 알림창 추가
  ,

  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FindPasswordScreen() {
  const router = useRouter(); // router 사용
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');

  // '비밀번호 변경' 버튼 클릭 시 실행
  const handleChangePassword = () => {
    // (나중에 실제 비밀번호 변경 로직 추가)

    // 임시로 알림창 띄우고 로그인 페이지로 이동
    Alert.alert(
      "비밀번호 변경",
      "비밀번호 변경이 완료되었습니다. 로그인 페이지로 이동합니다.",
      [
        { text: "확인", onPress: () => router.push('/login') } // 로그인 페이지로 이동
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>비밀번호 찾기</Text>

        <TextInput
          style={styles.input}
          placeholder="사용자 이름"
          placeholderTextColor="#AAAAAA"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="사용자 ID"
          placeholderTextColor="#AAAAAA"
          value={id}
          onChangeText={setId}
        />

        <TextInput
          style={styles.input}
          placeholder="휴대폰 번호"
          placeholderTextColor="#AAAAAA"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleChangePassword} // 버튼에 함수 연결
        >
          <Text style={styles.buttonText}>비밀번호 변경</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// 스타일 시트 (findId.tsx와 동일)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3F3D56',
    marginBottom: 40,
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