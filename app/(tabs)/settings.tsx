import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView, Linking } from 'react-native';
import { ChevronRight, Moon, Sun, Smartphone, FolderOpen, CircleHelp as HelpCircle, Info, RefreshCw, Github as BrandGithub, Youtube as BrandYoutube, Instagram as BrandInstagram, GitBranch as BrandTelegram } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function SettingsScreen() {
  const { colors, theme, setTheme, isDark } = useTheme();
  const [autoConvert, setAutoConvert] = useState(true);
  const [saveOriginal, setSaveOriginal] = useState(false);
  const [defaultFormat, setDefaultFormat] = useState('webp');
  
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    section: {
      marginVertical: 16,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.primary,
      marginBottom: 12,
      marginLeft: 4,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 8,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    noBorder: {
      borderBottomWidth: 0,
    },
    settingLabel: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    themeText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.placeholder,
      marginRight: 12,
    },
    rowWithIcon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 12,
    },
    themeOptions: {
      flexDirection: 'row',
      borderRadius: 8,
      backgroundColor: colors.background,
      padding: 4,
      marginVertical: 8,
    },
    themeOption: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      alignItems: 'center',
      borderRadius: 6,
    },
    themeOptionActive: {
      backgroundColor: colors.primary,
    },
    themeOptionText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
    },
    themeOptionTextActive: {
      color: 'white',
    },
    versionText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.placeholder,
      textAlign: 'center',
      marginTop: 24,
    },
    creditsText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.text,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 24,
    },
    socialLinks: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginTop: 16,
      marginBottom: 24,
    },
    socialButton: {
      padding: 8,
    },
    formatOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      marginBottom: 8,
    },
    formatOption: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.border,
    },
    formatOptionActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    formatText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.text,
    },
    formatTextActive: {
      color: 'white',
    },
  });

  const ThemeOption = ({ value, current, icon, label }: { 
    value: 'light' | 'dark' | 'system', 
    current: string, 
    icon: JSX.Element, 
    label: string 
  }) => (
    <TouchableOpacity
      style={[
        styles.themeOption,
        value === current && styles.themeOptionActive
      ]}
      onPress={() => setTheme(value)}
    >
      {icon}
      <Text 
        style={[
          styles.themeOptionText, 
          { color: value === current ? 'white' : colors.text }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <Animated.View style={styles.card} entering={FadeIn}>
          <View style={styles.settingRow}>
            <View style={styles.rowWithIcon}>
              <Moon size={20} color={colors.text} style={styles.icon} />
              <Text style={styles.settingLabel}>Theme</Text>
            </View>
          </View>

          <View style={[styles.settingRow, styles.noBorder]}>
            <View style={styles.themeOptions}>
              <ThemeOption 
                value="light" 
                current={theme} 
                icon={<Sun size={16} color={theme === 'light' ? 'white' : colors.text} />} 
                label="Light" 
              />
              <ThemeOption 
                value="dark" 
                current={theme} 
                icon={<Moon size={16} color={theme === 'dark' ? 'white' : colors.text} />} 
                label="Dark" 
              />
              <ThemeOption 
                value="system" 
                current={theme} 
                icon={<Smartphone size={16} color={theme === 'system' ? 'white' : colors.text} />} 
                label="System" 
              />
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sticker Settings</Text>
        <Animated.View style={styles.card} entering={FadeIn.delay(100)}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Auto-convert to GIF/WEBP</Text>
            <Switch
              value={autoConvert}
              onValueChange={setAutoConvert}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={autoConvert ? '#fff' : '#f4f3f4'}
              ios_backgroundColor={colors.border}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Save original files</Text>
            <Switch
              value={saveOriginal}
              onValueChange={setSaveOriginal}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={saveOriginal ? '#fff' : '#f4f3f4'}
              ios_backgroundColor={colors.border}
            />
          </View>

          <View style={[styles.settingRow, styles.noBorder]}>
            <Text style={styles.settingLabel}>Default format</Text>
            <View style={styles.formatOptions}>
              <TouchableOpacity
                style={[
                  styles.formatOption,
                  defaultFormat === 'webp' && styles.formatOptionActive
                ]}
                onPress={() => setDefaultFormat('webp')}
              >
                <Text 
                  style={[
                    styles.formatText, 
                    defaultFormat === 'webp' && styles.formatTextActive
                  ]}
                >
                  WEBP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.formatOption,
                  { marginHorizontal: 8 },
                  defaultFormat === 'gif' && styles.formatOptionActive
                ]}
                onPress={() => setDefaultFormat('gif')}
              >
                <Text 
                  style={[
                    styles.formatText, 
                    defaultFormat === 'gif' && styles.formatTextActive
                  ]}
                >
                  GIF
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.formatOption,
                  defaultFormat === 'png' && styles.formatOptionActive
                ]}
                onPress={() => setDefaultFormat('png')}
              >
                <Text 
                  style={[
                    styles.formatText, 
                    defaultFormat === 'png' && styles.formatTextActive
                  ]}
                >
                  PNG
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>
        <Animated.View style={styles.card} entering={FadeIn.delay(200)}>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.rowWithIcon}>
              <FolderOpen size={20} color={colors.text} style={styles.icon} />
              <Text style={styles.settingLabel}>Storage location</Text>
            </View>
            <ChevronRight size={20} color={colors.placeholder} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingRow, styles.noBorder]}>
            <View style={styles.rowWithIcon}>
              <RefreshCw size={20} color={colors.text} style={styles.icon} />
              <Text style={styles.settingLabel}>Clear cache</Text>
            </View>
            <ChevronRight size={20} color={colors.placeholder} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Animated.View style={styles.card} entering={FadeIn.delay(300)}>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.rowWithIcon}>
              <HelpCircle size={20} color={colors.text} style={styles.icon} />
              <Text style={styles.settingLabel}>Help</Text>
            </View>
            <ChevronRight size={20} color={colors.placeholder} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingRow, styles.noBorder]}>
            <View style={styles.rowWithIcon}>
              <Info size={20} color={colors.text} style={styles.icon} />
              <Text style={styles.settingLabel}>About</Text>
            </View>
            <ChevronRight size={20} color={colors.placeholder} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Text style={styles.versionText}>Version 1.0.0</Text>
      <Text style={styles.creditsText}>Created with ❤️ by °🌴༯𝙎ค૯𝙀𝘿</Text>
      
      <View style={styles.socialLinks}>
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={() => openLink('https://t.me/saeedxdie')}
        >
          <BrandTelegram size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={() => openLink('https://www.youtube.com/@TsunMusicOfficial?sub_confirmation=1')}
        >
          <BrandYoutube size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={() => openLink('https://www.instagram.com/saeedxdie')}
        >
          <BrandInstagram size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={() => openLink('https://github.com/Saeedx302')}
        >
          <BrandGithub size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}