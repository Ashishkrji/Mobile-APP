import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { useAppSelector } from '../store';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SPLASH_DURATION_MS = 1500;
const DOTS = [0, 1, 2];

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { isOnboarded, biometricEnabled, isLocked } = useAppSelector((state) => state.auth);

  const logoProgress = useSharedValue(0);
  const dot1 = useSharedValue(0.4);
  const dot2 = useSharedValue(0.4);
  const dot3 = useSharedValue(0.4);

  useEffect(() => {
    logoProgress.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    const pulse = withRepeat(
      withSequence(
        withTiming(1, { duration: 220 }),
        withTiming(0.4, { duration: 220 }),
      ),
      -1,
      false,
    );

    dot1.value = pulse;
    dot2.value = withDelay(180, pulse);
    dot3.value = withDelay(360, pulse);

    const timer = setTimeout(() => {
      if (!isOnboarded) {
        navigation.replace('Onboarding');
      } else if (isLocked) {
        navigation.replace('Auth', {
          preferredMethod: biometricEnabled ? 'biometric' : 'credentials',
        });
      } else {
        navigation.replace('Main');
      }
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [biometricEnabled, isOnboarded, isLocked, logoProgress, dot1, dot2, dot3, navigation]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoProgress.value,
    transform: [
      {
        scale: interpolate(logoProgress.value, [0, 1], [0.8, 1], Extrapolation.CLAMP),
      },
    ],
  }));

  const dotStyle1 = useAnimatedStyle(() => ({
    opacity: dot1.value,
    transform: [{ scale: interpolate(dot1.value, [0.4, 1], [0.9, 1.1]) }],
  }));

  const dotStyle2 = useAnimatedStyle(() => ({
    opacity: dot2.value,
    transform: [{ scale: interpolate(dot2.value, [0.4, 1], [0.9, 1.1]) }],
  }));

  const dotStyle3 = useAnimatedStyle(() => ({
    opacity: dot3.value,
    transform: [{ scale: interpolate(dot3.value, [0.4, 1], [0.9, 1.1]) }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E8611A" />
      <Animated.View style={[styles.brandBlock, logoAnimatedStyle]}>
        <Text style={styles.logoEmoji}>🏪</Text>
        <Text style={styles.title}>DukanDost</Text>
        <Text style={styles.tagline}>Aapka Smart Business Dost</Text>
      </Animated.View>

      <View style={styles.loadingRow}>
        {DOTS.map((dot, index) => {
          const animatedStyle = index === 0 ? dotStyle1 : index === 1 ? dotStyle2 : dotStyle3;
          return <Animated.View key={dot} style={[styles.dot, animatedStyle]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8611A',
    paddingHorizontal: 24,
  },
  brandBlock: {
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 64,
    marginBottom: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
  },
  tagline: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 16,
    fontStyle: 'italic',
  },
  loadingRow: {
    marginTop: 24,
    flexDirection: 'row',
    columnGap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
});

export default SplashScreen;
