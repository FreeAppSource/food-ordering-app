import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { deliveryAgent, currentUser } from '../data';
import { resolveFoodImage } from '../assets/images';

export default function TrackingScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>LIVE TRACKING</Text>
          <Text style={{ color: colors.secondary, fontSize: 11, fontWeight: '800' }}>ORDER #ORD-8419</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      {/* Map View matching Artboard 20 */}
      <View style={styles.mapContainer}>
        <Image
          source={resolveFoodImage('9f5bb826b2776f97a9a3c4d0e5a3d0f845b857ae')}
          style={styles.mapImage}
          resizeMode="cover"
        />

        {/* ETA badge on Map matching Artboard 20: 2 min */}
        <View style={styles.etaBadge}>
          <Text style={styles.etaNumber}>{deliveryAgent.eta}</Text>
          <Text style={styles.etaText}>AWAY</Text>
        </View>

        {/* Vehicle / Rider Pin */}
        <View style={styles.riderPin}>
          <View style={styles.riderPinCircle}>
            <Ionicons name="bicycle" size={18} color="#FFFFFF" />
          </View>
        </View>
      </View>

      {/* Delivery Agent & Address Card matching Artboard 20 */}
      <View style={[styles.bottomCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.agentRow}>
          <Image
            source={resolveFoodImage(deliveryAgent.avatar)}
            style={styles.agentAvatar}
            resizeMode="cover"
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.agentName, { color: theme.text }]}>{deliveryAgent.name}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color={colors.warning} style={{ marginRight: 3 }} />
              <Text style={[styles.ratingText, { color: theme.text }]}>{Number(deliveryAgent.rating).toFixed(1)} </Text>
              <Text style={{ color: theme.subText, fontSize: 12 }}>({deliveryAgent.ratingsCount})</Text>
            </View>
            <Text style={[styles.vehicleInfo, { color: theme.subText }]}>{deliveryAgent.vehicle}</Text>
          </View>

          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => Alert.alert('Calling Khaika Hero', `Connecting you to ${deliveryAgent.name} (${deliveryAgent.phone})`)}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Delivery Address matching Artboard 20 */}
        <View style={styles.addressSection}>
          <Text style={styles.addressHeader}>DELIVERY ADDRESS</Text>
          <Text style={[styles.addressText, { color: theme.text }]}>{currentUser.address}</Text>
        </View>

        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => router.push('/(tabs)/orders')}
        >
          <Text style={styles.doneBtnText}>Back to Orders</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  etaBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  etaNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
  },
  etaText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.gray,
    letterSpacing: 0.5,
  },
  riderPin: {
    position: 'absolute',
    top: '45%',
    left: '52%',
  },
  riderPinCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  bottomCard: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    padding: 20,
    paddingBottom: 32,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '800',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
  },
  vehicleInfo: {
    fontSize: 11,
    marginTop: 2,
  },
  callBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  addressSection: {
    marginBottom: 16,
  },
  addressHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  doneBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  doneBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
});
