import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { useExplorer } from '../hooks/useExplorer';
import { SCALES } from '../engine/scales';
import { hasChildren } from '../engine/hierarchy';
import { getObjectById } from '../data/catalog';
import { NavProp } from '../types/navigation';

const ExploreScreen: React.FC = () => {
  const navigation = useNavigation<NavProp<'Explore'>>();
  const { colors, typography } = useTheme();
  const {
    node,
    children,
    breadcrumb,
    object,
    isTransitioning,
    canZoomOut,
    canBack,
    canForward,
    focusNode,
    zoomOut,
    back,
    forward,
    reset,
  } = useExplorer();

  const scale = node ? SCALES[node.scale] : undefined;
  const colorFor = (objectId?: string) =>
    (objectId ? getObjectById(objectId)?.color : undefined) ?? colors.cosmic.blue;


  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.space.deep }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.text.secondary, fontSize: typography.sizes.md }}>✕ Exit</Text>
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.text.primary, fontSize: typography.sizes.lg }]}>
          Navigator
        </Text>
        <TouchableOpacity onPress={reset}>
          <Text style={{ color: colors.text.secondary, fontSize: typography.sizes.md }}>⟲ Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.breadcrumb}
      >
        {breadcrumb.map((crumb, i) => {
          const isLast = i === breadcrumb.length - 1;
          return (
            <View key={crumb.id} style={styles.crumbItem}>
              <TouchableOpacity disabled={isLast} onPress={() => focusNode(crumb.id)}>
                <Text
                  style={{
                    color: isLast ? colors.cosmic.cyan : colors.text.tertiary,
                    fontSize: typography.sizes.sm,
                    fontWeight: isLast ? '700' : '400',
                  }}
                >
                  {crumb.name}
                </Text>
              </TouchableOpacity>
              {!isLast && (
                <Text style={{ color: colors.text.tertiary, marginHorizontal: 6 }}>›</Text>
              )}
            </View>
          );
        })}
      </ScrollView>

      {scale && (
        <View style={styles.scaleHud}>
          <Text style={{ color: colors.cosmic.purple, fontSize: typography.sizes.xs, fontWeight: '700', letterSpacing: 1 }}>
            {scale.label.toUpperCase()}
          </Text>
          <Text style={{ color: colors.text.tertiary, fontSize: typography.sizes.xs }}>{scale.span}</Text>
        </View>
      )}


      <View style={[styles.viewport, { borderColor: colors.border, backgroundColor: colors.space.dark }]}>
        {isTransitioning ? (
          <View style={styles.center}>
            <ActivityIndicator color={colors.cosmic.cyan} />
            <Text style={{ color: colors.text.secondary, marginTop: 12 }}>Traveling…</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.viewportInner}>
            <Text style={[styles.focusName, { color: colors.text.primary, fontSize: typography.sizes.xl }]}>
              {node?.name}
            </Text>
            {children.length > 0 ? (
              <View style={styles.bodies}>
                {children.map((child) => (
                  <TouchableOpacity
                    key={child.id}
                    style={styles.bodyItem}
                    activeOpacity={0.8}
                    onPress={() => focusNode(child.id)}
                  >
                    <View style={[styles.bodyDot, { backgroundColor: colorFor(child.objectId) }]} />
                    <Text numberOfLines={1} style={{ color: colors.text.secondary, fontSize: typography.sizes.xs }}>
                      {child.name}
                    </Text>
                    {hasChildren(child.id) && (
                      <Text style={{ color: colors.text.tertiary, fontSize: typography.sizes.xs }}>⌖</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.center}>
                <View style={[styles.bodyDotLarge, { backgroundColor: object?.color ?? colors.cosmic.blue }]} />
                <Text style={{ color: colors.text.secondary, marginTop: 12 }}>
                  You have arrived at {node?.name}.
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>


      <View style={styles.controls}>
        <Ctl label="‹ Back" disabled={!canBack} onPress={back} colors={colors} typo={typography} />
        <Ctl label="Zoom Out" disabled={!canZoomOut} onPress={zoomOut} colors={colors} typo={typography} />
        <Ctl label="Forward ›" disabled={!canForward} onPress={forward} colors={colors} typo={typography} />
      </View>

      {object && (
        <TouchableOpacity
          style={[styles.detailBtn, { backgroundColor: colors.cosmic.cyan }]}
          onPress={() => navigation.navigate('ObjectDetail', { planetId: object.id })}
        >
          <Text style={{ color: colors.space.deep, fontSize: typography.sizes.md, fontWeight: '700' }}>
            Open {object.name} details
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const Ctl: React.FC<{
  label: string;
  disabled: boolean;
  onPress: () => void;
  colors: ReturnType<typeof useTheme>['colors'];
  typo: ReturnType<typeof useTheme>['typography'];
}> = ({ label, disabled, onPress, colors, typo }) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[
      styles.ctl,
      { borderColor: colors.border, backgroundColor: colors.glass.medium, opacity: disabled ? 0.4 : 1 },
    ]}
  >
    <Text style={{ color: colors.text.primary, fontSize: typo.sizes.sm, fontWeight: '600' }}>{label}</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  fill: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  heading: { fontWeight: '700' },
  breadcrumb: { paddingHorizontal: 20, alignItems: 'center', paddingBottom: 8 },
  crumbItem: { flexDirection: 'row', alignItems: 'center' },
  scaleHud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  viewport: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  viewportInner: { padding: 20, alignItems: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  focusName: { fontWeight: '700', marginBottom: 18, textAlign: 'center' },
  bodies: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 18 },
  bodyItem: { width: 76, alignItems: 'center', gap: 4 },
  bodyDot: { width: 48, height: 48, borderRadius: 24 },
  bodyDotLarge: { width: 96, height: 96, borderRadius: 48 },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  ctl: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  detailBtn: {
    marginHorizontal: 20,
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
});

export default ExploreScreen;
