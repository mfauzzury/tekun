import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import FadeInView from '../components/FadeInView';
import AnimatedPressable from '../components/AnimatedPressable';

const { width } = Dimensions.get('window');

const stats = [
  { value: '12', label: 'Tersedia', icon: 'book-outline' as const, color: '#007AFF', bg: '#E3F2FD' },
  { value: '3', label: 'Didaftar', icon: 'checkmark-circle-outline' as const, color: Colors.accent, bg: Colors.pastelMint },
  { value: '1', label: 'Sijil', icon: 'ribbon-outline' as const, color: '#FF9500', bg: '#FFF3E0' },
];

const categories = [
  { label: 'Semua', icon: 'grid-outline' as const },
  { label: 'Pemasaran', icon: 'megaphone-outline' as const },
  { label: 'Kewangan', icon: 'calculator-outline' as const },
  { label: 'E-Dagang', icon: 'cart-outline' as const },
  { label: 'Digital', icon: 'phone-portrait-outline' as const },
];

const trainings = [
  {
    title: 'Asas Pemasaran Digital (SEO & FB Ads)',
    date: '15 Mac 2026',
    time: '9:00 Pagi',
    location: 'TEKUN Hub, Kuala Lumpur',
    seats: 'Baki 5',
    category: 'Pemasaran',
    categoryColor: '#007AFF',
    mode: 'Bersemuka',
    duration: '3 jam',
    featured: true,
  },
  {
    title: 'Pengurusan Kewangan Pintar untuk Usahawan',
    date: '20 Mac 2026',
    time: '10:00 Pagi',
    location: 'Dalam Talian (Zoom)',
    seats: 'Baki 20',
    category: 'Kewangan',
    categoryColor: '#FF9500',
    mode: 'Dalam Talian',
    duration: '2 jam',
  },
  {
    title: 'Bina Kedai E-Dagang (TikTok Shop)',
    date: '28 Mac 2026',
    time: '8:30 Pagi',
    location: 'Dewan Perdana, Shah Alam',
    seats: 'Penuh',
    category: 'E-Dagang',
    categoryColor: '#FF3B30',
    mode: 'Bersemuka',
    duration: '4 jam',
  },
  {
    title: 'Strategi Pemasaran Media Sosial 2026',
    date: '2 Apr 2026',
    time: '9:30 Pagi',
    location: 'Dalam Talian (Google Meet)',
    seats: 'Baki 15',
    category: 'Pemasaran',
    categoryColor: '#007AFF',
    mode: 'Dalam Talian',
    duration: '2.5 jam',
  },
  {
    title: 'Asas Perakaunan & Cukai untuk PKS',
    date: '5 Apr 2026',
    time: '10:00 Pagi',
    location: 'TEKUN Hub, Johor Bahru',
    seats: 'Baki 8',
    category: 'Kewangan',
    categoryColor: '#FF9500',
    mode: 'Bersemuka',
    duration: '3 jam',
  },
  {
    title: 'Reka Bentuk Grafik dengan Canva',
    date: '15 Apr 2026',
    time: '9:00 Pagi',
    location: 'TEKUN Hub, Kuala Lumpur',
    seats: 'Baki 12',
    category: 'Digital',
    categoryColor: '#5856D6',
    mode: 'Bersemuka',
    duration: '3 jam',
  },
];

