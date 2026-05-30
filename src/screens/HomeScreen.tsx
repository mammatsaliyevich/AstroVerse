import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { useUniverseStore } from '../store/universeStore';
import { levelForXp } from '../services/progression';
import Button from '../components/ui/Button';
import { NavProp } from '../types/navigation';

const { height } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp<'Home'>>();
  const { colors, typography } = useTheme();
  const xp = useUniverseStore((s) => s.xp);
  const visited = useUniverseStore((s) => s.visited.length);
  const level = levelForXp(xp).level;

  return (
    <LinearGradient
      colors={[colors.space.deep, colors.space.dark, colors.space.medium]}
      style={styles.fill}
    >
      <SafeAreaView style={styles.fill}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.sizes.display }]}>
              AstroVerse
            </Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary, fontSize: typography.sizes.md }]}>
              Travel the universe. Discover every world.
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Stat label="Planets Visited" value={`${visited}/8`} color={colors.cosmic.cyan} />
            <Stat label="Level" value={`${level}`} color={colors.cosmic.pink} />
            <Stat label="Experience" value={`${xp} XP`} color={colors.cosmic.purple} />
          </View>

          <View style={styles.actions}>
            <Button title="Begin Journey" onPress={() => navigation.navigate('Explore')} fullWidth />
            <View style={{ height: 12 }} />
            <Button
              title="Browse Catalog"
              variant="outline"
              onPress={() => navigation.navigate('Universe')}
              fullWidth
            />
            <View style={{ height: 12 }} />
            <Button
              title="Achievements"
              variant="secondary"
              onPress={() => navigation.navigate('Achievements')}
              fullWidth
            />
            <View style={{ height: 12 }} />
            <Button
              title="Ask the AI Guide"
              variant="outline"
              onPress={() => navigation.navigate('AIGuide', {})}
              fullWidth
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const Stat: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => {
  const { colors, typography } = useTheme();
  return (
    <View style={styles.stat}>
      <Text style={{ color, fontSize: typography.sizes.xl, fontWeight: typography.weights.bold }}>{value}</Text>
      <Text style={{ color: colors.text.tertiary, fontSize: typography.sizes.xs }}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between', paddingVertical: height * 0.08 },
  header: { alignItems: 'center', marginTop: height * 0.06 },
  title: { fontWeight: '700', letterSpacing: 1 },
  subtitle: { marginTop: 12, textAlign: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  actions: { width: '100%' },
});

export default HomeScreen;
