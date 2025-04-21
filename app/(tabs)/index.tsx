import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ClipboardPaste as PasteClipboard, Download as DownloadIcon, X, CircleAlert as AlertCircle } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from '@/context/ThemeContext';
import LinkValidator from '@/utils/LinkValidator';
import StickerPreview from '@/components/StickerPreview';

export default function HomeScreen() {
  const { colors } = useTheme();
  const [link, setLink] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<null | { 
    title: string;
    count: number;
    thumbnails: string[];
  }>(null);

  const handlePaste = async () => {
    try {
      let text = '';
      
      if (Platform.OS === 'web') {
        // Web-specific clipboard handling
        const clipboardText = await navigator.clipboard.readText().catch(() => '');
        text = clipboardText;
      } else {
        // Native platforms
        const hasPermission = await Clipboard.getPermissionsAsync();
        if (hasPermission.status === 'granted' || await Clipboard.requestPermissionsAsync().then(result => result.status === 'granted')) {
          text = await Clipboard.getStringAsync();
        }
      }
      
      if (text) {
        setLink(text);
        validateLink(text);
      }
    } catch (error) {
      console.error('Failed to paste text: ', error);
    }
  };

  const validateLink = (text: string) => {
    const valid = LinkValidator.isTelegramStickerLink(text);
    setIsValid(text ? valid : null);
    
    // Reset preview data when link changes
    if (previewData) {
      setPreviewData(null);
    }
  };

  const clearInput = () => {
    setLink('');
    setIsValid(null);
    setPreviewData(null);
  };

  const loadPreview = async () => {
    if (!isValid) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, this would fetch sticker pack data from Telegram API
      // For demo, we'll simulate a response after a delay
      setTimeout(() => {
        setPreviewData({
          title: 'Cute Cat Stickers',
          count: 24,
          thumbnails: [
            'https://www.pexels.com/photo/1170986/download/',
            'https://www.pexels.com/photo/1741205/download/',
            'https://www.pexels.com/photo/2061057/download/',
            'https://www.pexels.com/photo/1054666/download/'
          ]
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error loading preview:', error);
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      color: colors.text,
      marginBottom: 8,
      marginTop: 16,
    },
    subtitle: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.placeholder,
      marginBottom: 24,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isValid === false ? colors.error : isValid ? colors.success : colors.border,
      borderRadius: 12,
      backgroundColor: colors.card,
      padding: 4,
      marginBottom: 16,
    },
    input: {
      flex: 1,
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
      padding: 12,
    },
    button: {
      padding: 10,
      borderRadius: 8,
    },
    previewButton: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 24,
    },
    previewButtonText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: '#FFFFFF',
    },
    errorText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.error,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    },
    infoTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: colors.text,
      marginBottom: 8,
    },
    infoText: {
      fontFamily: 'Inter-Regular',
      fontSize: 15,
      color: colors.text,
      lineHeight: 22,
    },
    stepText: {
      fontFamily: 'Inter-Medium',
      fontSize: 15,
      color: colors.text,
      marginBottom: 12,
    },
    stepNumber: {
      fontFamily: 'Inter-SemiBold',
      color: colors.primary,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Telegram Sticker Downloader</Text>
        <Text style={styles.subtitle}>Enter a Telegram sticker pack link to download all stickers</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Paste Telegram sticker link here"
            placeholderTextColor={colors.placeholder}
            value={link}
            onChangeText={(text) => {
              setLink(text);
              validateLink(text);
            }}
          />
          {link ? (
            <TouchableOpacity style={styles.button} onPress={clearInput}>
              <X size={20} color={colors.placeholder} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handlePaste}>
              <PasteClipboard size={20} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        {isValid === false && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.errorText}>
            <AlertCircle size={16} color={colors.error} style={{ marginRight: 6 }} />
            <Text style={{ color: colors.error }}>Invalid Telegram sticker pack link</Text>
          </Animated.View>
        )}

        {isValid && !previewData && (
          <TouchableOpacity 
            style={styles.previewButton} 
            onPress={loadPreview}
            disabled={isLoading}
          >
            <Text style={styles.previewButtonText}>
              {isLoading ? 'Loading...' : 'Preview Stickers'}
            </Text>
          </TouchableOpacity>
        )}

        {previewData && (
          <StickerPreview
            title={previewData.title}
            count={previewData.count}
            thumbnails={previewData.thumbnails}
            onDownload={() => {
              // In a real app, this would trigger the download process
              console.log('Download stickers');
            }}
          />
        )}

        {!previewData && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>How to download stickers</Text>
            <Text style={styles.stepText}><Text style={styles.stepNumber}>1.</Text> Find a sticker pack in Telegram</Text>
            <Text style={styles.stepText}><Text style={styles.stepNumber}>2.</Text> Copy the sticker pack link</Text>
            <Text style={styles.stepText}><Text style={styles.stepNumber}>3.</Text> Paste the link above</Text>
            <Text style={styles.stepText}><Text style={styles.stepNumber}>4.</Text> Preview and download the stickers</Text>
            <Text style={styles.infoText}>
              All stickers will be downloaded and saved to your device. You can find them in the Downloads tab.
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}