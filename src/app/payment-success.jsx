import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import Button from '../components/Button';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-sharp" size={56} color="#FFFFFF" />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>Bindaaz!</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Payment successful. Redirecting you to your orders.
        </Text>

        <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.row}>
            <Text style={{ color: theme.subText }}>Order ID</Text>
            <Text style={{ color: theme.text, fontWeight: '700' }}>#ORD-8419</Text>
          </View>
          <View style={[styles.row, { marginTop: 8 }]}>
            <Text style={{ color: theme.subText }}>Kitchen</Text>
            <Text style={{ color: theme.text, fontWeight: '700' }}>Mariam’s Homefood</Text>
          </View>
          <View style={[styles.row, { marginTop: 8 }]}>
            <Text style={{ color: theme.subText }}>Est. Arrival</Text>
            <Text style={{ color: colors.secondary, fontWeight: '800' }}>15 Mins</Text>
          </View>
        </View>

        <Button
          title="Track Order Live"
          onPress={() => router.replace('/tracking')}
          style={styles.actionBtn}
        />

        <TouchableOpacity
          style={styles.ordersLink}
          onPress={() => router.replace('/(tabs)/orders')}
        >
          <Text style={{ color: colors.gray, fontSize: 14, fontWeight: '700' }}>
            View All Orders
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  infoCard: {
    width: '100%',
    padding: 18,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: 28,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    width: '100%',
    marginBottom: 14,
  },
  ordersLink: {
    paddingVertical: 8,
  },
});
