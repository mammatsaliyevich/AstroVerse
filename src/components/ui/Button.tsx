import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  fullWidth = false,
  style,
}) => {
  const { colors, typography } = useTheme();

  const background =
    variant === 'primary'
      ? colors.cosmic.cyan
      : variant === 'secondary'
      ? colors.cosmic.purple
      : 'transparent';

  const textColor =
    variant === 'outline' ? colors.text.primary : colors.space.deep;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: background },
        variant === 'outline' && {
          borderWidth: 1,
          borderColor: colors.border,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: textColor, fontSize: typography.sizes.md, fontWeight: typography.weights.semibold },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { width: '100%' },
  label: { letterSpacing: 0.3 },
});

export default Button;
