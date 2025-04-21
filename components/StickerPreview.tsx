import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Download as DownloadIcon, Share2 } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

interface StickerPreviewProps {
  title: string;
  count: number;
  thumbnails: string[];
  onDownload: () => void;
}

export default function StickerPreview({ title, count, thumbnails, onDownload }: StickerPreviewProps) {
  const { colors } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: colors.text,
    },
    count: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.placeholder,
    },
    thumbnailsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    thumbnailWrapper: {
      width: '48%',
      aspectRatio: 1,
      marginBottom: 12,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.background,
    },
    thumbnail: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    downloadButton: {
      backgroundColor: colors.download,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 8,
    },
    downloadButtonText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: '#FFFFFF',
      marginLeft: 8,
    },
    shareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
    },
    shareText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.primary,
      marginLeft: 6,
    },
    optionsContainer: {
      marginTop: 16,
      padding: 12,
      backgroundColor: colors.highlight,
      borderRadius: 12,
    },
    optionTitle: {
      fontFamily: 'Inter-Medium',
      fontSize: 15,
      color: colors.text,
      marginBottom: 12,
    },
    optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    optionButton: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 8,
      marginHorizontal: 4,
    },
    optionText: {
      fontFamily: 'Inter-Regular',
      fontSize: 13,
      color: colors.text,
      marginTop: 4,
    },
  });

  return (
    <Animated.View style={styles.container} entering={FadeIn}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.count}>{count} stickers</Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Share2 size={18} color={colors.primary} />
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal contentContainerStyle={styles.thumbnailsContainer}>
        {thumbnails.map((url, index) => (
          <Animated.View 
            key={index} 
            style={styles.thumbnailWrapper}
            entering={FadeInDown.delay(100 * index)}
          >
            <Image source={{ uri: url }} style={styles.thumbnail} />
          </Animated.View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.downloadButton} onPress={onDownload}>
        <DownloadIcon size={20} color="#FFFFFF" />
        <Text style={styles.downloadButtonText}>Download All Stickers</Text>
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        <Text style={styles.optionTitle}>Download Options</Text>
        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>.webp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>.gif</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Custom Name</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}