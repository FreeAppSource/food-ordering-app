import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { currentUser, locations, foodCategories, kitchens } from '../../data';
import RestaurantCard from '../../components/RestaurantCard';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [currentLocation, setCurrentLocation] = useState(locations[0]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [vegOnly, setVegOnly] = useState(false);

  const filteredKitchens = kitchens.filter((k) => {
    if (vegOnly && !k.isPureVeg) return false;
    return true;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Location Bar matching Artboard 9 */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.locationSelector}
            onPress={() => setShowLocationModal(true)}
            activeOpacity={0.7}
          >
            <View style={styles.locationPin}>
              <Ionicons name="location" size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.locationSub, { color: theme.subText }]}>Deliver to</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.locationTitle, { color: theme.text }]}>{currentLocation}</Text>
                <Ionicons name="chevron-down" size={16} color={theme.text} style={{ marginLeft: 4 }} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.topRightBtns}>
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => router.push('/filter-modal')}
            >
              <Ionicons name="options-outline" size={20} color={theme.text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: theme.card, borderColor: theme.border, marginLeft: 8 }]}
              onPress={() => router.push('/cart')}
            >
              <Ionicons name="bag-handle-outline" size={20} color={theme.text} />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Hero Card */}
        <View style={[styles.heroPromo, { backgroundColor: colors.primary }]}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>KHAIKA HEROES</Text>
            </View>
            <Text style={styles.promoTitle}>Empowering Local Homemakers</Text>
            <Text style={styles.promoSub}>Fresh, hot, hygienic meals cooked with love right next door.</Text>
          </View>
          <View style={styles.promoGraphic}>
            <Ionicons name="heart" size={48} color="rgba(255,255,255,0.95)" />
          </View>
        </View>

        {/* Categories Bar matching Artboards 9 & 9 Copy 2 */}
        <FlatList
          horizontal
          data={foodCategories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedCategory;
            return (
              <TouchableOpacity
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isSelected ? colors.primary : theme.card,
                    borderColor: isSelected ? colors.primary : theme.border,
                  },
                ]}
                onPress={() => setSelectedCategory(item.id)}
              >
                <Ionicons
                  name={item.icon}
                  size={16}
                  color={isSelected ? colors.white : colors.primary}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.categoryText,
                    { color: isSelected ? colors.white : theme.text },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />

        {/* Filter bar: Veg Only switch & Kitchens Count */}
        <View style={styles.countRow}>
          <Text style={[styles.countText, { color: theme.text }]}>
            Showing you 18 kitchens nearby
          </Text>

          <View style={styles.vegToggleWrap}>
            <Text style={[styles.vegLabel, { color: vegOnly ? colors.secondary : theme.subText }]}>
              VEG ONLY
            </Text>
            <Switch
              value={vegOnly}
              onValueChange={setVegOnly}
              trackColor={{ false: colors.lightGray, true: '#D1FAE5' }}
              thumbColor={vegOnly ? colors.secondary : '#FFFFFF'}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        {/* Kitchen Listings */}
        <View style={styles.kitchenList}>
          {filteredKitchens.map((k) => (
            <RestaurantCard
              key={k.id}
              item={k}
              onPress={() => router.push({ pathname: '/restaurant/[id]', params: { id: k.id } })}
            />
          ))}
        </View>
      </ScrollView>

      {/* Location Picker Modal */}
      <Modal
        visible={showLocationModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowLocationModal(false)}
        >
          <View style={[styles.modalSheet, { backgroundColor: theme.card }]}>
            <View style={styles.sheetHandle} />
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Choose Location</Text>
            {locations.map((loc) => (
              <TouchableOpacity
                key={loc}
                style={[
                  styles.locOption,
                  loc === currentLocation && { backgroundColor: colors.primarySoft },
                ]}
                onPress={() => {
                  setCurrentLocation(loc);
                  setShowLocationModal(false);
                }}
              >
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={loc === currentLocation ? colors.primary : colors.gray}
                />
                <Text
                  style={[
                    styles.locOptionText,
                    { color: loc === currentLocation ? colors.primary : theme.text },
                  ]}
                >
                  {loc}
                </Text>
                {loc === currentLocation && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationPin: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  locationSub: {
    fontSize: 11,
    fontWeight: '600',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  topRightBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  heroPromo: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    padding: 18,
    alignItems: 'center',
    marginVertical: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  promoTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  promoTagText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  promoTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 22,
    marginBottom: 4,
  },
  promoSub: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    lineHeight: 16,
  },
  promoGraphic: {
    paddingLeft: 6,
  },
  categoryList: {
    paddingVertical: 6,
    marginBottom: 16,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  countText: {
    fontSize: 15,
    fontWeight: '800',
  },
  vegToggleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vegLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginRight: 2,
  },
  kitchenList: {
    marginTop: 2,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: 24,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 18,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  locOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    marginBottom: 6,
  },
  locOptionText: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 12,
    flex: 1,
  },
});
