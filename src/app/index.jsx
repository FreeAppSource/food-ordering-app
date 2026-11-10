import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, useTheme } from '../theme';
import { resolveFoodImage } from '../assets/images';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    heading: 'CELEBRATING HOMEMAKERS',
    description: 'When you place an order on Khaika, you are directly empowering the women of our country.',
    imageKey: 'ae9b7d443504bb006fa43bf3149fdf0c4f740282',
    icon: 'heart-outline',
  },
  {
    id: '2',
    heading: 'HEALTHY & HYGIENIC',
    description: 'We’ve got amazing desi food from south to north, east to west! Prepared with love.',
    imageKey: 'a3058c88ecef700cc80bc13abafbeb632f2f8f51',
    icon: 'restaurant-outline',
  },
  {
    id: '3',
    heading: 'DELIVERED ON TIME',
    description: 'Our growing list of khaika heroes deliver your food warm, when you want it, where you want it.',
    imageKey: 'b4450cc207b6e3fc693ebeb50628e84b9d76d512',
    icon: 'bicycle-outline',
  },
];

export default function IntroScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      router.push('/signup');
    }
  };

  const curr = slides[activeSlide];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Brand Header & Skip */}
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>Khaika</Text>
          <Text style={styles.brandSubtitle}>HOMEMAKER MEALS</Text>
        </View>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={[styles.skip, { color: colors.gray }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Visual Card */}
      <View style={styles.heroWrapper}>
        <View style={[styles.heroCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Image
            source={resolveFoodImage(curr.imageKey)}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.iconCircle}>
            <Ionicons name={curr.icon} size={28} color={colors.primary} />
          </View>
        </View>
      </View>

      {/* Slide Text */}
      <View style={styles.textContainer}>
        <Text style={[styles.heading, { color: theme.text }]}>{curr.heading}</Text>
        <Text style={[styles.desc, { color: theme.subText }]}>{curr.description}</Text>

        {/* Indicators */}
        <View style={styles.indicatorRow}>
          {slides.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setActiveSlide(i)}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === activeSlide ? colors.primary : colors.lightGray,
                    width: i === activeSlide ? 24 : 8,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={handleNext}
          style={styles.mainBtn}
        />
        <View style={styles.loginRow}>
          <Text style={{ color: theme.subText, fontSize: 14 }}>already signed up? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '700' }}>
              login here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  brandContainer: {},
  brandTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.secondary,
    letterSpacing: 1.5,
  },
  skip: {
    fontSize: 14,
    fontWeight: '600',
  },
  heroWrapper: {
    alignItems: 'center',
    marginVertical: 16,
  },
  heroCard: {
    width: width - 48,
    height: 260,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  iconCircle: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  desc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  footer: {
    marginBottom: 8,
  },
  mainBtn: {
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
  },
});
