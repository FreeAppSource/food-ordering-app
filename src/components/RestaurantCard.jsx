import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';
import { resolveFoodImage } from '../assets/images';

export default function RestaurantCard({ item, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.imageContainer}>
        <Image source={resolveFoodImage(item.image)} style={styles.image} resizeMode="cover" />
        <View style={styles.badgeRow}>
          {item.isPureVeg && (
            <View style={styles.vegPill}>
              <View style={styles.vegCircleOuter}>
                <View style={styles.vegCircleInner} />
              </View>
              <Text style={styles.vegPillText}>PURE VEG</Text>
            </View>
          )}
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#FFFFFF" style={{ marginRight: 3 }} />
            <Text style={styles.ratingBadgeText}>{Number(item.rating).toFixed(1)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {item.name}
          </Text>
        </View>

        <Text style={[styles.tagline, { color: theme.subText }]} numberOfLines={1}>
          {item.tagline || item.cuisine}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={colors.primary} />
            <Text style={[styles.metaText, { color: theme.text }]}>{item.deliveryTime}</Text>
          </View>
          <Text style={styles.dot}>•</Text>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color={colors.secondary} />
            <Text style={[styles.metaText, { color: theme.text }]}>{item.distance}</Text>
          </View>
          {item.ratingsCount && (
            <>
              <Text style={styles.dot}>•</Text>
              <Text style={[styles.metaText, { color: theme.subText }]}>{item.ratingsCount}</Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 18,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vegPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  vegCircleOuter: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: '#48D2A0',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  vegCircleInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#48D2A0',
  },
  vegPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#232D33',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.full,
  },
  ratingBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  body: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  tagline: {
    fontSize: 13,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  dot: {
    marginHorizontal: 8,
    color: colors.gray,
  },
});
