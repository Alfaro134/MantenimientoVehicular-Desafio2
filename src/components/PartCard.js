import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown, FadeOut, Layout } from 'react-native-reanimated';
import { colors } from '../theme';

export function PartCard({ index, pieza, fechaCambio, onOpenDetail, onDelete }) {
  const stagger = Math.min(index, 12) * 72;
  return (
    <Animated.View
      entering={FadeInDown.delay(stagger).springify().damping(16).stiffness(280)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify().damping(18).stiffness(300)}
      style={styles.cardOuter}
    >
      <BlurView intensity={28} tint="dark" style={styles.blur}>
        <View style={styles.inner}>
          <Pressable
            onPress={onOpenDetail}
            style={({ pressed }) => [styles.mainPress, pressed && styles.mainPressPressed]}
          >
            <Text style={styles.labelPieza}>
              Pieza: <Text style={styles.value}>{pieza || '—'}</Text>
            </Text>
            <Text style={styles.labelFecha}>
              Fecha de Cambio:{' '}
              <Text style={styles.value}>{fechaCambio || '—'}</Text>
            </Text>
          </Pressable>

          <Pressable
            onPress={onDelete}
            style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}
            accessibilityRole="button"
            accessibilityLabel="Eliminar pieza"
          >
            <Text style={styles.deleteText}>Eliminar</Text>
          </Pressable>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    marginBottom: 14,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderGlass,
    backgroundColor: colors.surfaceGlass,
  },
  blur: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  inner: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  mainPress: {
    paddingBottom: 10,
  },
  mainPressPressed: {
    opacity: 0.85,
  },
  labelPieza: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  labelFecha: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  value: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 59, 48, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.45)',
  },
  deleteBtnPressed: {
    backgroundColor: 'rgba(255, 59, 48, 0.28)',
  },
  deleteText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
