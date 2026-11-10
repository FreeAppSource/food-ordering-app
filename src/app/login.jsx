import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';
import { resolveFoodImage } from '../assets/images';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [phone, setPhone] = useState('+91 7200083726');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 600);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Header bar */}
          <View style={styles.navRow}>
            <TouchableOpacity
              style={[styles.backBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.navTitle, { color: theme.text }]}>Khaika</Text>
            <View style={{ width: 44 }} />
          </View>

          {/* Banner Graphic */}
          <View style={styles.bannerContainer}>
            <Image
              source={resolveFoodImage('b55dac2553d42721d23f4af9986628a0ceb85424')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>

          {/* Header Titles */}
          <View style={styles.headingBox}>
            <Text style={[styles.title, { color: theme.text }]}>WELCOME BACK</Text>
            <Text style={[styles.subtitle, { color: theme.subText }]}>
              Login with your registered phone number to taste authentic homemade delicacies.
            </Text>
          </View>

          {/* Form */}
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <InputField
              label="Phone number"
              value={phone}
              onChangeText={setPhone}
              placeholder="+91 7200083726"
              keyboardType="phone-pad"
              icon="call-outline"
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry
              icon="lock-closed-outline"
            />

            <TouchableOpacity style={styles.forgotRow} onPress={() => router.push('/otp')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginBtn}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={{ color: theme.subText, fontSize: 14 }}>New to Khaika? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '700' }}>
                Sign up here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    flexGrow: 1,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },
  bannerContainer: {
    height: 120,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginVertical: 12,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  headingBox: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    padding: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: -4,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  loginBtn: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
});
