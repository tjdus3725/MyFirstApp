import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// 1. 'react-native-safe-area-context'에서 SafeAreaView를 import 합니다.
import { SafeAreaView } from 'react-native-safe-area-context';
// 2. Link만 import 하고, 사용하지 않는 useRouter는 제거했습니다.
import { Link } from 'expo-router';

export default function LoginScreen() {
  // 3. 사용하지 않는 router 변수를 제거했습니다.
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* 로그인 타이틀 */}
        <Text style={styles.title}>로그인</Text>

        {/* 아이디 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#AAAAAA"
          value={id}
          onChangeText={setId}
        />

        {/* 비밀번호 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#AAAAAA"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // 비밀번호 가리기
        />

        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

        {/* 하단 링크 (비밀번호 찾기 등) */}
        <View style={styles.linksContainer}>
          <Link href="/findPwd" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.separator}>|</Text>
          <Link href="/findID" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>아이디 찾기</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.separator}>|</Text>
          {/* '회원가입' 텍스트는 Link로 감싸서 /signup으로 이동시킵니다. */}
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>회원가입</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </View>
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
    flex: 1,
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
  linksContainer: {
    flexDirection: 'row',
    marginTop: 30,
    width: '80%',
    justifyContent: 'space-around',
  },
  linkText: {
    color: '#8A8A8A',
    fontSize: 14,
  },
  separator: {
    color: '#E0E0E0',
    fontSize: 14,
  },
});