import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { useUniverseStore } from '../store/universeStore';
import { achievements } from '../data/achievements';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import { NavProp } from '../types/navigation';

const AchievementsScreen: React.FC = () => {
  const navigation = useNavigation<NavProp<'Achievements'>>();
  const { colors, typography } = useTheme();
  const xp = useUniverseStore((s) => s.xp);
  const unlocked = useUniverseStore((s) => s.unlockedAchievements);
  const getLevel = useUniverseStore((s) => s.getLevel);
  const level = getLevel();

  const unlockedCount = unlocked.length;
  const total = achievements.length;

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.space.deep }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.text.secondary, fontSize: typography.sizes.md }}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.text.primary, fontSize: typography.sizes.xl }]}>
          Achievements
        </Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.levelCard}>
          <View style={styles.levelTop}>
            <Text style={{ color: colors.text.primary, fontSize: typography.sizes.lg, fontWeight: '700' }}>
              Level {level.level}
            </Text>
            <Text style={{ color: colors.text.tertiary, fontSize: typography.sizes.xs }}>
              {level.totalXp} XP total
            </Text>
          </View>
          <ProgressBar value={level.progress} color={colors.cosmic.purple} style={{ marginTop: 12 }} />
          <Text style={{ color: colors.text.tertiary, fontSize: typography.sizes.xs, marginTop: 8 }}>
            {level.currentLevelXp} / {level.nextLevelXp} XP to next level
          </Text>
          <Text style={{ color: colors.cosmic.cyan, fontSize: typography.sizes.sm, marginTop: 12 }}>
            {unlockedCount} of {total} badges unlocked
          </Text>
        </Card>


        {achievements.map((a) => {
          const isUnlocked = unlocked.includes(a.id);
          return (
            <Card
              key={a.id}
              style={[styles.badge, { opacity: isUnlocked ? 1 : 0.55 }]}
            >
              <View style={styles.badgeRow}>
                <Text style={styles.badgeIcon}>{isUnlocked ? a.icon : '🔒'}</Text>
                <View style={styles.badgeText}>
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontSize: typography.sizes.md,
                      fontWeight: '700',
                    }}
                  >
                    {a.title}
                  </Text>
                  <Text style={{ color: colors.text.secondary, fontSize: typography.sizes.sm }}>
                    {a.description}
                  </Text>
                  {a.xpReward > 0 && (
                    <Text style={{ color: colors.cosmic.orange, fontSize: typography.sizes.xs, marginTop: 4 }}>
                      +{a.xpReward} XP
                    </Text>
                  )}
                </View>
                {isUnlocked && (
                  <Text style={{ color: colors.status.success, fontSize: typography.sizes.lg }}>✓</Text>
                )}
              </View>
            </Card>
          );
        })}
        <View style={{ height: 24 }} />
      </ScrollView>
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
  content: { paddingHorizontal: 24, paddingBottom: 24, gap: 12 },
  levelCard: { marginBottom: 8 },
  levelTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  badge: {},
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  badgeIcon: { fontSize: 32 },
  badgeText: { flex: 1, gap: 2 },
});

export default AchievementsScreen;
