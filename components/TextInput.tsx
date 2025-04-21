import React from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface TextInputProps extends RNTextInputProps {
  error?: boolean;
}

const TextInput = React.forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const { colors } = useTheme();
  const { error, style, ...restProps } = props;
  
  const styles = StyleSheet.create({
    input: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
      padding: 12,
    },
  });
  
  return (
    <RNTextInput
      ref={ref}
      style={[
        styles.input,
        style,
        error && { borderColor: colors.error },
      ]}
      placeholderTextColor={colors.placeholder}
      {...restProps}
    />
  );
});

export default TextInput;