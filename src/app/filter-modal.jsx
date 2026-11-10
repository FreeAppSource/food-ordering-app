import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import Button from '../components/Button';

export default function FilterModalScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [distance, setDistance] = useState('3 km(s)');
  const [vegOnly, setVegOnly] = useState(true);
  const [rating, setRating] = useState('1.0 +');
  const [priceSort, setPriceSort] = useState('Low to high');

  const distances = ['1 km', '3 km(s)', '5 km', '10 km'];
  const ratings = ['1.0 +', '3.0 +', '4.0 +', '4.5 +'];
  const priceOptions = ['Low to high', 'High to low'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>FILTER</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Within distance of */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Within distance of</Text>
        <View style={styles.pillRow}>
          {distances.map((d) => (
            <TouchableOpacity
              key={d}
              style={[
                styles.filterPill,
                {
                  backgroundColor: distance === d ? colors.primary : theme.card,
                  borderColor: distance === d ? colors.primary : theme.border,
                },
              ]}
              onPress={() => setDistance(d)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  { color: distance === d ? '#FFFFFF' : theme.text },
                ]}
              >
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dietary preference matching Artboard 10: Veg Only */}
        <View style={[styles.switchRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View>
            <Text style={[styles.switchTitle, { color: theme.text }]}>Dietary preference</Text>
            <Text style={{ color: colors.secondary, fontSize: 13, fontWeight: '700' }}>Veg Only</Text>
          </View>
          <Switch
            value={vegOnly}
            onValueChange={setVegOnly}
            trackColor={{ false: colors.lightGray, true: '#D1FAE5' }}
            thumbColor={vegOnly ? colors.secondary : '#FFFFFF'}
          />
        </View>

        {/* Kitchen rating matching Artboard 10: 1.0 + */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>Kitchen rating</Text>
        <View style={styles.pillRow}>
          {ratings.map((r) => (
            <TouchableOpacity
              key={r}
              style={[
                styles.filterPill,
                {
                  backgroundColor: rating === r ? colors.primary : theme.card,
                  borderColor: rating === r ? colors.primary : theme.border,
                },
              ]}
              onPress={() => setRating(r)}
            >
              <Ionicons
                name="star"
                size={13}
                color={rating === r ? '#FFFFFF' : colors.warning}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.filterPillText,
                  { color: rating === r ? '#FFFFFF' : theme.text },
                ]}
              >
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* By price matching Artboard 10: High to low, Low to high */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>By price</Text>
        <View style={styles.pillRow}>
          {priceOptions.map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.filterPill,
                {
                  backgroundColor: priceSort === p ? colors.primary : theme.card,
                  borderColor: priceSort === p ? colors.primary : theme.border,
                },
              ]}
              onPress={() => setPriceSort(p)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  { color: priceSort === p ? '#FFFFFF' : theme.text },
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="Apply Filters"
          onPress={() => router.back()}
          style={styles.applyBtn}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  scroll: {
    paddingBottom: 36,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    marginVertical: 14,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  applyBtn: {
    marginTop: 32,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
});
