import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';

interface ProgressBarProps {
  progress: number; // 0 to 1
  showPercentage?: boolean;
  height?: number;
  label?: string;
}

export default function ProgressBar({ 
  progress, 
  showPercentage = true, 
  height = 8,
  label
}: ProgressBarProps) {
  const { colors } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 8,
    },
    label: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.text,
      marginBottom: 4,
    },
    trackContainer: {
      backgroundColor: colors.progressTrack,
      borderRadius: height,
      height: height,
      overflow: 'hidden',
    },
    percentageText: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      color: colors.text,
      textAlign: 'right',
      marginTop: 4,
    },
  });
  
  // Ensure progress is within valid range
  const normalizedProgress = Math.min(Math.max(progress, 0), 1);
  
  // Use Reanimated for smooth width transition
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${normalizedProgress * 100}%`,
      height: '100%',
      backgroundColor: colors.progressFill,
      borderRadius: height,
      transform: [{ translateX: 0 }],
    };
  });
  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.trackContainer}>
        <Animated.View style={progressStyle} />
      </View>
      {showPercentage && (
        <Text style={styles.percentageText}>
          {Math.round(normalizedProgress * 100)}%
        </Text>
      )}
    </View>
  );
}