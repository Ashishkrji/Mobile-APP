import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { RootStackParamList } from '../navigation/types';
import { RootState } from '../store/types';

type SplashNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const DOT_COUNT = 3;
const SPLASH_TOTAL_DELAY_MS = 1500;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashNavigationProp>();

  const { isOnboarded, biometricEnabled } = useSelector((state: RootState) => state.auth);

  const logoProgress = useSharedValue(0);
  const dotProgress = useSharedValue(0);

  useEffect(() => {
    logoProgress.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    dotProgress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(2, { duration: 300 }),
        withTiming(3, { duration: 300 }),
      ),
      -1,
      false,
    );

    const timeout = setTimeout(() => {
      if (!isOnboarded) {
        navigation.replace('Onboarding');
        return;
      }

      if (biometricEnabled) {
        navigation.replace('Auth');
        return;
      }

      navigation.replace('Main');
    }, SPLASH_TOTAL_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [biometricEnabled, dotProgress, isOnboarded, logoProgress, navigation]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoProgress.value,
    transform: [
      {
        scale: interpolate(logoProgress.value, [0, 1], [0.8, 1]),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E8611A" />

      <Animated.View style={[styles.brandContainer, logoStyle]}>
        <Text style={styles.icon}>🏪</Text>
        <Text style={styles.title}>DukanDost</Text>
        <Text style={styles.tagline}>Aapka Smart Business Dost</Text>
      </Animated.View>

      <View style={styles.dotRow}>
        {Array.from({ length: DOT_COUNT }).map((_, index) => (
          <LoadingDot key={index} index={index + 1} progress={dotProgress} />
        ))}
      </View>
    </View>
  );
};

interface LoadingDotProps {
  index: number;
  progress: SharedValue<number>;
}

const LoadingDot: React.FC<LoadingDotProps> = ({ index, progress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = Math.round(progress.value) === index;

    return {
      opacity: withTiming(isActive ? 1 : 0.45, { duration: 180 }),
      transform: [
        {
          scale: withTiming(isActive ? 1.15 : 0.9, { duration: 180 }),
        },
      ],
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8611A',
    paddingHorizontal: 24,
  },
  brandContainer: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 62,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  tagline: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.95,
  },
  dotRow: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
});

export default SplashScreen;
