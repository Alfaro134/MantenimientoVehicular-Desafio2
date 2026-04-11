import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.header}>Perfil</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Pantalla de Perfil</Text>
        <Text style={styles.placeholderSubtext}>Próximamente disponible</Text>
      </View>
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
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  placeholderSubtext: {
    color: colors.textMuted,
    fontSize: 16,
  },
});
