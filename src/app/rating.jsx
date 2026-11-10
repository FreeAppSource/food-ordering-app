import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import Header from '../components/Header';
import Button from '../components/Button';

export default function RatingModalScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [deliveryRating, setDeliveryRating] = useState(5);
  const [packagingRating, setPackagingRating] = useState(4);
  const [item1Rating, setItem1Rating] = useState(5);
  const [item2Rating, setItem2Rating] = useState(5);
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    Alert.alert(
      'Thank You!',
      'Your feedback helps our homemakers and delivery heroes improve daily.',
      [{ text: 'Great!', onPress: () => router.back() }]
    );
  };

  const renderStars = (value, onChange) => (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onChange(star)} style={styles.starTouch}>
          <Ionicons
            name={star <= value ? 'star' : 'star-outline'}
            size={24}
            color={star <= value ? colors.warning : colors.lightGray}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <Header title="RATE EXPERIENCE" showBack showCart={false} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headingBox}>
          <Text style={[styles.title, { color: theme.text }]}>Hotel Paris Buhari</Text>
          <Text style={{ color: colors.secondary, fontSize: 13, fontWeight: '700' }}>
            Agent Delivered • 15 Aug
          </Text>
        </View>

        {/* Timely delivery matching Artboard 21 */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.cardLabel, { color: theme.text }]}>Timely delivery</Text>
          {renderStars(deliveryRating, setDeliveryRating)}
        </View>

        {/* Packaging quality matching Artboard 21 */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, marginTop: 12 }]}>
          <Text style={[styles.cardLabel, { color: theme.text }]}>Packaging quality</Text>
          {renderStars(packagingRating, setPackagingRating)}
        </View>

        {/* Food Item ratings matching Artboard 21 */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border, marginTop: 12 }]}>
          <Text style={[styles.cardLabel, { color: theme.text }]}>Food Items</Text>

          <View style={styles.itemRatingRow}>
            <Text style={[styles.itemName, { color: theme.text }]}>Chicken Biryani (Homestyle)</Text>
            {renderStars(item1Rating, setItem1Rating)}
          </View>

          <View style={[styles.itemRatingRow, { marginTop: 12 }]}>
            <Text style={[styles.itemName, { color: theme.text }]}>Flaky Parotta Meal (3 Pcs)</Text>
            {renderStars(item2Rating, setItem2Rating)}
          </View>
        </View>

        {/* Feedback comment input */}
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
          placeholder="Write a warm note for the homemaker cook..."
          placeholderTextColor={colors.gray}
          value={comments}
          onChangeText={setComments}
          multiline
          numberOfLines={3}
        />

        {/* SUBMIT FEEDBACK matching Artboard 21 */}
        <Button
          title="SUBMIT FEEDBACK"
          onPress={handleSubmit}
          style={styles.submitBtn}
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
    paddingBottom: 36,
  },
  headingBox: {
    marginVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  card: {
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  starRow: {
    flexDirection: 'row',
  },
  starTouch: {
    paddingRight: 8,
  },
  itemRatingRow: {
    marginBottom: 6,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: 14,
    marginTop: 16,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  submitBtn: {
    marginTop: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
});
