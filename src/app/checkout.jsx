import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { currentUser } from '../data';
import { resolveFoodImage } from '../assets/images';
import Header from '../components/Header';
import Button from '../components/Button';

export default function CheckoutScreen() {
  const router = useRouter();
  const { total, mode } = useLocalSearchParams();
  const { theme } = useTheme();

  const [currentStep, setCurrentStep] = useState(1); // 1: Contact info, 2: Payment
  const [address, setAddress] = useState(currentUser.address);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [tempAddress, setTempAddress] = useState(currentUser.address);
  const [selectedPayment, setSelectedPayment] = useState('paytm');

  const finalTotal = total || '340.50';

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      router.replace('/payment-success');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <Header title="ADDRESS & BILLING" showBack showCart={false} />

      {/* Step Indicator matching Artboard 15.5 & 16 */}
      <View style={styles.stepIndicator}>
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep >= 1 && styles.stepActiveCircle]}>
            <Text style={[styles.stepNumber, currentStep >= 1 && styles.stepActiveNumber]}>1</Text>
          </View>
          <Text style={[styles.stepLabel, { color: currentStep >= 1 ? colors.primary : colors.gray }]}>
            Contact info
          </Text>
        </View>

        <View style={[styles.stepConnector, { backgroundColor: currentStep === 2 ? colors.primary : colors.lightGray }]} />

        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep === 2 && styles.stepActiveCircle]}>
            <Text style={[styles.stepNumber, currentStep === 2 && styles.stepActiveNumber]}>2</Text>
          </View>
          <Text style={[styles.stepLabel, { color: currentStep === 2 ? colors.primary : colors.gray }]}>
            Payment
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {currentStep === 1 ? (
          <>
            {/* Contact Info Card */}
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.cardHeading, { color: theme.text }]}>Personal Details</Text>

              <View style={styles.infoField}>
                <Text style={[styles.fieldLabel, { color: theme.subText }]}>Name</Text>
                <Text style={[styles.fieldValue, { color: theme.text }]}>{currentUser.name}</Text>
              </View>

              <View style={styles.infoField}>
                <Text style={[styles.fieldLabel, { color: theme.subText }]}>Phone Number</Text>
                <Text style={[styles.fieldValue, { color: theme.text }]}>{currentUser.phone}</Text>
              </View>

              <View style={styles.infoField}>
                <Text style={[styles.fieldLabel, { color: theme.subText }]}>Email Address</Text>
                <Text style={[styles.fieldValue, { color: theme.text }]}>{currentUser.email}</Text>
              </View>
            </View>

            {/* Delivery Address Card matching Artboard 15.5 & 16 */}
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, marginTop: 16 }]}>
              <View style={styles.cardHeaderRow}>
                <Text style={[styles.cardHeading, { color: theme.text }]}>Delivery Address</Text>
                <TouchableOpacity onPress={() => setShowEditAddressModal(true)}>
                  <Text style={styles.editActionText}>Edit</Text>
                </TouchableOpacity>
              </View>

              <Text style={[styles.addressContent, { color: theme.text }]}>{address}</Text>

              <TouchableOpacity
                style={styles.addNewAddrBtn}
                onPress={() => setShowEditAddressModal(true)}
              >
                <Ionicons name="add-circle-outline" size={18} color={colors.primary} style={{ marginRight: 6 }} />
                <Text style={styles.addNewAddrText}>Add New / Change Pin</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Payment Options matching Artboard 16 */}
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Select Payment Method</Text>

            <TouchableOpacity
              style={[
                styles.paymentOptionCard,
                { backgroundColor: theme.card, borderColor: selectedPayment === 'paytm' ? colors.primary : theme.border },
              ]}
              onPress={() => setSelectedPayment('paytm')}
            >
              <View style={styles.payOptionLeft}>
                <Image
                  source={resolveFoodImage('f09ec7b664239421028c35cf45de65f845e595d8')}
                  style={styles.paytmLogo}
                  resizeMode="contain"
                />
                <View>
                  <Text style={[styles.paymentTitle, { color: theme.text }]}>Paytm / UPI</Text>
                  <Text style={{ color: theme.subText, fontSize: 12 }}>Google Pay, PhonePe, UPI ID</Text>
                </View>
              </View>
              <View style={[styles.radioCircle, selectedPayment === 'paytm' && styles.radioActive]}>
                {selectedPayment === 'paytm' && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOptionCard,
                { backgroundColor: theme.card, borderColor: selectedPayment === 'card' ? colors.primary : theme.border },
              ]}
              onPress={() => setSelectedPayment('card')}
            >
              <View style={styles.payOptionLeft}>
                <Ionicons name="card-outline" size={24} color={colors.primary} style={{ marginRight: 14 }} />
                <View>
                  <Text style={[styles.paymentTitle, { color: theme.text }]}>Credit / Debit Card</Text>
                  <Text style={{ color: theme.subText, fontSize: 12 }}>Visa, MasterCard, RuPay</Text>
                </View>
              </View>
              <View style={[styles.radioCircle, selectedPayment === 'card' && styles.radioActive]}>
                {selectedPayment === 'card' && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOptionCard,
                { backgroundColor: theme.card, borderColor: selectedPayment === 'cod' ? colors.primary : theme.border },
              ]}
              onPress={() => setSelectedPayment('cod')}
            >
              <View style={styles.payOptionLeft}>
                <Ionicons name="cash-outline" size={24} color={colors.secondary} style={{ marginRight: 14 }} />
                <View>
                  <Text style={[styles.paymentTitle, { color: theme.text }]}>Cash on Delivery</Text>
                  <Text style={{ color: theme.subText, fontSize: 12 }}>Pay warm food upon doorstep receipt</Text>
                </View>
              </View>
              <View style={[styles.radioCircle, selectedPayment === 'cod' && styles.radioActive]}>
                {selectedPayment === 'cod' && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          </>
        )}

        {/* Continue Button */}
        <Button
          title={currentStep === 1 ? 'Continue' : `Pay ₹${finalTotal}`}
          onPress={handleContinue}
          style={styles.continueBtn}
        />
      </ScrollView>

      {/* Edit Address Modal matching Artboard 15.5 new address copy */}
      <Modal
        visible={showEditAddressModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEditAddressModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.addressModalCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Delivery Address</Text>
            <Text style={[styles.modalSub, { color: theme.subText }]}>
              Move the Marker above to drop a pin on your address
            </Text>

            {/* Map Preview */}
            <View style={styles.mapWrap}>
              <Image
                source={resolveFoodImage('9f5bb826b2776f97a9a3c4d0e5a3d0f845b857ae')}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <View style={styles.pinCenter}>
                <Ionicons name="location" size={32} color={colors.primary} />
              </View>
            </View>

            <TextInput
              style={[styles.addrInput, { backgroundColor: theme.bg, color: theme.text, borderColor: theme.border }]}
              value={tempAddress}
              onChangeText={setTempAddress}
              multiline
              numberOfLines={3}
            />

            <View style={styles.modalBtnRow}>
              <Button
                title="Save"
                onPress={() => {
                  setAddress(tempAddress);
                  setShowEditAddressModal(false);
                }}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepActiveCircle: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.gray,
  },
  stepActiveNumber: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  stepConnector: {
    width: 60,
    height: 2,
    marginHorizontal: 12,
    marginTop: -16,
  },
  scroll: {
    paddingBottom: 36,
  },
  card: {
    padding: 18,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editActionText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  infoField: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  addressContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  addNewAddrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addNewAddrText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
  },
  paymentOptionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  payOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paytmLogo: {
    width: 44,
    height: 28,
    marginRight: 12,
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  continueBtn: {
    marginTop: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  addressModalCard: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 12,
    marginBottom: 14,
  },
  mapWrap: {
    height: 180,
    borderRadius: radius.md,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 14,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pinCenter: {
    position: 'absolute',
    top: '40%',
    left: '48%',
  },
  addrInput: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: 12,
    fontSize: 14,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  modalBtnRow: {
    flexDirection: 'row',
  },
});
