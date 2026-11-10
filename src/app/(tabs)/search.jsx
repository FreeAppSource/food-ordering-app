import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { kitchens, searchSuggestions } from '../../data';
import RestaurantCard from '../../components/RestaurantCard';

export default function SearchScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [query, setQuery] = useState('');

  const filteredKitchens = kitchens.filter((k) => {
    if (!query) return true;
    const q = query.toLowerCase();
    const matchesName = k.name.toLowerCase().includes(q);
    const matchesDish = k.heroDish && k.heroDish.toLowerCase().includes(q);
    const matchesMenu = k.menu.some((m) => m.name.toLowerCase().includes(q));
    return matchesName || matchesDish || matchesMenu;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Ionicons name="search" size={20} color={colors.primary} style={{ marginRight: 10 }} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            value={query}
            onChangeText={setQuery}
            placeholder="Search kitchen or dishes"
            placeholderTextColor={colors.gray}
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.gray} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.push('/filter-modal')}>
              <Ionicons name="options-outline" size={18} color={colors.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Recent Search Suggestions matching Artboard 11.5 */}
        <View style={styles.recentSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Searches</Text>
          <View style={styles.tagWrap}>
            {searchSuggestions.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[styles.tagPill, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => setQuery(tag)}
              >
                <Ionicons name="time-outline" size={13} color={colors.gray} style={{ marginRight: 4 }} />
                <Text style={[styles.tagText, { color: theme.text }]}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Results */}
        <View style={styles.resultsSection}>
          <Text style={[styles.resultCount, { color: theme.subText }]}>
            {filteredKitchens.length} Kitchen{filteredKitchens.length !== 1 ? 's' : ''} Found
          </Text>

          {filteredKitchens.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="restaurant-outline" size={48} color={colors.gray} />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>No dishes found</Text>
              <Text style={{ color: theme.subText, fontSize: 13, marginTop: 4 }}>
                Try searching for "Paneer", "Biryani", or "Mariam"
              </Text>
            </View>
          ) : (
            filteredKitchens.map((k) => (
              <RestaurantCard
                key={k.id}
                item={k}
                onPress={() => router.push({ pathname: '/restaurant/[id]', params: { id: k.id } })}
              />
            ))
          )}
        </View>
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
    paddingBottom: 8,
  },
  searchBar: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  recentSection: {
    marginVertical: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  resultsSection: {
    marginTop: 8,
  },
  resultCount: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
  },
});
