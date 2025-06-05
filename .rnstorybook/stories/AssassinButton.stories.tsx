import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, Typography, Spacing } from './DesignTokens.stories';

interface AssassinButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const AssassinButton: React.FC<AssassinButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabled);
    } else {
      baseStyle.push(styles[variant]);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (disabled) {
      baseStyle.push(styles.disabledText);
    } else {
      baseStyle.push(styles[`${variant}Text`]);
    }
    
    return baseStyle;
  };

  const getLoadingColor = () => {
    if (disabled) return Colors.grey500;
    if (variant === 'ghost') return Colors.primary600;
    return Colors.white;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getLoadingColor()} size="small" />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base Button Styles
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  
  // Size Variants
  small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    minHeight: 56,
  },
  
  // Width Variants
  fullWidth: {
    width: '100%',
  },
  
  // Color Variants
  primary: {
    backgroundColor: Colors.primary600,
    borderColor: Colors.primary600,
  },
  secondary: {
    backgroundColor: Colors.secondary600,
    borderColor: Colors.secondary600,
  },
  danger: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  success: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: Colors.primary600,
  },
  
  // Disabled State
  disabled: {
    backgroundColor: Colors.disabled,
    borderColor: Colors.disabled,
  },
  
  // Text Styles
  text: {
    fontWeight: Typography.semibold,
    textAlign: 'center',
  },
  
  // Text Size Variants
  smallText: {
    fontSize: Typography.bodySmall,
  },
  mediumText: {
    fontSize: Typography.button,
  },
  largeText: {
    fontSize: Typography.bodyLarge,
  },
  
  // Text Color Variants
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  dangerText: {
    color: Colors.white,
  },
  successText: {
    color: Colors.white,
  },
  ghostText: {
    color: Colors.primary600,
  },
  disabledText: {
    color: Colors.grey500,
  },
});

// Story Components
const ButtonShowcase = () => (
  <View style={showcaseStyles.container}>
    <Text style={showcaseStyles.title}>Assassin Game Buttons</Text>
    
    <View style={showcaseStyles.section}>
      <Text style={showcaseStyles.sectionTitle}>Variants</Text>
      <AssassinButton title="Eliminate Target" variant="danger" />
      <AssassinButton title="Join Game" variant="primary" />
      <AssassinButton title="View Profile" variant="secondary" />
      <AssassinButton title="Mark Safe Zone" variant="success" />
      <AssassinButton title="Cancel" variant="ghost" />
    </View>
    
    <View style={showcaseStyles.section}>
      <Text style={showcaseStyles.sectionTitle}>Sizes</Text>
      <AssassinButton title="Small" size="small" />
      <AssassinButton title="Medium" size="medium" />
      <AssassinButton title="Large" size="large" />
    </View>
    
    <View style={showcaseStyles.section}>
      <Text style={showcaseStyles.sectionTitle}>States</Text>
      <AssassinButton title="Normal Button" />
      <AssassinButton title="Loading..." loading />
      <AssassinButton title="Disabled" disabled />
    </View>
    
    <View style={showcaseStyles.section}>
      <Text style={showcaseStyles.sectionTitle}>Full Width</Text>
      <AssassinButton title="Start New Game" fullWidth variant="primary" />
      <AssassinButton title="Emergency Exit" fullWidth variant="danger" />
    </View>
  </View>
);

const showcaseStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: Typography.h1,
    fontWeight: Typography.bold,
    color: Colors.grey900,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.h3,
    fontWeight: Typography.semibold,
    color: Colors.grey900,
    marginBottom: Spacing.sm,
  },
});

export default {
  title: 'Design System/Button',
  component: AssassinButton,
};

export const AllVariants = () => <ButtonShowcase />;

export const Primary = () => (
  <View style={{ padding: Spacing.lg }}>
    <AssassinButton title="Join Game" variant="primary" />
  </View>
);

export const Danger = () => (
  <View style={{ padding: Spacing.lg }}>
    <AssassinButton title="Eliminate Target" variant="danger" />
  </View>
);

export const Success = () => (
  <View style={{ padding: Spacing.lg }}>
    <AssassinButton title="Mark Safe Zone" variant="success" />
  </View>
);

export const Ghost = () => (
  <View style={{ padding: Spacing.lg }}>
    <AssassinButton title="Cancel" variant="ghost" />
  </View>
);

export const Loading = () => (
  <View style={{ padding: Spacing.lg }}>
    <AssassinButton title="Processing..." variant="primary" loading />
  </View>
);

export const Disabled = () => (
  <View style={{ padding: Spacing.lg }}>
    <AssassinButton title="Unavailable" disabled />
  </View>
);

export const FullWidth = () => (
  <View style={{ padding: Spacing.lg }}>
    <AssassinButton title="Start New Game" variant="primary" fullWidth />
  </View>
); 