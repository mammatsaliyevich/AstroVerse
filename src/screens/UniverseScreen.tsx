import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { planets } from '../data/planets';
import { Planet } from '../types/celestial';
import { useUniverseStore } from '../store/universeStore';
import { NavProp } from '../types/navigation';

const COLUMN_GAP = 16;
const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 24 * 2 - COLUMN_GAP) / 2;

const UniverseScreen: React.FC = () => {
  const navigation = useNavigation<NavProp<'Universe'>>();
  const { colors, typography } = useTheme();
  const hasVisited = useUniverseStore((s) => s.hasVisited);

  const renderItem = ({ item }: { item: Planet }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, { borderColor: colors.border, backgroundColor: colors.glass.medium }]}
      onPress={() => navigation.navigate('ObjectDetail', { planetId: item.id })}
    >
      <View style={[styles.planet, { backgroundColor: item.color }]} />
      <Text style={[styles.name, { color: colors.text.primary, fontSize: typography.sizes.lg }]}>
        {item.name}
      </Text>
      <Text style={{ color: colors.text.tertiary, fontSize: typography.sizes.xs }}>
        {item.moons} moon{item.moons === 1 ? '' : 's'} · {item.distanceFromSunAu} AU
      </Text>
      {hasVisited(item.id) && (
        <Text style={[styles.badge, { color: colors.cosmic.cyan }]}>✓ Visited</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.space.deep }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.text.secondary, fontSize: typography.sizes.md }}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.text.primary, fontSize: typography.sizes.xl }]}>
          Solar System
        </Text>
        <View style={{ width: 48 }} />
      </View>
      <FlatList
        data={planets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: COLUMN_GAP }}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  heading: { fontWeight: '700' },
  list: { paddingHorizontal: 24, paddingBottom: 24, gap: COLUMN_GAP },
  card: {
    width: CARD_SIZE,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  planet: { width: 64, height: 64, borderRadius: 32, marginBottom: 12 },
  name: { fontWeight: '600', marginBottom: 4 },
  badge: { marginTop: 8, fontSize: 11, fontWeight: '600' },
});

export default UniverseScreen;
