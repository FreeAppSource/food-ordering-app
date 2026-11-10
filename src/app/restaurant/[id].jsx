import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../../theme';
import { kitchens } from '../../data';
import { resolveFoodImage } from '../../assets/images';
import MenuItemCard from '../../components/MenuItemCard';

export default function KitchenListingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();

  const kitchen = kitchens.find((k) => k.id === id) || kitchens[0];
  const [searchKitchenQuery, setSearchKitchenQuery] = useState('');
  const [quantities, setQuantities] = useState({
    m101: 1,
    m103: 1,
  });

  const updateQuantity = (itemId, delta) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [itemId]: updated };
    });
  };

  const totalItemsCount = Object.values(quantities).reduce((sum, q) => sum + q, 0);

  const filteredMenu = kitchen.menu.filter((m) =>
    m.name.toLowerCase().includes(searchKitchenQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Banner with Back Button */}
        <View style={styles.bannerContainer}>
          <Image
            source={resolveFoodImage(kitchen.image)}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={20} color="#232D33" />
          </TouchableOpacity>
        </View>

        {/* Kitchen Info Card matching Artboard 12 */}
        <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.headerRow}>
            <Text style={[styles.kitchenName, { color: theme.text }]}>
              {kitchen.name.toUpperCase()}
            </Text>
            {kitchen.isPureVeg && (
              <View style={styles.pureVegBadge}>
                <View style={styles.vegSquare}>
                  <View style={styles.vegDot} />
                </View>
                <Text style={styles.pureVegText}>Pure veg</Text>
              </View>
            )}
          </View>

          <Text style={[styles.tagline, { color: theme.subText }]}>{kitchen.tagline}</Text>
          <Text style={[styles.addressText, { color: theme.subText }]}>{kitchen.address}</Text>

          {/* Stats Badges: 30+ ratings, 5.0, Est. delivery 15min */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={15} color={colors.warning} />
              <Text style={[styles.statBold, { color: theme.text }]}> {Number(kitchen.rating).toFixed(1)} </Text>
              <Text style={{ color: theme.subText, fontSize: 12 }}>({kitchen.ratingsCount})</Text>
            </View>
            <Text style={styles.statDot}>•</Text>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={15} color={colors.primary} />
              <Text style={[styles.statBold, { color: theme.text }]}> {kitchen.deliveryTime}</Text>
              <Text style={{ color: theme.subText, fontSize: 12 }}> Est. delivery</Text>
            </View>
          </View>
        </View>

        {/* Search within this kitchen items */}
        <View style={[styles.searchBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Ionicons name="search" size={18} color={colors.primary} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            value={searchKitchenQuery}
            onChangeText={setSearchKitchenQuery}
            placeholder="search this kitchen items"
            placeholderTextColor={colors.gray}
          />
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionHeading, { color: theme.text }]}>Menu</Text>
          {filteredMenu.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              quantity={quantities[item.id] || 0}
              onAdd={() => updateQuantity(item.id, 1)}
              onIncrement={() => updateQuantity(item.id, 1)}
              onDecrement={() => updateQuantity(item.id, -1)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Bottom Bar: Cart Summary & View Cart */}
      {totalItemsCount > 0 && (
        <View style={[styles.bottomBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
          <View>
            <Text style={[styles.itemSummaryText, { color: theme.text }]}>
              {totalItemsCount} item{totalItemsCount > 1 ? 's' : ''} added
            </Text>
            <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '800' }}>
              Vendor total: ₹320.50
            </Text>
          </View>

          <TouchableOpacity
            style={styles.viewCartBtn}
            onPress={() => router.push('/cart')}
            activeOpacity={0.85}
          >
            <Text style={styles.viewCartBtnText}>View Cart</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 90,
  },
  bannerContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  infoCard: {
    margin: 16,
    padding: 18,
    borderRadius: radius.lg,
    borderWidth: 1,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  kitchenName: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  pureVegBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8FAF2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  vegSquare: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  vegDot: {
    width: 5,
    height: 5,
    borderRadius: 2,
    backgroundColor: colors.secondary,
  },
  pureVegText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.secondary,
  },
  tagline: {
    fontSize: 13,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 12,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statBold: {
    fontSize: 13,
    fontWeight: '800',
  },
  statDot: {
    marginHorizontal: 10,
    color: colors.gray,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    height: 46,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  itemSummaryText: {
    fontSize: 14,
    fontWeight: '800',
  },
  viewCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: radius.full,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  viewCartBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
