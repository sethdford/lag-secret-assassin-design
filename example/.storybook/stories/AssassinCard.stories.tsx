import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from './DesignTokens.stories';

interface AssassinCardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'danger' | 'success' | 'warning' | 'dark';
  elevation?: 'low' | 'medium' | 'high';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const AssassinCard: React.FC<AssassinCardProps> = ({
  title,
  subtitle,
  children,
  variant = 'default',
  elevation = 'medium',
  padding = 'medium',
}) => {
  const getCardStyle = () => {
    return [
      styles.card,
      styles[variant],
      styles[elevation],
      styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    ];
  };

  const getTitleStyle = () => {
    return [styles.title, styles[`${variant}Title`]];
  };

  const getSubtitleStyle = () => {
    return [styles.subtitle, styles[`${variant}Subtitle`]];
  };

  return (
    <View style={getCardStyle()}>
      {title && <Text style={getTitleStyle()}>{title}</Text>}
      {subtitle && <Text style={getSubtitleStyle()}>{subtitle}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  // Base Card Style
  card: {
    borderRadius: 12,
    borderWidth: 1,
  },
  
  // Variant Styles
  default: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey300,
  },
  danger: {
    backgroundColor: '#FFF5F5',
    borderColor: Colors.error,
  },
  success: {
    backgroundColor: '#F0FDF4',
    borderColor: Colors.success,
  },
  warning: {
    backgroundColor: '#FFFBEB',
    borderColor: Colors.warning,
  },
  dark: {
    backgroundColor: Colors.dark2,
    borderColor: Colors.dark4,
  },
  
  // Elevation Styles
  low: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  high: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // Padding Styles
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: Spacing.sm,
  },
  paddingMedium: {
    padding: Spacing.md,
  },
  paddingLarge: {
    padding: Spacing.lg,
  },
  
  // Title Styles
  title: {
    fontSize: Typography.h4,
    fontWeight: Typography.semibold,
    marginBottom: Spacing.xs,
  },
  defaultTitle: {
    color: Colors.grey900,
  },
  dangerTitle: {
    color: Colors.error,
  },
  successTitle: {
    color: Colors.success,
  },
  warningTitle: {
    color: Colors.warning,
  },
  darkTitle: {
    color: Colors.white,
  },
  
  // Subtitle Styles
  subtitle: {
    fontSize: Typography.body,
    fontWeight: Typography.regular,
    marginBottom: Spacing.sm,
  },
  defaultSubtitle: {
    color: Colors.grey600,
  },
  dangerSubtitle: {
    color: Colors.grey700,
  },
  successSubtitle: {
    color: Colors.grey700,
  },
  warningSubtitle: {
    color: Colors.grey700,
  },
  darkSubtitle: {
    color: Colors.grey400,
  },
});

// Game-specific Card Components
const PlayerCard = ({ name, status, target }: { name: string; status: 'alive' | 'dead' | 'spectator'; target?: string }) => (
  <AssassinCard 
    title={name}
    subtitle={status === 'alive' ? `Target: ${target}` : status.charAt(0).toUpperCase() + status.slice(1)}
    variant={status === 'alive' ? 'success' : status === 'dead' ? 'danger' : 'default'}
  >
    <View style={gameStyles.statusIndicator}>
      <View style={[gameStyles.statusDot, { backgroundColor: status === 'alive' ? Colors.success : status === 'dead' ? Colors.error : Colors.grey500 }]} />
      <Text style={gameStyles.statusText}>{status.toUpperCase()}</Text>
    </View>
  </AssassinCard>
);