export default function TrainingScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState('');

  const filtered = (activeCategory === 0
    ? trainings
    : trainings.filter(t => t.category === categories[activeCategory].label)
  ).filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable style={styles.backBtn} scaleTo={0.9} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>Latihan Usahawan</Text>
        <AnimatedPressable style={styles.bellBtn} scaleTo={0.9}>
          <Ionicons name="notifications-outline" size={22} color={Colors.text} />
        </AnimatedPressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Stats Row */}
        <FadeInView delay={100} duration={500} direction="up" distance={15}>
          <View style={styles.statsRow}>
            {stats.map((s, i) => (
              <View key={i} style={[styles.statCard, { backgroundColor: s.bg }]}>
                <View style={[styles.statIconWrap, { backgroundColor: s.bg }]}>
                  <Ionicons name={s.icon} size={18} color={s.color} />
                </View>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </FadeInView>

        {/* Category Filters */}
        <FadeInView delay={200} duration={500} direction="up" distance={15}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
            {categories.map((cat, i) => (
              <AnimatedPressable
                key={cat.label}
                style={[styles.categoryChip, activeCategory === i && styles.categoryChipActive]}
                scaleTo={0.9}
                onPress={() => setActiveCategory(i)}
              >
                <Ionicons
                  name={cat.icon}
                  size={15}
                  color={activeCategory === i ? Colors.white : Colors.textSecondary}
                />
                <Text style={[styles.categoryChipText, activeCategory === i && styles.categoryChipTextActive]}>
                  {cat.label}
                </Text>
              </AnimatedPressable>
            ))}
          </ScrollView>
        </FadeInView>

        {/* Search */}
        <FadeInView delay={250} duration={500} direction="up" distance={15}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={18} color={Colors.textLight} />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Cari latihan..."
              placeholderTextColor={Colors.textLight}
            />
          </View>
        </FadeInView>

        {/* Section Title */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Latihan Akan Datang</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{filtered.length}</Text>
          </View>
        </View>

        {/* Training List */}
        {filtered.map((t, i) => (
          <FadeInView key={i} delay={300 + i * 80} duration={500} direction="up" distance={15}>
            <AnimatedPressable style={[styles.trainingCard, t.featured && styles.trainingCardFeatured]} scaleTo={0.98}>
              {t.featured && (
                <View style={styles.featuredBadge}>
                  <Ionicons name="star" size={10} color="#FF9500" />
                  <Text style={styles.featuredBadgeText}>Disyorkan</Text>
                </View>
              )}
              <Text style={styles.trainingTitle} numberOfLines={2}>{t.title}</Text>
              <View style={styles.trainingMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar-outline" size={11} color={Colors.textLight} />
                  <Text style={styles.metaText}>{t.date}</Text>
                </View>
                <View style={styles.metaDot} />
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={11} color={Colors.textLight} />
                  <Text style={styles.metaText}>{t.duration}</Text>
                </View>
                <View style={styles.metaDot} />
                <View style={styles.metaItem}>
                  <Ionicons
                    name={t.mode === 'Dalam Talian' ? 'videocam-outline' : 'location-outline'}
                    size={11}
                    color={Colors.textLight}
                  />
                  <Text style={styles.metaText}>{t.mode}</Text>
                </View>
              </View>
              <View style={styles.trainingFooter}>
                <Text style={[styles.seatsText, t.seats === 'Penuh' && styles.seatsFull]}>{t.seats}</Text>
                <AnimatedPressable style={[styles.daftarBtn, t.seats === 'Penuh' && styles.daftarBtnFull]} scaleTo={0.9}>
                  <Text style={styles.daftarBtnText}>{t.seats === 'Penuh' ? 'Penuh' : 'Daftar'}</Text>
                </AnimatedPressable>
              </View>
            </AnimatedPressable>
          </FadeInView>
        ))}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="school-outline" size={40} color={Colors.textLight} />
            <Text style={styles.emptyText}>Tiada latihan dalam kategori ini</Text>
          </View>
        )}

        {/* Completed Section */}
        <FadeInView delay={600} duration={500} direction="up" distance={15}>
          <View style={styles.completedCard}>
            <View style={styles.completedIcon}>
              <Ionicons name="ribbon" size={24} color="#FF9500" />
            </View>
            <View style={styles.completedInfo}>
              <Text style={styles.completedTitle}>1 Latihan Selesai</Text>
              <Text style={styles.completedSub}>Teruskan belajar untuk peroleh sijil!</Text>
            </View>
            <AnimatedPressable style={styles.completedBtn} scaleTo={0.9}>
              <Text style={styles.completedBtnText}>Lihat Sijil</Text>
            </AnimatedPressable>
          </View>
        </FadeInView>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBtn: {
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 120,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },

  // Categories
  categoriesRow: {
    gap: 8,
    marginBottom: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },

  // Section
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  countBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    padding: 0,
  },

  // Training Card
  trainingCard: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  trainingCardFeatured: {
    borderColor: '#FF9500',
    backgroundColor: '#FFF9F0',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
    marginBottom: 8,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FF9500',
  },
  trainingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 19,
    marginBottom: 6,
  },
  trainingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textLight,
  },
  metaText: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '500',
  },
  trainingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seatsText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.accent,
  },
  seatsFull: {
    color: '#FF3B30',
  },
  daftarBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
  },
  daftarBtnText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  daftarBtnFull: {
    backgroundColor: Colors.textLight,
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textLight,
  },

  // Completed
  completedCard: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  completedIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  completedInfo: {
    flex: 1,
    marginRight: 10,
  },
  completedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  completedSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  completedBtn: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
  },
  completedBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
