import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Design Tokens from your Figma design system
export const Colors = {
  // Primary Colors (Green-based)
  primary900: '#0CC25F',
  primary800: '#24C86F',
  primary700: '#3DCE7F',
  primary600: '#55D48F',
  primary500: '#6DDA9F',
  primary400: '#86E1AF',
  primary300: '#9EE7BF',
  primary200: '#B6EDCF',
  primary100: '#CEF3DF',
  primary50: '#E7F9EF',

  // Secondary Colors (Darker Green)
  secondary900: '#008D41',
  secondary800: '#1A9853',
  secondary700: '#33A466',
  secondary600: '#4DAF79',
  secondary500: '#66BB8C',
  secondary400: '#80C6A0',
  secondary300: '#99D1B3',
  secondary200: '#B3DDC6',
  secondary100: '#CCE8D9',
  secondary50: '#E6F4EC',

  // Alert & Status Colors
  success: '#12D18E',
  info: '#235DFF',
  warning: '#FACC15',
  error: '#F75555',
  disabled: '#D8D8D8',

  // Greyscale
  grey900: '#212121',
  grey800: '#424242',
  grey700: '#616161',
  grey600: '#757575',
  grey500: '#9E9E9E',
  grey400: '#BDBDBD',
  grey300: '#E0E0E0',
  grey200: '#EEEEEE',
  grey100: '#F5F5F5',
  grey50: '#FAFAFA',

  // Dark Theme
  dark1: '#181A20',
  dark2: '#1E2025',
  dark3: '#1F222A',
  dark4: '#262A35',
  dark5: '#35383F',

  // Basic
  white: '#FFFFFF',
  black: '#000000',
};

export const Typography = {
  // Font Sizes
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  bodyLarge: 16,
  body: 14,
  bodySmall: 12,
  button: 16,
  caption: 10,

  // Font Weights
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  black: '900' as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Color Palette Component
const ColorPalette = ({ title, colors }: { title: string; colors: Record<string, string> }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.colorGrid}>
      {Object.entries(colors).map(([name, color]) => (
        <View key={name} style={styles.colorItem}>
          <View style={[styles.colorSwatch, { backgroundColor: color }]} />
          <Text style={styles.colorName}>{name}</Text>
          <Text style={styles.colorValue}>{color}</Text>
        </View>
      ))}
    </View>
  </View>
);

// Typography Showcase Component
const TypographyShowcase = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Typography</Text>
    <Text style={[styles.typeExample, { fontSize: Typography.h1, fontWeight: Typography.bold }]}>
      Heading 1 - {Typography.h1}px Bold
    </Text>
    <Text style={[styles.typeExample, { fontSize: Typography.h2, fontWeight: Typography.semibold }]}>
      Heading 2 - {Typography.h2}px Semibold
    </Text>
    <Text style={[styles.typeExample, { fontSize: Typography.h3, fontWeight: Typography.medium }]}>
      Heading 3 - {Typography.h3}px Medium
    </Text>
    <Text style={[styles.typeExample, { fontSize: Typography.bodyLarge, fontWeight: Typography.regular }]}>
      Body Large - {Typography.bodyLarge}px Regular
    </Text>
    <Text style={[styles.typeExample, { fontSize: Typography.body, fontWeight: Typography.regular }]}>
      Body - {Typography.body}px Regular
    </Text>
    <Text style={[styles.typeExample, { fontSize: Typography.bodySmall, fontWeight: Typography.regular }]}>
      Body Small - {Typography.bodySmall}px Regular
    </Text>
    <Text style={[styles.typeExample, { fontSize: Typography.caption, fontWeight: Typography.medium }]}>
      Caption - {Typography.caption}px Medium
    </Text>
  </View>
);

// Spacing Showcase Component
const SpacingShowcase = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Spacing</Text>
    {Object.entries(Spacing).map(([name, value]) => (
      <View key={name} style={styles.spacingItem}>
        <View style={[styles.spacingBar, { width: value * 2 }]} />
        <Text style={styles.spacingLabel}>{name}: {value}px</Text>
      </View>
    ))}
  </View>
);

// Main Design Tokens Component
const DesignTokens = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Assassin Game Design System</Text>
    
    <ColorPalette 
      title="Primary Colors" 
      colors={{
        primary900: Colors.primary900,
        primary800: Colors.primary800,
        primary700: Colors.primary700,
        primary600: Colors.primary600,
        primary500: Colors.primary500,
      }} 
    />
    
    <ColorPalette 
      title="Secondary Colors" 
      colors={{
        secondary900: Colors.secondary900,
        secondary800: Colors.secondary800,
        secondary700: Colors.secondary700,
        secondary600: Colors.secondary600,
        secondary500: Colors.secondary500,
      }} 
    />
    
    <ColorPalette 
      title="Status Colors" 
      colors={{
        success: Colors.success,
        info: Colors.info,
        warning: Colors.warning,
        error: Colors.error,
      }} 
    />
    
    <ColorPalette 
      title="Greyscale" 
      colors={{
        grey900: Colors.grey900,
        grey700: Colors.grey700,
        grey500: Colors.grey500,
        grey300: Colors.grey300,
        grey100: Colors.grey100,
      }} 
    />
    
    <ColorPalette 
      title="Dark Theme" 
      colors={{
        dark1: Colors.dark1,
        dark2: Colors.dark2,
        dark3: Colors.dark3,
        dark4: Colors.dark4,
        dark5: Colors.dark5,
      }} 
    />
    
    <TypographyShowcase />
    <SpacingShowcase />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  title: {
    fontSize: Typography.h1,
    fontWeight: Typography.bold,
    color: Colors.grey900,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.h2,
    fontWeight: Typography.semibold,
    color: Colors.grey900,
    marginBottom: Spacing.lg,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  colorItem: {
    alignItems: 'center',
    width: 80,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.grey300,
  },
  colorName: {
    fontSize: Typography.caption,
    fontWeight: Typography.medium,
    color: Colors.grey700,
    textAlign: 'center',
  },
  colorValue: {
    fontSize: Typography.caption,
    color: Colors.grey500,
    textAlign: 'center',
  },
  typeExample: {
    color: Colors.grey900,
    marginBottom: Spacing.sm,
  },
  spacingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  spacingBar: {
    height: 8,
    backgroundColor: Colors.primary600,
    marginRight: Spacing.md,
  },
  spacingLabel: {
    fontSize: Typography.body,
    color: Colors.grey700,
  },
});

export default {
  title: 'Design System/Tokens',
  component: DesignTokens,
};

export const AllTokens = () => <DesignTokens />;

export const ColorsOnly = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Color System</Text>
    <ColorPalette title="Primary" colors={{ primary900: Colors.primary900, primary600: Colors.primary600, primary300: Colors.primary300 }} />
    <ColorPalette title="Status" colors={{ success: Colors.success, warning: Colors.warning, error: Colors.error }} />
  </ScrollView>
);

export const TypographyOnly = () => (
  <View style={styles.container}>
    <TypographyShowcase />
  </View>
); 