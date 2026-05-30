import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { getPlanetById } from '../data/planets';
import { generateAnswer, Difficulty } from '../services/aiGuide';
import { NavProp, Route } from '../types/navigation';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

const DIFFICULTIES: Difficulty[] = ['beginner', 'student', 'expert'];

const AIGuideScreen: React.FC = () => {
  const navigation = useNavigation<NavProp<'AIGuide'>>();
  const route = useRoute<Route<'AIGuide'>>();
  const { colors, typography } = useTheme();

  const planet = route.params?.planetId ? getPlanetById(route.params.planetId) : undefined;

  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'intro',
      role: 'ai',
      text: planet
        ? `Hi! Ask me anything about ${planet.name}.`
        : 'Hi! I am your AstroVerse guide. Ask me about any planet.',
    },
  ]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const answer = generateAnswer(text, difficulty, planet);
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text },
      { id: `a-${Date.now()}`, role: 'ai', text: answer },
    ]);
    setInput('');
  };


  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.space.deep }]}>
      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.text.secondary, fontSize: typography.sizes.md }}>✕ Close</Text>
          </TouchableOpacity>
          <Text style={{ color: colors.text.primary, fontSize: typography.sizes.lg, fontWeight: '700' }}>
            AI Guide
          </Text>
          <View style={{ width: 56 }} />
        </View>

        <View style={styles.modes}>
          {DIFFICULTIES.map((d) => (
            <TouchableOpacity
              key={d}
              onPress={() => setDifficulty(d)}
              style={[
                styles.mode,
                {
                  backgroundColor: difficulty === d ? colors.cosmic.purple : colors.glass.medium,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={{ color: colors.text.primary, fontSize: typography.sizes.xs, textTransform: 'capitalize' }}>
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.fill} contentContainerStyle={styles.messages}>
          {messages.map((m) => (
            <View
              key={m.id}
              style={[
                styles.bubble,
                m.role === 'user'
                  ? { alignSelf: 'flex-end', backgroundColor: colors.cosmic.cyan }
                  : { alignSelf: 'flex-start', backgroundColor: colors.glass.medium, borderColor: colors.border, borderWidth: 1 },
              ]}
            >
              <Text
                style={{
                  color: m.role === 'user' ? colors.space.deep : colors.text.primary,
                  fontSize: typography.sizes.sm,
                }}
              >
                {m.text}
              </Text>
            </View>
          ))}
        </ScrollView>


        <View style={[styles.inputRow, { borderTopColor: colors.border }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask a question..."
            placeholderTextColor={colors.text.tertiary}
            style={[
              styles.input,
              { color: colors.text.primary, backgroundColor: colors.glass.medium, borderColor: colors.border },
            ]}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={send}
            style={[styles.send, { backgroundColor: colors.cosmic.cyan }]}
          >
            <Text style={{ color: colors.space.deep, fontWeight: '700' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  modes: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, paddingBottom: 8 },
  mode: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1 },
  messages: { padding: 20, gap: 10 },
  bubble: { maxWidth: '85%', padding: 12, borderRadius: 16, marginBottom: 4 },
  inputRow: { flexDirection: 'row', gap: 10, padding: 16, borderTopWidth: 1, alignItems: 'center' },
  input: { flex: 1, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  send: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 14 },
});

export default AIGuideScreen;