const GameCard = ({ title, players, status }: { title: string; players: number; status: 'active' | 'pending' | 'completed' }) => (
  <AssassinCard 
    title={title}
    subtitle={`${players} players`}
    variant={status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'default'}
  >
    <View style={gameStyles.gameInfo}>
      <Text style={gameStyles.infoLabel}>Status</Text>
      <Text style={[gameStyles.infoValue, { color: status === 'active' ? Colors.success : status === 'pending' ? Colors.warning : Colors.grey600 }]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  </AssassinCard>
);

const EliminationCard = ({ eliminator, target, method, time }: { eliminator: string; target: string; method: string; time: string }) => (
  <AssassinCard 
    title="Elimination Report"
    variant="danger"
  >
    <View style={gameStyles.eliminationInfo}>
      <Text style={gameStyles.eliminationText}>
        <Text style={gameStyles.playerName}>{eliminator}</Text> eliminated{' '}
        <Text style={gameStyles.playerName}>{target}</Text>
      </Text>
      <Text style={gameStyles.methodText}>Method: {method}</Text>
      <Text style={gameStyles.timeText}>{time}</Text>
    </View>
  </AssassinCard>
);

const gameStyles = StyleSheet.create({
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.sm,
  },
  statusText: {
    fontSize: Typography.caption,
    fontWeight: Typography.semibold,
    color: Colors.grey600,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  infoLabel: {
    fontSize: Typography.bodySmall,
    color: Colors.grey600,
  },
  infoValue: {
    fontSize: Typography.bodySmall,
    fontWeight: Typography.semibold,
  },
  eliminationInfo: {
    marginTop: Spacing.sm,
  },
  eliminationText: {
    fontSize: Typography.body,
    color: Colors.grey900,
    marginBottom: Spacing.xs,
  },
  playerName: {
    fontWeight: Typography.semibold,
    color: Colors.error,
  },
  methodText: {
    fontSize: Typography.bodySmall,
    color: Colors.grey600,
    marginBottom: Spacing.xs,
  },
  timeText: {
    fontSize: Typography.caption,
    color: Colors.grey500,
  },
});

// Story Components
const CardShowcase = () => (
  <ScrollView style={showcaseStyles.container}>
    <Text style={showcaseStyles.title}>Assassin Game Cards</Text>
    
    <View style={showcaseStyles.section}>
      <Text style={showcaseStyles.sectionTitle}>Basic Variants</Text>
      <AssassinCard title="Default Card" subtitle="Basic card styling">
        <Text style={showcaseStyles.cardContent}>This is a default card with standard styling.</Text>
      </AssassinCard>
      
      <AssassinCard title="Danger Card" subtitle="High priority alert" variant="danger">
        <Text style={showcaseStyles.cardContent}>This is a danger card for critical information.</Text>
      </AssassinCard>
      
      <AssassinCard title="Success Card" subtitle="Positive feedback" variant="success">
        <Text style={showcaseStyles.cardContent}>This is a success card for positive actions.</Text>
      </AssassinCard>
      
      <AssassinCard title="Warning Card" subtitle="Caution required" variant="warning">
        <Text style={showcaseStyles.cardContent}>This is a warning card for important notices.</Text>
      </AssassinCard>
      
      <AssassinCard title="Dark Card" subtitle="Dark theme variant" variant="dark">
        <Text style={[showcaseStyles.cardContent, { color: Colors.white }]}>This is a dark card for dark mode interfaces.</Text>
      </AssassinCard>
    </View>
    
    <View style={showcaseStyles.section}>
      <Text style={showcaseStyles.sectionTitle}>Game Components</Text>
      <PlayerCard name="Alex Johnson" status="alive" target="Sarah Smith" />
      <PlayerCard name="Mike Wilson" status="dead" />
      <PlayerCard name="Emma Davis" status="spectator" />
      
      <GameCard title="Campus Elimination" players={24} status="active" />
      <GameCard title="Office Warriors" players={12} status="pending" />
      <GameCard title="Dorm Battle" players={8} status="completed" />
      
      <EliminationCard 
        eliminator="Alex Johnson" 
        target="Sarah Smith" 
        method="Water gun ambush" 
        time="2 hours ago" 
      />
    </View>
    
    <View style={showcaseStyles.section}>
      <Text style={showcaseStyles.sectionTitle}>Elevation Levels</Text>
      <AssassinCard title="Low Elevation" subtitle="Subtle shadow" elevation="low">
        <Text style={showcaseStyles.cardContent}>This card has low elevation.</Text>
      </AssassinCard>
      
      <AssassinCard title="Medium Elevation" subtitle="Standard shadow" elevation="medium">
        <Text style={showcaseStyles.cardContent}>This card has medium elevation.</Text>
      </AssassinCard>
      
      <AssassinCard title="High Elevation" subtitle="Prominent shadow" elevation="high">
        <Text style={showcaseStyles.cardContent}>This card has high elevation.</Text>
      </AssassinCard>
    </View>
  </ScrollView>
);

const showcaseStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.grey50,
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
  cardContent: {
    fontSize: Typography.body,
    color: Colors.grey700,
    lineHeight: 20,
  },
});

export default {
  title: 'Design System/Card',
  component: AssassinCard,
};

export const AllVariants = () => <CardShowcase />;

export const BasicCard = () => (
  <View style={{ padding: Spacing.lg, backgroundColor: Colors.grey50 }}>
    <AssassinCard title="Game Information" subtitle="Current status">
      <Text>This is a basic card with title and content.</Text>
    </AssassinCard>
  </View>
);

export const PlayerCards = () => (
  <View style={{ padding: Spacing.lg, backgroundColor: Colors.grey50, gap: Spacing.md }}>
    <PlayerCard name="Alex Johnson" status="alive" target="Sarah Smith" />
    <PlayerCard name="Mike Wilson" status="dead" />
    <PlayerCard name="Emma Davis" status="spectator" />
  </View>
);

export const GameCards = () => (
  <View style={{ padding: Spacing.lg, backgroundColor: Colors.grey50, gap: Spacing.md }}>
    <GameCard title="Campus Elimination" players={24} status="active" />
    <GameCard title="Office Warriors" players={12} status="pending" />
    <GameCard title="Dorm Battle" players={8} status="completed" />
  </View>
);

export const EliminationCards = () => (
  <View style={{ padding: Spacing.lg, backgroundColor: Colors.grey50 }}>
    <EliminationCard 
      eliminator="Alex Johnson" 
      target="Sarah Smith" 
      method="Water gun ambush" 
      time="2 hours ago" 
    />
  </View>
); 