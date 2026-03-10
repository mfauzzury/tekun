import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import FadeInView from '../components/FadeInView';
import AnimatedPressable from '../components/AnimatedPressable';

const menuSections = [
  {
    title: 'Akaun',
    items: [
      { icon: 'person-outline' as const, label: 'Maklumat Peribadi', color: '#007AFF' },
      { icon: 'card-outline' as const, label: 'Akaun Bank', color: '#34C759' },
      { icon: 'document-text-outline' as const, label: 'Dokumen Saya', color: '#FF9500' },
    ],
  },
  {
    title: 'Tetapan',
    items: [
      { icon: 'notifications-outline' as const, label: 'Notifikasi', color: '#FF3B30' },
      { icon: 'lock-closed-outline' as const, label: 'Keselamatan & Kata Laluan', color: '#5856D6' },
      { icon: 'language-outline' as const, label: 'Bahasa', color: '#007AFF' },
    ],
  },
  {
    title: 'Sokongan',
    items: [
      { icon: 'help-circle-outline' as const, label: 'Pusat Bantuan', color: '#34C759' },
      { icon: 'chatbubble-outline' as const, label: 'Hubungi Kami', color: '#FF9500' },
      { icon: 'star-outline' as const, label: 'Nilaikan Aplikasi', color: '#FFCC00' },
    ],
  },
];

export default function ProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <FadeInView delay={100} duration={500} direction="down" distance={20}>
          <View style={styles.header}>
            <AnimatedPressable style={styles.backBtn} scaleTo={0.9} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color={Colors.text} />
            </AnimatedPressable>
            <Text style={styles.headerTitle}>Profil</Text>
            <AnimatedPressable style={styles.settingsBtn} scaleTo={0.9}>
              <Ionicons name="settings-outline" size={22} color={Colors.text} />
            </AnimatedPressable>
          </View>
        </FadeInView>

        {/* Profile Card */}
        <FadeInView delay={200} duration={600} direction="up" distance={20}>
          <View style={styles.profileCard}>
            <Image source={require('../../assets/abang.jpeg')} style={styles.avatarLarge} />
            <Text style={styles.profileName}>Rose Ahmad</Text>
            <Text style={styles.profileEmail}>rose.ahmad@email.com</Text>
            <View style={styles.profileBadge}>
              <Ionicons name="shield-checkmark" size={14} color={Colors.accent} />
              <Text style={styles.profileBadgeText}>Akaun Disahkan</Text>
            </View>
          </View>
        </FadeInView>

        {/* Stats Row */}
        <FadeInView delay={300} duration={500} direction="up" distance={15}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Pembiayaan Aktif</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>RM 6,250</Text>
              <Text style={styles.statLabel}>Telah Dibayar</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>25%</Text>
              <Text style={styles.statLabel}>Selesai</Text>
            </View>
          </View>
        </FadeInView>

        {/* Menu Sections */}
        {menuSections.map((section, sIndex) => (
          <FadeInView key={section.title} delay={400 + sIndex * 100} duration={500} direction="up" distance={15}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, iIndex) => (
                <AnimatedPressable
                  key={item.label}
                  style={[
                    styles.menuRow,
                    iIndex < section.items.length - 1 && styles.menuRowBorder,
                  ]}
                  scaleTo={0.98}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                    <Ionicons name={item.icon} size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
                </AnimatedPressable>
              ))}
            </View>
          </FadeInView>
        ))}

        {/* Logout */}
        <FadeInView delay={700} duration={500} direction="up" distance={15}>
          <AnimatedPressable
            style={styles.logoutBtn}
            scaleTo={0.97}
            onPress={() => navigation.navigate('Login')}
          >
            <Ionicons name="log-out-outline" size={20} color={Colors.danger} />
            <Text style={styles.logoutText}>Log Keluar</Text>
          </AnimatedPressable>
        </FadeInView>

        <Text style={styles.version}>myTEKUN v1.0.0</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  avatarLarge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.pastelMint,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
    gap: 6,
  },
  profileBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.accent,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  menuCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.background,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 50,
    backgroundColor: Colors.pastelPink,
    gap: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.danger,
  },
  version: {
    textAlign: 'center',
    color: Colors.textLight,
    fontSize: 12,
    marginTop: 14,
    marginBottom: 8,
  },
});
