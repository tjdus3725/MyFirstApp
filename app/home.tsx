import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // 아이콘 라이브러리
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 프로필 데이터 타입 정의
interface ProfileField {
  label: string;
  value: string;
}

export default function MyPage() {
  const profileData: ProfileField[] = [
    { label: "이름", value: "최서연" },
    { label: "아이디", value: "chltjdus" },
    { label: "전화번호", value: "010-0000-0000" },
    { label: "주소", value: "405" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>

        {/* 헤더 영역 */}
        <View style={styles.header}>
          {/* 로고 대신 텍스트나 아이콘 사용 */}
          <Text style={styles.headerLogo}>RoboQuick</Text>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#1b285c" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="menu-outline" size={24} color="#1b285c" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 1. 빠른 주문 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="#1b285c" />
            <Text style={styles.sectionTitle}>빠른 주문</Text>
          </View>

          <View style={styles.quickOrderButtons}>
            <TouchableOpacity style={[styles.roundButton, styles.blueButton]}>
              <Text style={styles.blueButtonText}>주문하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.roundButton, styles.lightBlueButton]}>
              <Text style={styles.lightBlueButtonText}>QR 보기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. 프로필 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="person-outline" size={24} color="#1b285c" />
            <Text style={styles.sectionTitle}>프로필</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.profileInfoContainer}>
              {profileData.map((field, index) => (
                <View key={index} style={styles.profileRow}>
                  <Text style={styles.profileLabel}>{field.label}</Text>
                  <Text style={styles.profileValue}>{field.value}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.outlineButton}>
              <Text style={styles.outlineButtonText}>내 정보 변경</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. 현재 주문 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="cart-outline" size={24} color="#1b285c" />
            <Text style={styles.sectionTitle}>현재 주문</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.emptyText}>현재 진행 중인 주문이 없습니다</Text>
          </View>
        </View>

      </ScrollView>
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
  // 헤더 스타일
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLogo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3D56',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  // 공통 섹션 스타일
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b285c',
  },
  // 버튼 스타일
  quickOrderButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  roundButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueButton: {
    backgroundColor: '#4966d5',
  },
  lightBlueButton: {
    backgroundColor: '#becffe',
  },
  blueButtonText: {
    color: '#e3eafe',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightBlueButtonText: {
    color: '#33499e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // 카드 스타일 (프로필, 주문 등)
  card: {
    backgroundColor: '#F5F7FA', // 연한 회색 배경 (이미지의 bg-color-duplicate 대체)
    borderRadius: 20,
    padding: 25,
  },
  profileInfoContainer: {
    marginBottom: 20,
    gap: 10,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLabel: {
    width: 80, // 라벨 너비 고정
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f193e',
  },
  profileValue: {
    fontSize: 15,
    color: '#555',
  },
  outlineButton: {
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1b285c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#1b285c',
    fontSize: 14,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 14,
  },
});