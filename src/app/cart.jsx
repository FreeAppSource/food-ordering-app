import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { initialCartItems, currentUser } from '../data';
import { resolveFoodImage } from '../assets/images';
import Header from '../components/Header';
import Button from '../components/Button';

export default function CartScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  // Mode: 'delivery' (Artboard 15) | 'pickup' (Artboard 14)
  const [deliveryMode, setDeliveryMode] = useState('delivery');
  const [items, setItems] = useState(initialCartItems);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Bill calculations based on Sketch artboards 13 & 14 & 15
  const vendorPayable = 320.50;
  const deliveryFee = deliveryMode === 'delivery' ? 30.00 : 0.00;
  const discount = 10.00;
  const totalAmount = deliveryMode === 'delivery' ? 340.50 : 310.50;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <Header title="YOUR CART" showBack showCart={false} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Delivery vs Self-Pickup Toggle (Artboard 13 & 14) */}
        <Text style={[styles.toggleSectionTitle, { color: theme.text }]}>
          How do you want your food?
        </Text>

        <View style={[styles.toggleContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              deliveryMode === 'delivery' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setDeliveryMode('delivery')}
          >
            <Ionicons
              name="bicycle"
              size={18}
              color={deliveryMode === 'delivery' ? '#FFFFFF' : colors.gray}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.toggleText,
                { color: deliveryMode === 'delivery' ? '#FFFFFF' : theme.text },
              ]}
            >
              Delivery nearby
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              deliveryMode === 'pickup' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setDeliveryMode('pickup')}
          >
            <Ionicons
              name="storefront"
              size={18}
              color={deliveryMode === 'pickup' ? '#FFFFFF' : colors.gray}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.toggleText,
                { color: deliveryMode === 'pickup' ? '#FFFFFF' : theme.text },
              ]}
            >
              Self pickup
            </Text>
          </TouchableOpacity>
        </View>

        {/* Self pickup notice matching Artboard 14 */}
        {deliveryMode === 'pickup' && (
          <View style={styles.pickupNotice}>
            <Ionicons name="information-circle-outline" size={18} color={colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.pickupNoticeText}>
              We’ll show you kitchen address after payment
            </Text>
          </View>
        )}

        {/* Delivery address box matching Artboard 15 */}
        {deliveryMode === 'delivery' && (
          <View style={[styles.addressBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.addressLeft}>
              <Ionicons name="location" size={18} color={colors.primary} style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.addrLabel, { color: theme.text }]}>Delivery Address</Text>
                <Text style={[styles.addrText, { color: theme.subText }]} numberOfLines={1}>
                  {currentUser.address}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Cart Items List */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Items in Cart</Text>

        {items.map((item) => (
          <View
            key={item.id}
            style={[styles.itemCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={styles.itemInfo}>
              <View style={styles.vegBadgeRow}>
                <View style={styles.vegBadge}>
                  <View style={styles.vegDot} />
                </View>
                <Text style={styles.weightText}>{item.weight}</Text>
              </View>
              <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
                <Text style={[styles.itemPrice, { color: colors.primary }]}>Rs {item.price}</Text>
                {item.oldPrice && (
                  <Text style={styles.oldPrice}>(was Rs {item.oldPrice})</Text>
                )}
              </View>
            </View>

            {/* Stepper with - and + matching Artboards 13 & 15 */}
            <View style={styles.stepperWrap}>
              <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => updateQty(item.id, -1)}
              >
                <Ionicons name="remove" size={16} color={colors.primary} />
              </TouchableOpacity>
              <Text style={[styles.stepQty, { color: theme.text }]}>{item.qty}</Text>
              <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => updateQty(item.id, 1)}
              >
                <Ionicons name="add" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Bill Breakdown matching Artboard 13 & 15 */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 16 }]}>Bill Details</Text>

        <View style={[styles.billCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: theme.subText }]}>Payable to vendor</Text>
            <Text style={[styles.billValue, { color: theme.text }]}>₹{vendorPayable.toFixed(2)}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: theme.subText }]}>Delivery (based on distance)</Text>
            <Text style={[styles.billValue, { color: deliveryMode === 'pickup' ? colors.secondary : theme.text }]}>
              {deliveryMode === 'pickup' ? 'NA' : `₹${deliveryFee.toFixed(2)}`}
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: colors.secondary }]}>Discounts</Text>
            <Text style={[styles.billValue, { color: colors.secondary }]}>- ₹{discount.toFixed(2)}</Text>
          </View>

          <View style={[styles.billDivider, { backgroundColor: theme.border }]} />

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>Total Amount</Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>
              ₹{totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Proceed to Address & Billing */}
        <Button
          title={`Proceed to Checkout • ₹${totalAmount.toFixed(2)}`}
          onPress={() =>
            router.push({
              pathname: '/checkout',
              params: {
                total: totalAmount.toString(),
                mode: deliveryMode,
              },
            })
          }
          style={styles.checkoutBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scroll: {
    paddingBottom: 32,
  },
  toggleSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: radius.md,
    borderWidth: 1,
    padding: 4,
    marginBottom: 12,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: radius.sm,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '800',
  },
  pickupNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    padding: 12,
    borderRadius: radius.md,
    marginBottom: 16,
  },
  pickupNoticeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    flex: 1,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: 16,
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addrLabel: {
    fontSize: 13,
    fontWeight: '800',
  },
  addrText: {
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  vegBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  vegBadge: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  vegDot: {
    width: 5,
    height: 5,
    borderRadius: 2,
    backgroundColor: colors.secondary,
  },
  weightText: {
    fontSize: 11,
    color: colors.gray,
    fontWeight: '600',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 11,
    color: colors.gray,
    textDecorationLine: 'line-through',
  },
  stepperWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.full,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  stepBtn: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepQty: {
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: 8,
  },
  billCard: {
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: 20,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 13,
  },
  billValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  billDivider: {
    height: 1,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  checkoutBtn: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
});
