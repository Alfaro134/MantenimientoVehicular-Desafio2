import 'react-native-get-random-values';
import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import { SkiaMeshBackground } from './src/components/SkiaMeshBackground';
import { DetailModal } from './src/components/DetailModal';
import { BottomTabNavigator } from './src/components/BottomTabNavigator';
import { HomeScreen } from './src/screens/HomeScreen';
import { StatisticsScreen } from './src/screens/StatisticsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { sortPartsByDate } from './src/utils/dates';

const STORAGE_KEY = '@piezas_premium_parts_v1';

export default function App() {
  const [screen, setScreen] = useState('list');
  const [activeTab, setActiveTab] = useState('home');
  const [parts, setParts] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [detailPart, setDetailPart] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && !cancelled) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setParts(parsed);
        }
      } catch {
        /* ignore corrupt storage */
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parts)).catch(() => {});
  }, [parts, hydrated]);

  const sortedParts = useMemo(() => sortPartsByDate(parts), [parts]);

  const handleSavePart = (payload) => {
    setParts((prev) => [...prev, { id: uuidv4(), ...payload }]);
    setScreen('list');
  };

  const handleDelete = (id) => {
    setParts((prev) => prev.filter((p) => p.id !== id));
    if (detailPart?.id === id) {
      setDetailOpen(false);
      setDetailPart(null);
    }
  };

  const openDetail = (part) => {
    setDetailPart(part);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setDetailPart(null);
  };

  const renderScreen = () => {
    if (screen === 'register') {
      return (
        <RegisterScreen
          onSave={handleSavePart}
          onCancel={() => setScreen('list')}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            sortedParts={sortedParts}
            onAddPress={() => setScreen('register')}
            onOpenDetail={openDetail}
            onDelete={handleDelete}
          />
        );
      case 'statistics':
        return <StatisticsScreen parts={parts} />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return (
          <HomeScreen
            sortedParts={sortedParts}
            onAddPress={() => setScreen('register')}
            onOpenDetail={openDetail}
            onDelete={handleDelete}
          />
        );
    }
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <View style={styles.root}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <SkiaMeshBackground />
          <View style={styles.layer} pointerEvents="box-none">
            {renderScreen()}
          </View>
          {screen !== 'register' && (
            <BottomTabNavigator
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )}
          <DetailModal visible={detailOpen} part={detailPart} onClose={closeDetail} />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  layer: {
    flex: 1,
  },
});
