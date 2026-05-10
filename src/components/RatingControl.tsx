import { Pressable, StyleSheet, View } from 'react-native';
import { Star } from 'lucide-react-native';

import { colors, spacing } from '@/theme';

export const RatingControl = ({
  value,
  onChange,
  disabled = false,
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) => (
  <View style={styles.row}>
    {[1, 2, 3, 4, 5].map((rating) => {
      const active = rating <= value;
      return (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Rate ${rating}`}
          key={rating}
          disabled={disabled}
          onPress={() => onChange(rating)}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <Star color={colors.warning} fill={active ? colors.warning : 'transparent'} size={28} />
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  pressed: {
    opacity: 0.7,
  },
});
