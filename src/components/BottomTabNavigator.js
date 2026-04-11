import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme';

export function BottomTabNavigator({ activeTab, onTabChange }) {
  const insets = useSafeAreaInsets();

  const tabs = [
    {
      id: 'home',
      label: 'Inicio',
      icon: 'home',
    },
    {
      id: 'statistics',
      label: 'Estadísticas',
      icon: 'bar-chart',
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: 'person',
    },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabChange(tab.id)}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isActive }}
            >
              <Icon
                name={tab.icon}
                size={24}
                color={isActive ? colors.textPrimary : colors.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? colors.textPrimary : colors.textMuted },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderTopWidth: 1,
    borderTopColor: colors.borderGlass,
    zIndex: 10,
  },
  content: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
