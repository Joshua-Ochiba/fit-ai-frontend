import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Typo from './Typo';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

type OptionCardProps = {
    label: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onPress: () => void;
};

const OptionCard = ({ label, icon, isSelected, onPress }: OptionCardProps) => {
    const { colors: themeColors } = useTheme();

    const animatedStyle = useAnimatedStyle(() => ({
        borderColor: isSelected ? themeColors.accentPrimary : 'transparent',
        backgroundColor: isSelected ? themeColors.cardBackground : '#F4F7FB',
        transform: [{ scale: isSelected ? withSpring(1.02) : withSpring(1) }],
        elevation: isSelected ? 4 : 0,
        shadowOpacity: isSelected ? 0.1 : 0,
    }));

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <Animated.View style={[styles.card, animatedStyle]}>
                <View style={[styles.iconContainer, { backgroundColor: isSelected ? themeColors.accentPrimary : '#E9ECEF' }]}>
                    {React.cloneElement(icon as React.ReactElement, {
                        color: isSelected ? themeColors.background : colors.neutral600
                    })}
                </View>

                <Typo
                    size={18}
                    fontWeight={isSelected ? "700" : "500"}
                    color={isSelected ? themeColors.textPrimary : colors.neutral700}
                >
                    {label}
                </Typo>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacingY._15,
        borderRadius: radius._20,
        borderWidth: 2,
        marginBottom: spacingY._12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        width: '95%',
        marginLeft: spacingX._10,

    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacingX._15,
    },
});
export default OptionCard;