import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';
import { resolveFoodImage } from '../assets/images';

export default function MenuItemCard({ item, quantity = 0, onAdd, onIncrement, onDecrement }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.left}>
        <View style={styles.badgeRow}>
          <View style={[styles.vegBadge, { borderColor: item.isVeg ? colors.secondary : colors.danger }]}>
            <View style={[styles.vegDot, { backgroundColor: item.isVeg ? colors.secondary : colors.danger }]} />
          </View>
          {item.badge ? (
            <View style={styles.specialBadge}>
              <Text style={styles.specialBadgeText}>{item.badge}</Text>
            </View>
          ) : null}
          {item.weight ? <Text style={styles.weightText}>{item.weight}</Text> : null}
        </View>

        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.desc, { color: theme.subText }]} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: theme.text }]}>₹{item.price}</Text>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>was ₹{item.oldPrice}</Text>
          )}
        </View>
      </View>

      <View style={styles.right}>
        <Image source={resolveFoodImage(item.image)} style={styles.image} resizeMode="cover" />
        {quantity > 0 ? (
          <View style={styles.qtyControl}>
            <TouchableOpacity onPress={onDecrement} style={styles.qtyBtn}>
              <Ionicons name="remove" size={16} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={onIncrement} style={styles.qtyBtn}>
              <Ionicons name="add" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addBtn} onPress={onAdd} activeOpacity={0.85}>
            <Ionicons name="add" size={16} color={colors.white} />
            <Text style={styles.addText}>ADD</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: radius.md,
    borderWidth: 1,
    padding: 14,
    marginBottom: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    paddingRight: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  vegBadge: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  specialBadge: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  specialBadgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  weightText: {
    fontSize: 11,
    color: colors.gray,
    fontWeight: '600',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  desc: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 12,
    color: colors.gray,
    textDecorationLine: 'line-through',
  },
  right: {
    alignItems: 'center',
    width: 96,
  },
  image: {
    width: 90,
    height: 80,
    borderRadius: radius.md,
    marginBottom: 8,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: radius.full,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  addText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 2,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 13,
    paddingHorizontal: 8,
  },
});
