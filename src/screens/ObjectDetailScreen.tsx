import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { getPlanetById } from '../data/planets';
import { useUniverseStore } from '../store/universeStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { NavProp, Route } from '../types/navigation';

const ObjectDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavProp<'ObjectDetail'>>();
  const route = useRoute<Route<'ObjectDetail'>>();
  const { colors, typography } = useTheme();
  const visitPlanet = useUniverseStore((s) => s.visitPlanet);
  const toggleFavorite = useUniverseStore((s) => s.toggleFavorite);
  const planetId = route.params.planetId;
  const favorite = useUniverseStore((s) => s.favorites.includes(planetId));

  const planet = getPlanetById(planetId);

  useEffect(() => {
    if (planet) visitPlanet(planet.id);
  }, [planet, visitPlanet]);

  if (!planet) {
    return (
      <SafeAreaView style={[styles.fill, styles.center, { backgroundColor: colors.space.deep }]}>
        <Text style={{ color: colors.text.primary }}>Planet not found.</Text>
        <Button title="Go Back" variant="outline" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const stats: Array<[string, string]> = [
    ['Radius', `${planet.radiusKm.toLocaleString()} km`],
    ['Gravity', `${planet.gravity} m/s²`],
    ['Day length', `${planet.dayLengthHours} h`],
    ['Year length', `${planet.yearLengthDays} days`],
    ['Avg. temp', `${planet.avgTempC}°C`],
    ['Moons', `${planet.moons}`],
  ];

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.space.deep }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          onPress={() => navigation.goBack()}
          style={{ color: colors.text.secondary, fontSize: typography.sizes.md }}
        >
          ← Back
        </Text>

        <View style={styles.hero}>
          <View style={[styles.planet, { backgroundColor: planet.color }]} />
          <Text style={[styles.name, { color: colors.text.primary, fontSize: typography.sizes.xxl }]}>
            {planet.name}
          </Text>
          <Text style={{ color: colors.text.secondary, fontSize: typography.sizes.md, textAlign: 'center' }}>
            {planet.description}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map(([label, value]) => (
            <Card key={label} style={styles.statCard}>
              <Text style={{ color: colors.text.primary, fontSize: typography.sizes.lg, fontWeight: '700' }}>
                {value}
              </Text>
              <Text style={{ color: colors.text.tertiary, fontSize: typography.sizes.xs }}>{label}</Text>
            </Card>
          ))}
        </View>

        <Text style={[styles.section, { color: colors.text.primary, fontSize: typography.sizes.lg }]}>
          Did you know?
        </Text>
        {planet.facts.map((fact, i) => (
          <View key={i} style={styles.factRow}>
            <Text style={{ color: colors.cosmic.cyan }}>•</Text>
            <Text style={{ color: colors.text.secondary, flex: 1, fontSize: typography.sizes.sm }}>
              {fact}
            </Text>
          </View>
        ))}

        <View style={{ height: 20 }} />
        <Button
          title={favorite ? '★ Favorited' : '☆ Add to Favorites'}
          variant="secondary"
          onPress={() => toggleFavorite(planet.id)}
          fullWidth
        />
        <View style={{ height: 12 }} />
        <Button
          title={`Ask AI about ${planet.name}`}
          onPress={() => navigation.navigate('AIGuide', { planetId: planet.id })}
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center', gap: 16 },
  content: { paddingHorizontal: 24, paddingBottom: 40 },
  hero: { alignItems: 'center', marginVertical: 20, gap: 12 },
  planet: { width: 120, height: 120, borderRadius: 60 },
  name: { fontWeight: '700' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  statCard: { width: '31%', alignItems: 'center' },
  section: { fontWeight: '700', marginTop: 28, marginBottom: 12 },
  factRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
});

export default ObjectDetailScreen;
