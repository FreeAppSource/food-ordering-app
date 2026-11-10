import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { currentUser } from '../../data';
import { resolveFoodImage } from '../../assets/images';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile Header matching Artboard 19 */}
        <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Image
            source={resolveFoodImage('0e668540fa875b704c56f2478c355783c5df073b')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={[styles.name, { color: theme.text }]}>{currentUser.altName}</Text>
          <Text style={[styles.phone, { color: colors.primary }]}>{currentUser.phone}</Text>
          <Text style={[styles.address, { color: theme.subText }]} numberOfLines={2}>
            {currentUser.altAddress}
          </Text>
        </View>

        {/* Account Menu Items matching Artboard 19: Account info, Notifications, About us, Logout */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Account & Settings</Text>

        <View style={[styles.menuCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push('/cart')}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="person-outline" size={20} color={colors.primary} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: theme.text }]}>Account info</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gray} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push('/tracking')}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="location-outline" size={20} color={colors.secondary} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: theme.text }]}>Delivery Addresses</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gray} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => Alert.alert('Notifications', 'Push notifications are currently active.')}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="notifications-outline" size={20} color={colors.warning} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: theme.text }]}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gray} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons
                name={isDark ? 'sunny-outline' : 'moon-outline'}
                size={20}
                color={colors.primary}
                style={styles.menuIcon}
              />
              <Text style={[styles.menuText, { color: theme.text }]}>Dark Mode</Text>
            </View>
            <Text style={{ color: colors.gray, fontSize: 13, fontWeight: '700' }}>
              {isDark ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => Alert.alert('About Khaika', 'Khaika empowers women homemakers with clean, healthy, and authentic homemade food delivery across Coimbatore.')}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="information-circle-outline" size={20} color={colors.slate} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: theme.text }]}>About us</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace('/login')}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.danger} style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginVertical: 16,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  address: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  menuCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 14,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '700',
  },
  divider: {
    height: 1,
  },
  logoutBtn: {
    marginTop: 28,
    height: 50,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.danger,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '800',
  },
});
