import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search, Filter, Folder, Share2, Trash2 } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeIn } from 'react-native-reanimated';

// Mock data for downloads
const MOCK_DOWNLOADS = [
  {
    id: '1',
    title: 'Cute Cat Stickers',
    count: 24,
    date: '2023-10-15',
    thumbnail: 'https://www.pexels.com/photo/1170986/download/',
    size: '3.2 MB'
  },
  {
    id: '2',
    title: 'Funny Dogs Pack',
    count: 18,
    date: '2023-10-10',
    thumbnail: 'https://www.pexels.com/photo/1741205/download/',
    size: '2.8 MB'
  },
  {
    id: '3',
    title: 'Emoji Collection',
    count: 32,
    date: '2023-10-05',
    thumbnail: 'https://www.pexels.com/photo/2061057/download/',
    size: '4.5 MB'
  }
];

interface DownloadItemProps {
  item: typeof MOCK_DOWNLOADS[0];
  onPress: () => void;
}

const DownloadItem = ({ item, onPress }: DownloadItemProps) => {
  const { colors } = useTheme();
  
  const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 16,
      padding: 16,
      flexDirection: 'row',
    },
    thumbnail: {
      width: 64,
      height: 64,
      borderRadius: 8,
      marginRight: 16,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    date: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.placeholder,
    },
    detailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailText: {
      fontFamily: 'Inter-Regular',
      fontSize: 13,
      color: colors.placeholder,
      marginRight: 16,
    },
    actionsContainer: {
      flexDirection: 'row',
    },
    actionButton: {
      padding: 6,
      marginLeft: 8,
    },
  });

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>{item.count} stickers • {item.size}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Folder size={18} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={18} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Trash2 size={18} color={colors.error} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function DownloadsScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
      paddingVertical: 12,
      paddingHorizontal: 8,
    },
    filterButton: {
      padding: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 32,
    },
    emptyText: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: colors.placeholder,
      textAlign: 'center',
      marginTop: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      marginRight: 8,
      alignItems: 'center',
    },
    statValue: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.placeholder,
    },
  });

  const filteredDownloads = MOCK_DOWNLOADS.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: typeof MOCK_DOWNLOADS[0] }) => (
    <DownloadItem
      item={item}
      onPress={() => console.log('Open download:', item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.placeholder} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search downloads"
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Animated.View entering={FadeIn} style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{MOCK_DOWNLOADS.length}</Text>
          <Text style={styles.statLabel}>Packs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {MOCK_DOWNLOADS.reduce((sum, item) => sum + item.count, 0)}
          </Text>
          <Text style={styles.statLabel}>Stickers</Text>
        </View>
        <View style={[styles.statCard, { marginRight: 0 }]}>
          <Text style={styles.statValue}>
            {MOCK_DOWNLOADS.reduce((sum, item) => {
              const size = parseFloat(item.size.split(' ')[0]);
              return sum + size;
            }, 0).toFixed(1)} MB
          </Text>
          <Text style={styles.statLabel}>Total Size</Text>
        </View>
      </Animated.View>

      {filteredDownloads.length > 0 ? (
        <FlatList
          data={filteredDownloads}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Folder size={64} color={colors.placeholder} />
          <Text style={styles.emptyText}>
            {searchQuery 
              ? 'No downloads match your search'
              : 'No sticker packs downloaded yet'}
          </Text>
        </View>
      )}
    </View>
  );
}