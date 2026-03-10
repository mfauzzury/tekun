import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import FadeInView from '../components/FadeInView';
import AnimatedPressable from '../components/AnimatedPressable';

const { width } = Dimensions.get('window');

const filters = ['Semua', 'Masuk', 'Keluar'];
const periods = ['Minggu Ini', 'Bulan Ini', '3 Bulan', '6 Bulan'];

const transactions = [
  {
    id: '1',
    title: 'Bayaran Ansuran',
    subtitle: 'Skim Tekun Niaga',
    amount: '- RM 500.20',
    date: '8 Mac 2026',
    icon: 'arrow-up-outline' as const,
    color: '#FF3B30',
    type: 'out',
  },
  {
    id: '2',
    title: 'Pengeluaran Dana',
    subtitle: 'Skim Teman Tekun',
    amount: '+ RM 10,000.00',
    date: '5 Mac 2026',
    icon: 'arrow-down-outline' as const,
    color: '#34C759',
    type: 'in',
  },
  {
    id: '3',
    title: 'Bayaran Ansuran',
    subtitle: 'Skim Teman Tekun',
    amount: '- RM 850.25',
    date: '1 Mac 2026',
    icon: 'arrow-up-outline' as const,
    color: '#FF3B30',
    type: 'out',
  },
  {
    id: '4',
    title: 'Bayaran Ansuran',
    subtitle: 'Skim Tekun Niaga',
    amount: '- RM 500.20',
    date: '8 Feb 2026',
    icon: 'arrow-up-outline' as const,
    color: '#FF3B30',
    type: 'out',
  },
  {
    id: '5',
    title: 'Bantuan Khas TEKUN',
    subtitle: 'Geran Usahawan',
    amount: '+ RM 2,000.00',
    date: '1 Feb 2026',
    icon: 'arrow-down-outline' as const,
    color: '#34C759',
    type: 'in',
  },
  {
    id: '6',
    title: 'Bayaran Ansuran',
    subtitle: 'Skim Tekun Niaga',
    amount: '- RM 500.20',
    date: '8 Jan 2026',
    icon: 'arrow-up-outline' as const,
    color: '#FF3B30',
    type: 'out',
  },
];

const summaryData = [
  { label: 'Masuk', value: 'RM 12,000', color: Colors.accent, bg: Colors.pastelMint, icon: 'arrow-down-outline' as const },
  { label: 'Keluar', value: 'RM 2,350', color: '#FF3B30', bg: Colors.pastelPink, icon: 'arrow-up-outline' as const },
  { label: 'Bersih', value: 'RM 9,650', color: Colors.text, bg: Colors.pastelCyan, icon: 'wallet-outline' as const },
];

export default function RepaymentScreen() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [activePeriod, setActivePeriod] = useState(1);

  const filtered = activeFilter === 0
    ? transactions
    : transactions.filter(t => (activeFilter === 1 ? t.type === 'in' : t.type === 'out'));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable style={styles.backBtn} scaleTo={0.9}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>Transaksi</Text>
        <AnimatedPressable style={styles.bellBtn} scaleTo={0.9}>
          <Ionicons name="notifications-outline" size={22} color={Colors.text} />
        </AnimatedPressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Summary Cards */}
        <FadeInView delay={100} duration={600} direction="up" distance={20}>
          <View style={styles.summaryRow}>
            {summaryData.map((item, i) => (
              <View key={i} style={[styles.summaryCard, { backgroundColor: item.bg }]}>
                <View style={[styles.summaryIconWrap, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon} size={18} color={item.color} />
                </View>
                <Text style={[styles.summaryValue, { color: item.color }]}>{item.value}</Text>
                <Text style={styles.summaryLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </FadeInView>

        {/* Filters */}
        <FadeInView delay={200} duration={500} direction="up" distance={15}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChipsRow}>
            {filters.map((f, i) => (
              <AnimatedPressable
                key={f}
                style={[styles.filterChip, activeFilter === i && styles.filterChipActive]}
                scaleTo={0.9}
                onPress={() => setActiveFilter(i)}
              >
                <Text style={[styles.filterChipText, activeFilter === i && styles.filterChipTextActive]}>{f}</Text>
              </AnimatedPressable>
            ))}
            <View style={styles.filterDivider} />
            {periods.map((p, i) => (
              <AnimatedPressable
                key={p}
                style={[styles.filterChip, activePeriod === i && styles.filterChipActive]}
                scaleTo={0.9}
                onPress={() => setActivePeriod(i)}
              >
                <Text style={[styles.filterChipText, activePeriod === i && styles.filterChipTextActive]}>{p}</Text>
              </AnimatedPressable>
            ))}
          </ScrollView>
        </FadeInView>

        {/* Transaction List */}
        <FadeInView delay={300} duration={500} direction="up" distance={15}>
          <Text style={styles.sectionTitle}>Sejarah Transaksi</Text>

          {filtered.map((tx, i) => (
            <AnimatedPressable key={tx.id} style={styles.txRow} scaleTo={0.98}>
              <View style={[styles.txIcon, { backgroundColor: tx.color + '12' }]}>
                <Ionicons name={tx.icon} size={20} color={tx.color} />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txTitle}>{tx.title}</Text>
                <Text style={styles.txSubtitle}>{tx.subtitle}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={[styles.txAmount, { color: tx.type === 'in' ? Colors.accent : Colors.text }]}>{tx.amount}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
            </AnimatedPressable>
          ))}

          {filtered.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={40} color={Colors.textLight} />
              <Text style={styles.emptyText}>Tiada transaksi</Text>
            </View>
          )}
        </FadeInView>

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
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    paddingTop: 8,
  },

  // Summary
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  summaryIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.textSecondary,
  },

  // Filters
  filterChipsRow: {
    gap: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: Colors.background,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  filterDivider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },

  // Section
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 14,
  },

  // Transactions
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  txIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  txSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  txRight: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  txDate: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '500',
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
});
