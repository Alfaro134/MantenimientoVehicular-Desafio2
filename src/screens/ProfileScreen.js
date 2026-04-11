import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, shadows } from '../theme';
import { MotiView } from 'moti';

const ProfileCard = ({ name, role, delay }) => (
  <MotiView
    from={{ opacity: 0, translateX: -20 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ delay, type: 'spring', damping: 15 }}
    style={[styles.card, shadows.neomorphic]}
  >
    <View style={styles.avatarPlaceholder}>
      <Text style={styles.avatarText}>{name.charAt(0)}</Text>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.roleText}>{role}</Text>
    </View>
  </MotiView>
);

export function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.header}>Perfil</Text>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <Text style={styles.sectionTitle}>Administradores</Text>
        
        <ProfileCard 
          name="Fernando Juarez" 
          role="Desarrollador Principal" 
          delay={100} 
        />
        
        <ProfileCard 
          name="Josue Alfaro" 
          role="Co-Desarrollador" 
          delay={300} 
        />

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 600 }}
          style={styles.versionInfo}
        >
          <Text style={styles.versionText}>Mantenimiento Vehicular v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2026 Todos los derechos reservados</Text>
        </MotiView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 18,
  },
  sectionTitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
    marginTop: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceGlass,
    borderRadius: spacing.cardRadius,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderGlass,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderGlass,
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  cardContent: {
    marginLeft: 16,
  },
  nameText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  roleText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  versionInfo: {
    marginTop: 32,
    alignItems: 'center',
    opacity: 0.6,
  },
  versionText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  copyrightText: {
    color: colors.textMuted,
    fontSize: 12,
  },
});
