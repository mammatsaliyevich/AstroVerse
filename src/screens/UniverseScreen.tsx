import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { catalog, catalogKinds } from '../data/catalog';
import { CelestialObject, CelestialKind, KIND_LABELS } from '../types/celestial';
import { useUniverseStore } from '../store/universeStore';
import { NavProp } from '../types/navigation';

type KindFilter = CelestialKind | 'all';

const COLUMN_GAP = 16;
const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 24 * 2 - COLUMN_GAP) / 2;

const UniverseScreen: React.FC = () => {
  const navigation = useNavigation<NavProp<'Universe'>>();
  const { colors, typography } = useTheme();
  const hasVisited = useUniverseStore((s) => s.hasVisited);
  const isFavorite = useUniverseStore((s) => s.isFavorite);
  const favorites = useUniverseStore((s) => s.favorites);

  const [query, setQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [kind, setKind] = useState<KindFilter>('all');

  const filters: KindFilter[] = ['all', ...catalogKinds];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.filter((o) => {
      if (kind !== 'all' && o.kind !== kind) return false;
      if (favoritesOnly && !favorites.includes(o.id)) return false;
      if (!q) return true;
      return o.name.toLowerCase().includes(q);
    });
  }, [query, favoritesOnly, favorites, kind]);


  const renderItem = ({ item }: { item: CelestialObject }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, { borderColor: colors.border, backgroundColor: colors.glass.medium }]}
      onPress={() => navigation.navigate('ObjectDetail', { planetId: item.id })}
    >
      {isFavorite(item.id) && (
        <Text style={[styles.favStar, { color: colors.cosmic.orange }]}>★</Text>
      )}
      <View
        style={[
          styles.body,
          { backgroundColor: item.color },
          item.emissive && {
            shadowColor: item.color,
            shadowOpacity: 0.9,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 0 },
            elevation: 12,
          },
          item.kind === 'black_hole' && { borderWidth: 3, borderColor: colors.cosmic.purple },
        ]}
      />
      <Text style={[styles.name, { color: colors.text.primary, fontSize: typography.sizes.lg }]}>
        {item.name}
      </Text>
      <Text numberOfLines={2} style={{ color: colors.text.tertiary, fontSize: typography.sizes.xs, textAlign: 'center' }}>
        {item.tagline}
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
          The Universe
        </Text>
        <View style={{ width: 48 }} />
      </View>


      <View style={styles.controls}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search the universe..."
          placeholderTextColor={colors.text.tertiary}
          style={[
            styles.search,
            { color: colors.text.primary, backgroundColor: colors.glass.medium, borderColor: colors.border },
          ]}
        />
        <TouchableOpacity
          onPress={() => setFavoritesOnly((v) => !v)}
          style={[
            styles.filterBtn,
            {
              borderColor: colors.border,
              backgroundColor: favoritesOnly ? colors.cosmic.orange : colors.glass.medium,
            },
          ]}
        >
          <Text style={{ color: favoritesOnly ? colors.space.deep : colors.text.primary, fontSize: typography.sizes.md }}>
            ★
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chipsWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {filters.map((f) => {
            const active = kind === f;
            const label = f === 'all' ? 'All' : KIND_LABELS[f];
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setKind(f)}
                style={[
                  styles.chip,
                  {
                    borderColor: colors.border,
                    backgroundColor: active ? colors.cosmic.blue : colors.glass.medium,
                  },
                ]}
              >
                <Text style={{ color: active ? colors.space.deep : colors.text.secondary, fontSize: typography.sizes.sm }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>


      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: COLUMN_GAP }}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.text.tertiary }]}>
            {favoritesOnly
              ? 'No favorites yet. Tap ★ on an object to save it.'
              : 'Nothing matches your search.'}
          </Text>
        }
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
  controls: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 24,
    paddingBottom: 12,
    alignItems: 'center',
  },
  search: { flex: 1, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsWrap: { paddingBottom: 8 },
  chips: { paddingHorizontal: 24, gap: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1 },
  list: { paddingHorizontal: 24, paddingBottom: 24, gap: COLUMN_GAP },
  card: {
    width: CARD_SIZE,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    minHeight: 168,
    justifyContent: 'center',
  },
  favStar: { position: 'absolute', top: 10, right: 12, fontSize: 16 },
  body: { width: 64, height: 64, borderRadius: 32, marginBottom: 12 },
  name: { fontWeight: '600', marginBottom: 4, textAlign: 'center' },
  badge: { marginTop: 8, fontSize: 11, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, paddingHorizontal: 24 },
});

export default UniverseScreen;
