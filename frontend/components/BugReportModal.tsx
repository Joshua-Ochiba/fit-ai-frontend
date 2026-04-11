import React, { useState } from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Dimensions,
    Pressable,
} from 'react-native';
import { radius, spacingX, spacingY, colors } from '@/constants/theme';
import Typo from '@/components/Typo';
import Button from '@/components/Button';
import * as Icons from 'phosphor-react-native';
import { verticalScale } from '@/utils/styling';
import { useTheme } from '@/context/ThemeContext';
import { bugApi } from '@/utils/api';
import { useAlert } from '@/context/AlertContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BugReportModalProps {
    visible: boolean;
    onClose: () => void;
}

import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BugReportModal: React.FC<BugReportModalProps> = ({ visible, onClose }) => {
    const { colors: themeColors } = useTheme();
    const { showAlert } = useAlert();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get severity color based on level
    const getSeverityColor = (level: string) => {
        switch (level) {
            case 'low':
                return colors.green; // #16a34a
            case 'medium':
                return colors.sunriseCoral; // #f97316
            case 'high':
                return colors.rose; // #ef4444
            default:
                return themeColors.accentPrimary;
        }
    };

    const handleSubmit = async () => {
        console.log('[BugReportModal] Submit clicked');
        if (!description.trim()) {
            showAlert({
                title: 'Description Required',
                message: 'Please provide a description of the bug.',
                type: 'warning',
            });
            return;
        }

        if (description.length > 4000) {
            showAlert({
                title: 'Description Too Long',
                message: 'Description must be 4000 characters or less.',
                type: 'warning',
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await bugApi.reportBug({
                description: description.trim(),
                title: title.trim() || undefined,
                severity: severity || undefined,
                metadata: {
                    submitted_from: 'mobile_app',
                    platform: Platform.OS,
                },
            });

            showAlert({
                title: 'Bug Reported',
                message: 'Thank you for reporting this bug! We\'ll look into it.',
                type: 'success',
            });

            // Reset form
            setTitle('');
            setDescription('');
            setSeverity('');
            onClose();
        } catch (error: any) {
            showAlert({
                title: 'Error',
                message: error.message || 'Failed to submit bug report. Please try again.',
                type: 'error',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        console.log('[BugReportModal] Close triggered');
        if (!isSubmitting) {
            setTitle('');
            setDescription('');
            setSeverity('');
            onClose();
        }
    };

    if (!visible) return null;

    return (
        <GestureHandlerRootView style={styles.rootGestureHandler}>
            <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.5)" translucent />

            {/* Main overlay View - acts as the touch surface for the entire modal area */}
            <View style={styles.overlay}>
                {/* Backdrop - captures clicks outside the modal to close it. Absolute fill behind everything else. */}
                <TouchableOpacity
                    style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]}
                    activeOpacity={1}
                    onPress={handleClose}
                />

                {/* Modal Container - centered on screen */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.container}
                >
                    {/* Modal body - standard View wrapper. Touches inside will be caught by children. */}
                    <View
                        style={[
                            styles.modal,
                            {
                                backgroundColor: themeColors.panel || '#121212',
                                borderWidth: 1,
                                borderColor: 'rgba(255,255,255,0.1)'
                            }
                        ]}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <Typo size={20} color={themeColors.textPrimary} fontWeight="600" style={{ flex: 1 }}>
                                Report a Bug
                            </Typo>
                            <TouchableOpacity
                                onPress={handleClose}
                                disabled={isSubmitting}
                                style={styles.closeButton}
                            >
                                <Icons.X size={24} color={themeColors.textPrimary} weight="bold" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            style={styles.content}
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={true}
                            keyboardShouldPersistTaps="handled"
                            keyboardDismissMode='interactive'
                        >
                            {/* Title Input */}
                            <View style={styles.inputGroup}>
                                <Typo size={14} color={themeColors.textSecondary} style={styles.label}>
                                    Title (Optional)
                                </Typo>
                                <TextInput
                                    style={[
                                        styles.textInput,
                                        {
                                            color: themeColors.textPrimary,
                                            borderColor: colors.neutral200,
                                            backgroundColor: themeColors.panel
                                        }
                                    ]}
                                    placeholder="Brief summary of the bug"
                                    placeholderTextColor={colors.neutral400}
                                    value={title}
                                    onChangeText={setTitle}
                                    maxLength={200}
                                    editable={!isSubmitting}
                                />
                            </View>

                            {/* Severity Selector */}
                            <View style={styles.inputGroup}>
                                <Typo size={14} color={themeColors.textSecondary} style={styles.label}>
                                    Severity (Optional)
                                </Typo>
                                <View style={styles.severityContainer}>
                                    {['low', 'medium', 'high'].map((level) => {
                                        const isSelected = severity === level;
                                        const severityColor = getSeverityColor(level);
                                        return (
                                            <TouchableOpacity
                                                key={level}
                                                style={[
                                                    styles.severityButton,
                                                    isSelected && {
                                                        backgroundColor: severityColor,
                                                        borderColor: severityColor,
                                                    },
                                                    !isSelected && { borderColor: colors.neutral200 }
                                                ]}
                                                onPress={() => setSeverity(severity === level ? '' : level)}
                                                disabled={isSubmitting}
                                            >
                                                <Typo
                                                    size={13}
                                                    color={isSelected ? colors.white : themeColors.textSecondary}
                                                    fontWeight="500"
                                                    style={{ textTransform: 'capitalize' }}
                                                >
                                                    {level}
                                                </Typo>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>

                            {/* Description Input */}
                            <View style={styles.inputGroup}>
                                <Typo size={14} color={themeColors.textSecondary} style={styles.label}>
                                    Description *
                                </Typo>
                                <TextInput
                                    style={[
                                        styles.textArea,
                                        {
                                            color: themeColors.textPrimary,
                                            borderColor: colors.neutral200,
                                            backgroundColor: themeColors.panel
                                        }
                                    ]}
                                    placeholder="Describe the bug in detail..."
                                    placeholderTextColor={colors.neutral400}
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline
                                    numberOfLines={6}
                                    maxLength={4000}
                                    textAlignVertical="top"
                                    editable={!isSubmitting}
                                />
                                <Typo size={12} color={colors.neutral400} style={styles.charCount}>
                                    {description.length}/4000
                                </Typo>
                            </View>
                        </ScrollView>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Button
                                onPress={handleSubmit}
                                loading={isSubmitting}
                                loadingColor={themeColors.textPrimary}
                                style={styles.submitButton}
                            >
                                <Typo size={16} color={colors.black} fontWeight="600">
                                    Submit Report
                                </Typo>
                            </Button>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </GestureHandlerRootView>
    );
};

export default BugReportModal;

const styles = StyleSheet.create({
    rootGestureHandler: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10000,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        elevation: 100, // Very high elevation for Android
    },
    container: {
        width: '92%',
        height: '80%', // Explicit height to prevent collapse when child is flex: 1
        justifyContent: 'center',
    },

    modal: {
        flex: 1,
        borderRadius: radius._20,
        padding: spacingX._20,
        width: '100%',
        backgroundColor: '#121212',
        elevation: 101, // Slightly higher than overlay
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacingY._20,
    },
    closeButton: {
        padding: spacingX._5,
    },
    content: {
        flex: 1, // Important: take up remaining space between header and footer
    },
    contentContainer: {
        paddingBottom: spacingY._20,
        flexGrow: 1,
    },
    inputGroup: {
        marginBottom: spacingY._20,
    },
    label: {
        marginBottom: spacingY._10,
    },
    textInput: {
        height: verticalScale(48),
        borderWidth: 1,
        borderRadius: radius._10,
        paddingHorizontal: spacingX._15,
        fontSize: verticalScale(14),
    },
    textArea: {
        minHeight: verticalScale(150),
        borderWidth: 1,
        borderRadius: radius._10,
        paddingHorizontal: spacingX._15,
        paddingTop: spacingY._12,
        fontSize: verticalScale(14),
    },
    charCount: {
        marginTop: spacingY._5,
        textAlign: 'right',
    },
    severityContainer: {
        flexDirection: 'row',
        gap: spacingX._10,
    },
    severityButton: {
        flex: 1,
        height: verticalScale(40),
        borderWidth: 1,
        borderRadius: radius._10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        marginTop: spacingY._20,
    },
    submitButton: {
        width: '100%',
    },
    backdrop: {
        flex: 1,
    }
});