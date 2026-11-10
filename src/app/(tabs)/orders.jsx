import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { sampleOrders } from '../../data';

export default function OrdersScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [expandedId, setExpandedId] = useState('ORD-8419');
  const [activeTab, setActiveTab] = useState('All');

  const orderTabs = ['All', 'Packed', 'On way now', 'Delivered'];

  const filteredOrders = sampleOrders.filter((o) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Packed' && o.status === 'Packed') return true;
    if (activeTab === 'On way now' && o.status === 'On way now') return true;
    if (activeTab === 'Delivered' && o.status === 'Delivered') return true;
    return false;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>YOUR ORDERS</Text>
      </View>

      {/* Status Filter Tabs matching Artboard 18 & 18.2 */}
      <View style={styles.tabsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {orderTabs.map((t) => {
            const isSelected = t === activeTab;
            return (
              <TouchableOpacity
                key={t}
                style={[
                  styles.tabPill,
                  {
                    backgroundColor: isSelected ? colors.primary : theme.card,
                    borderColor: isSelected ? colors.primary : theme.border,
                  },
                ]}
                onPress={() => setActiveTab(t)}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: isSelected ? colors.white : theme.text },
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filteredOrders.map((ord) => {
          const isExpanded = expandedId === ord.id;
          const isActive = ord.status === 'On way now' || ord.status === 'Packed';

          return (
            <View
              key={ord.id}
              style={[
                styles.orderCard,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              {/* Card Header */}
              <TouchableOpacity
                onPress={() => setExpandedId(isExpanded ? null : ord.id)}
                activeOpacity={0.8}
              >
                <View style={styles.topRow}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.kitchenRow}>
                      <Text style={[styles.kitchenName, { color: theme.text }]}>
                        {ord.kitchenName}
                      </Text>
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor:
                              ord.status === 'On way now'
                                ? colors.primarySoft
                                : ord.status === 'Delivered'
                                ? '#E8FAF2'
                                : '#FEE2E2',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            {
                              color:
                                ord.status === 'On way now'
                                  ? colors.primary
                                  : ord.status === 'Delivered'
                                  ? colors.secondary
                                  : colors.danger,
                            },
                          ]}
                        >
                          {ord.status}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.addressText, { color: theme.subText }]} numberOfLines={1}>
                      {ord.kitchenAddress}
                    </Text>
                  </View>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colors.gray}
                    style={{ marginLeft: 8 }}
                  />
                </View>

                {/* Timeline status indicator */}
                <View style={styles.metaInfoRow}>
                  <Text style={[styles.orderedTime, { color: theme.subText }]}>
                    Ordered at {ord.orderedTime} {ord.orderDate ? (" • " + ord.orderDate) : ''}
                  </Text>
                  <Text style={[styles.deliveryMode, { color: colors.secondary }]}>
                    {ord.deliveryType}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Expandable Order Details matching Artboard 18.5 */}
              {isExpanded && (
                <View style={styles.expandedSection}>
                  <View style={[styles.divider, { backgroundColor: theme.border }]} />
                  <Text style={[styles.sectionSubtitle, { color: theme.text }]}>Your Order</Text>
                  {ord.items.map((item, idx) => (
                    <View key={idx} style={styles.itemRow}>
                      <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.itemQty, { color: theme.subText }]}>x {item.qty}</Text>
                        <Text style={[styles.itemPrice, { color: theme.text }]}>
                          ₹{(item.price * item.qty).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  ))}

                  <View style={[styles.divider, { backgroundColor: theme.border }]} />
                  <View style={styles.totalRow}>
                    <Text style={[styles.totalLabel, { color: theme.text }]}>Amount paid</Text>
                    <Text style={[styles.totalVal, { color: colors.primary }]}>
                      Rs {ord.amountPaid.toFixed(2)}
                    </Text>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionsRow}>
                    {isActive ? (
                      <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                        onPress={() => router.push('/tracking')}
                      >
                        <Ionicons name="navigate" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={styles.actionBtnText}>TRACK ORDER</Text>
                      </TouchableOpacity>
                    ) : ord.status === 'Delivered' ? (
                      <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: colors.secondary }]}
                        onPress={() => router.push('/rating')}
                      >
                        <Ionicons name="star" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={styles.actionBtnText}>RATE ORDER</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tabsRow: {
    marginVertical: 10,
  },
  tabScroll: {
    paddingHorizontal: 20,
  },
  tabPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 8,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  orderCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  kitchenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  kitchenName: {
    fontSize: 17,
    fontWeight: '800',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  addressText: {
    fontSize: 12,
  },
  metaInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  orderedTime: {
    fontSize: 12,
    fontWeight: '500',
  },
  deliveryMode: {
    fontSize: 12,
    fontWeight: '700',
  },
  expandedSection: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    marginVertical: 10,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  itemQty: {
    fontSize: 12,
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
  },
  totalVal: {
    fontSize: 16,
    fontWeight: '900',
  },
  actionsRow: {
    marginTop: 14,
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: radius.md,
  },
  actionBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
