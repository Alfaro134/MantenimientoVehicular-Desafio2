import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, shadows } from '../theme';
import { MotiView } from 'moti';

export function StatisticsScreen({ parts = [] }) {
  const insets = useSafeAreaInsets();

  const totalExpenses = useMemo(() => {
    return parts.reduce((sum, part) => {
      const price = parseFloat(part.precio) || 0;
      return sum + price;
    }, 0);
  }, [parts]);

  const formattedTotal = totalExpenses.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.header}>Estadísticas</Text>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.9, translateY: 20 }}
          animate={{ opacity: 1, scale: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={[styles.summaryCard, shadows.neomorphic]}
        >
          <Text style={styles.summaryLabel}>Total de Gastos</Text>
          <Text style={styles.summaryValue}>{formattedTotal}</Text>
          <View style={styles.divider} />
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statSublabel}>Piezas Registradas</Text>
              <Text style={styles.statSubvalue}>{parts.length}</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View>
              <Text style={styles.statSublabel}>Promedio por Pieza</Text>
              <Text style={styles.statSubvalue}>
                {(parts.length > 0 ? totalExpenses / parts.length : 0).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Text>
            </View>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 150, type: 'timing', duration: 600 }}
          style={styles.infoCard}
        >
          <Text style={styles.infoText}>
            Este es un resumen simplificado de tus mantenimientos vehiculares.
          </Text>
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
  summaryCard: {
    backgroundColor: colors.surfaceGlass,
    borderRadius: spacing.cardRadius,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.borderGlass,
    marginBottom: 20,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  summaryValue: {
    color: colors.textPrimary,
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGlass,
    marginVertical: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.borderGlass,
  },
  statSublabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  statSubvalue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.chartAccent,
  },
  infoText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
