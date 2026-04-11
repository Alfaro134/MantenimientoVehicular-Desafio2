import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PartCard } from '../components/PartCard';
import { colors } from '../theme';

export function HomeScreen({ sortedParts, onAddPress, onOpenDetail, onDelete, onEdit }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.header}>Piezas</Text>

      <Pressable
        onPress={onAddPress}
        style={({ pressed }) => [styles.addBtn, pressed && styles.addBtnPressed]}
        accessibilityRole="button"
        accessibilityLabel="Agregar pieza"
      >
        <Text style={styles.addBtnText}>Agregar Pieza</Text>
      </Pressable>

      {sortedParts.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>No hay piezas, Agregue una</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 28 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {sortedParts.map((item, index) => (
            <PartCard
              key={item.id}
              index={index}
              pieza={item.pieza}
              marca={item.marca}
              precio={item.precio}
              fechaCambio={item.fechaCambio}
              onOpenDetail={() => onOpenDetail(item)}
              onDelete={() => onDelete(item.id)}
              onEdit={() => onEdit(item)}
            />
          ))}
        </ScrollView>
      )}
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
  addBtn: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: colors.borderGlass,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 22,
  },
  addBtnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  addBtnText: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 4,
  },
});
