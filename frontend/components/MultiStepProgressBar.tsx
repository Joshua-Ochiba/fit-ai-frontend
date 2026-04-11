import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/theme';
import Typo from './Typo';
type MultiStepProgressBarProps = {
  steps: string[];
  currentStep: number;
};
const MultiStepProgressBar = ({ steps, currentStep }: MultiStepProgressBarProps) => {
  const { colors: themeColors } = useTheme();

  // 1. Pulsing Glow Logic
  const glowScale = useSharedValue(1);
  useEffect(() => {
    glowScale.value = withRepeat(withTiming(1.5, { duration: 1200 }), -1, true);
  }, []);
  return (
    <View style={styles.fixedWrapper}>
      <View style={styles.progressBar}>
        {steps.map((_, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isLast = index === steps.length - 1;
          // 2. Animated Line Progress
          const lineAnim = useSharedValue(isCompleted ? 1 : 0);
          useEffect(() => {
            lineAnim.value = withTiming(isCompleted ? 1 : 0, { duration: 500 });
          }, [isCompleted]);
          const animatedLineStyle = useAnimatedStyle(() => ({
            width: `${lineAnim.value * 100}%`,
            backgroundColor: themeColors.accentPrimary,
          }));
          const glowStyle = useAnimatedStyle(() => ({
            transform: [{ scale: glowScale.value }],
            opacity: isActive ? 0.3 : 0,
          }));
          return (
            <React.Fragment key={index}>
              <View style={styles.stepContainer}>
                {/* Glow Effect */}
                <Animated.View style={[styles.glowCircle, glowStyle, { backgroundColor: themeColors.accentPrimary }]} />

                {isActive ? (
                  <LinearGradient
                    colors={themeColors.accentGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.circle}
                  >
                    <Typo size={16} fontWeight="700" color={themeColors.background}>{index + 1}</Typo>
                  </LinearGradient>
                ) : isCompleted ? (
                  <View style={[styles.circle, { backgroundColor: themeColors.accentPrimary }]}>
                    <Typo size={16} fontWeight="700" color={themeColors.background}>{index + 1}</Typo>
                  </View>
                ) : (
                  <View style={[styles.circle, { borderWidth: 2, borderColor: themeColors.border }]}>
                    <Typo size={16} fontWeight="700" color={themeColors.textSecondary}>{index + 1}</Typo>
                  </View>
                )}
              </View>
              {/* 3. Animated Connecting Line */}
              {!isLast && (
                <View style={[styles.lineContainer, { backgroundColor: themeColors.border }]}>
                  <Animated.View style={[styles.lineFill, animatedLineStyle]} />
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  fixedWrapper: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%', // Ensures it doesn't touch screen edges
  },
  stepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowCircle: {
    position: 'absolute',
    width: 44, height: 44, borderRadius: 22,
  },
  lineContainer: {
    flex: 1, // Line takes up remaining space between circles
    height: 4,
    marginHorizontal: 8,
    borderRadius: 2,
    overflow: 'hidden',
  },
  lineFill: {
    height: '100%',
  },
});
export default MultiStepProgressBar;