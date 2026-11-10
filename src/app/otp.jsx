import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';
import Header from '../components/Header';
import Button from '../components/Button';

export default function OTPVerifyScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const { theme } = useTheme();

  const [digits, setDigits] = useState(['7', '2', '0', '0']);
  const [modalState, setModalState] = useState(null); // 'success' | 'fail' | null
  const [resendStatus, setResendStatus] = useState('');

  const handleVerify = () => {
    // Show Bindaaz! success dialog matching Artboard 7
    setModalState('success');
  };

  const handleResend = () => {
    setResendStatus('OTP code sent successfully!');
    setTimeout(() => setResendStatus(''), 3000);
  };

  const handleSuccessOk = () => {
    setModalState(null);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <Header showBack showCart={false} />

      <View style={styles.content}>
        <View style={styles.headingBox}>
          <Text style={[styles.title, { color: theme.text }]}>VERIFY OTP</Text>
          <Text style={[styles.subtitle, { color: theme.subText }]}>
            Please enter the 4-digit code we sent to your phone number
          </Text>
          <Text style={styles.phoneHighlight}>{phone || '+91 7200083726'}</Text>
        </View>

        {/* 4 Digit Boxes */}
        <View style={styles.otpRow}>
          {digits.map((digit, idx) => (
            <View
              key={idx}
              style={[
                styles.box,
                { backgroundColor: theme.card, borderColor: digit ? colors.primary : theme.border },
              ]}
            >
              <Text style={[styles.boxText, { color: theme.text }]}>{digit}</Text>
            </View>
          ))}
        </View>

        {/* Resend Link */}
        <TouchableOpacity style={styles.resendBtn} onPress={handleResend}>
          <Text style={styles.resendText}>Tap here to Resend</Text>
        </TouchableOpacity>

        {resendStatus ? <Text style={styles.statusText}>{resendStatus}</Text> : null}

        {/* Verify Button */}
        <Button
          title="Verify"
          onPress={handleVerify}
          style={styles.verifyBtn}
        />

        {/* Demo Fail Toggle for Artboard 7 Fail test */}
        <TouchableOpacity
          style={styles.failToggle}
          onPress={() => setModalState('fail')}
        >
          <Text style={{ color: colors.gray, fontSize: 12 }}>Simulate Error State</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal: Artboard 7 success */}
      <Modal
        visible={modalState === 'success'}
        transparent
        animationType="fade"
        onRequestClose={() => setModalState(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <View style={[styles.modalIconWrap, { backgroundColor: '#E8FAF2' }]}>
              <Ionicons name="checkmark-circle" size={52} color={colors.secondary} />
            </View>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Bindaaz!</Text>
            <Text style={[styles.modalDesc, { color: theme.subText }]}>
              You have successfully verified your account details.
            </Text>
            <Button
              title="Okay"
              onPress={handleSuccessOk}
              style={styles.modalBtn}
            />
          </View>
        </View>
      </Modal>

      {/* Fail Modal: Artboard 7 fail */}
      <Modal
        visible={modalState === 'fail'}
        transparent
        animationType="fade"
        onRequestClose={() => setModalState(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <View style={[styles.modalIconWrap, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="alert-circle" size={52} color={colors.danger} />
            </View>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Oh Snap!</Text>
            <Text style={[styles.modalDesc, { color: theme.subText }]}>
              Looks like something went wrong. Please start over or contact us.
            </Text>
            <Button
              title="okay"
              onPress={() => setModalState(null)}
              style={[styles.modalBtn, { backgroundColor: colors.danger }]}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    marginTop: 20,
  },
  headingBox: {
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  phoneHighlight: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  box: {
    width: 68,
    height: 68,
    borderRadius: radius.md,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 26,
    fontWeight: '800',
  },
  resendBtn: {
    alignSelf: 'center',
    marginBottom: 28,
  },
  resendText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  statusText: {
    textAlign: 'center',
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
  },
  verifyBtn: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  failToggle: {
    alignSelf: 'center',
    marginTop: 24,
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    borderRadius: radius.lg,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  modalIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalBtn: {
    width: '100%',
  },
});
