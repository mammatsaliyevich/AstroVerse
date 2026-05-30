import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { getSurface, LANDMARK_ICON } from '../data/surfaces';
import { useUniverseStore } from '../store/universeStore';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import { NavProp, Route } from '../types/navigation';

/** Picks a legible text color (dark or light) for a given background. */
function readableOn(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0a0a14' : '#ffffff';
}

const SurfaceScreen: React.FC = () => {
  const navigation = useNavigation<NavProp<'Surface'>>();
  const route = useRoute<Route<'Surface'>>();
  const { colors, typography } = useTheme();
  const discoverLandmark = useUniverseStore((s) => s.discoverLandmark);
  const discovered = useUniverseStore((s) => s.discoveredLandmarks);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const surface = getSurface(route.params.objectId);

  if (!surface) {
    return (
      <SafeAreaView style={[styles.fill, styles.center, { backgroundColor: colors.space.deep }]}>
        <Text style={{ color: colors.text.primary }}>No surface data for this object.</Text>
        <Button title="Go Back" variant="outline" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const env = surface.environment;
  const onSky = readableOn(env.skyColors[1]);
  const discoveredCount = surface.landmarks.filter((l) => discovered.includes(l.id)).length;
  const total = surface.landmarks.length;

  const handleLandmark = (id: string) => {
    discoverLandmark(id);
    setExpandedId((prev) => (prev === id ? null : id));
  };


  const envItems: Array<{ icon: string; label: string; value: string }> = [
    { icon: '🌫️', label: 'Atmosphere', value: env.atmosphere },
    { icon: '⚖️', label: 'Gravity', value: env.gravity },
    { icon: '🌡️', label: 'Temperature', value: env.temperature },
    { icon: '🕓', label: 'Day length', value: env.dayLength },
  ];

  return (
    <View style={[styles.fill, { backgroundColor: colors.space.deep }]}>
      <LinearGradient colors={env.skyColors} style={styles.scene}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: onSky, fontSize: typography.sizes.md, fontWeight: '600' }}>← Leave</Text>
            </TouchableOpacity>
            <Text style={{ color: onSky, fontSize: typography.sizes.md, fontWeight: '700' }}>
              {surface.name} Surface
            </Text>
            <View style={{ width: 56 }} />
          </View>
          <View style={styles.landed}>
            <Text style={{ color: onSky, fontSize: typography.sizes.xl, fontWeight: '700' }}>
              You have landed on {surface.name}
            </Text>
            <Text style={{ color: onSky, fontSize: typography.sizes.sm, opacity: 0.85, marginTop: 4 }}>
              {surface.tagline}
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={[styles.ground, { backgroundColor: env.groundColor }]} />

      <ScrollView style={styles.fill} contentContainerStyle={styles.content}>
        <Text style={[styles.section, { color: colors.text.primary, fontSize: typography.sizes.lg }]}>
          Environment
        </Text>
        <View style={styles.envGrid}>
          {envItems.map((item) => (
            <View
              key={item.label}
              style={[styles.envCard, { backgroundColor: colors.glass.medium, borderColor: colors.border }]}
            >
              <Text style={styles.envIcon}>{item.icon}</Text>
              <Text style={{ color: colors.text.tertiary, fontSize: typography.sizes.xs }}>{item.label}</Text>
              <Text style={{ color: colors.text.primary, fontSize: typography.sizes.sm, fontWeight: '600' }}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>


        <View style={styles.progressRow}>
          <Text style={[styles.section, { color: colors.text.primary, fontSize: typography.sizes.lg, marginBottom: 0 }]}>
            Landmarks
          </Text>
          <Text style={{ color: colors.text.tertiary, fontSize: typography.sizes.sm }}>
            {discoveredCount} / {total} discovered
          </Text>
        </View>
        <ProgressBar
          value={total > 0 ? discoveredCount / total : 0}
          color={colors.status.success}
          style={{ marginBottom: 16 }}
        />

        {surface.landmarks.map((landmark) => {
          const isDiscovered = discovered.includes(landmark.id);
          const isOpen = expandedId === landmark.id;
          return (
            <TouchableOpacity
              key={landmark.id}
              activeOpacity={0.85}
              onPress={() => handleLandmark(landmark.id)}
              style={[styles.landmark, { backgroundColor: colors.glass.medium, borderColor: colors.border }]}
            >
              <View style={styles.landmarkHead}>
                <Text style={styles.landmarkIcon}>{LANDMARK_ICON[landmark.type]}</Text>
                <View style={styles.fill}>
                  <Text style={{ color: colors.text.primary, fontSize: typography.sizes.md, fontWeight: '700' }}>
                    {landmark.name}
                  </Text>
                  <Text style={{ color: colors.text.tertiary, fontSize: typography.sizes.xs, textTransform: 'capitalize' }}>
                    {landmark.type}
                    {landmark.coordinates ? ` · ${landmark.coordinates}` : ''}
                  </Text>
                </View>
                <Text style={{ color: isDiscovered ? colors.status.success : colors.text.tertiary, fontSize: typography.sizes.sm }}>
                  {isDiscovered ? '✓' : '○'}
                </Text>
              </View>
              <Text style={{ color: colors.text.secondary, fontSize: typography.sizes.sm, marginTop: 6 }}>
                {landmark.description}
              </Text>
              {isOpen &&
                landmark.facts.map((fact, i) => (
                  <View key={i} style={styles.factRow}>
                    <Text style={{ color: colors.cosmic.cyan }}>•</Text>
                    <Text style={{ color: colors.text.secondary, flex: 1, fontSize: typography.sizes.sm }}>
                      {fact}
                    </Text>
                  </View>
                ))}
              {!isOpen && (
                <Text style={{ color: colors.cosmic.cyan, fontSize: typography.sizes.xs, marginTop: 6 }}>
                  Tap to explore →
                </Text>
              )}
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 20 }} />
        <Button title="Return to Navigator" onPress={() => navigation.navigate('Explore')} fullWidth />
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  fill: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center', gap: 16 },
  scene: { paddingBottom: 28 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  landed: { paddingHorizontal: 20, paddingTop: 8 },
  ground: { height: 22 },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },
  section: { fontWeight: '700', marginBottom: 12 },
  envGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  envCard: {
    width: '47%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 2,
  },
  envIcon: { fontSize: 20, marginBottom: 2 },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 28,
    marginBottom: 10,
  },
  landmark: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  landmarkHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  landmarkIcon: { fontSize: 28 },
  factRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
});

export default SurfaceScreen;
