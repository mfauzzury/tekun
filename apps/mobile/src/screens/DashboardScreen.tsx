import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import FadeInView from '../components/FadeInView';
import AnimatedPressable from '../components/AnimatedPressable';

const { width } = Dimensions.get('window');

const applicationStatus = {
  id: 'TK-2026-0891',
  scheme: 'Skim Tekun Niaga',
  amount: 'RM 25,000',
  status: 'Dalam Proses',
  statusColor: '#FF9500',
  step: 3,
  totalSteps: 5,
  currentStep: 'Sesi Temuduga',
  date: '8 Mac 2026',
};

const services = [
  { icon: 'cash-outline' as const, label: 'Mohon\nPembiayaan', color: '#007AFF', bg: '#E3F2FD' },
  { icon: 'card-outline' as const, label: 'Bayar\nAnsuran', color: '#34C759', bg: '#E8F5E9' },
  { icon: 'document-text-outline' as const, label: 'Status\nPermohonan', color: '#FF9500', bg: '#FFF3E0' },
  { icon: 'school-outline' as const, label: 'Latihan\nUsahawan', color: '#5856D6', bg: '#F0EEFF' },
  { icon: 'bar-chart-outline' as const, label: 'Laporan\nKewangan', color: '#FF3B30', bg: '#FFF0F3' },
  { icon: 'people-outline' as const, label: 'Program\nMentor', color: '#00BCD4', bg: '#E0F7FA' },
  { icon: 'storefront-outline' as const, label: 'Direktori\nUsahawan', color: '#FF6B6B', bg: '#FFE8E8' },
  { icon: 'help-circle-outline' as const, label: 'Pusat\nBantuan', color: '#8E8E93', bg: '#F2F2F7' },
];

const recentLoans = [
  {
    id: '01',
    type: 'Skim Tekun Niaga',
    label: 'Pembiayaan Niaga',
    amount: 'RM 50,500.30',
    color: Colors.pastelCyan,
    icon: 'storefront-outline' as const,
  },
  {
    id: '02',
    type: 'Skim Teman Tekun',
    label: 'Modal Usahawan',
    amount: 'RM 10,343.52',
    color: Colors.pastelLavender,
    icon: 'briefcase-outline' as const,
  },
];

export default function DashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <FadeInView delay={100} duration={600} direction="down" distance={20}>
          <View style={styles.header}>
            <Image source={require('../../assets/abang.jpeg')} style={styles.avatar} />
            <View style={styles.headerText}>
              <Text style={styles.heroTitle}>Selamat Kembali!</Text>
              <Text style={styles.heroSubtitle}>Apa yang boleh kami bantu hari ini?</Text>
            </View>
            <AnimatedPressable style={styles.notiBtn} scaleTo={0.9}>
              <Ionicons name="notifications-outline" size={22} color={Colors.text} />
              <View style={styles.notiBadge} />
            </AnimatedPressable>
          </View>
        </FadeInView>

        {/* Payment Due Banner */}
        <FadeInView delay={220} duration={500} direction="up" distance={15}>
          <View style={styles.paymentDueBanner}>
            <Text style={styles.paymentDueTopLabel}>Bayaran Perlu Dibuat</Text>
            <Text style={styles.paymentDueHeroAmount}>RM 1,245.30</Text>
            <Text style={styles.paymentDueDate}>Sebelum 15 Mac 2026</Text>
            <View style={styles.paymentDueDivider} />
            <View style={styles.paymentDueBottomRow}>
              <View>
                <Text style={styles.paymentDueSubLabel}>Baki Pinjaman</Text>
                <Text style={styles.paymentDueSubAmount}>RM 60,843.82</Text>
              </View>
              <AnimatedPressable style={styles.paymentDueBtn} scaleTo={0.92}>
                <Text style={styles.paymentDueBtnText}>Bayar</Text>
                <Ionicons name="arrow-forward" size={16} color={Colors.white} />
              </AnimatedPressable>
            </View>
          </View>
        </FadeInView>

        {/* Services Grid */}
        <FadeInView delay={250} duration={500} direction="up" distance={15}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Perkhidmatan</Text>
          </View>
          <View style={styles.servicesCard}>
            <View style={styles.servicesGrid}>
              {services.map((svc, i) => (
                <AnimatedPressable
                  key={i}
                  style={styles.serviceItem}
                  scaleTo={0.92}
                  onPress={() => {
                    if (svc.label.includes('Pembiayaan')) navigation.navigate('LoanApplication');
                  }}
                >
                  <View style={[styles.serviceIcon, { borderColor: svc.color + '40' }]}>
                    <Ionicons name={svc.icon} size={28} color={svc.color} />
                  </View>
                  <Text style={styles.serviceLabel}>{svc.label}</Text>
                </AnimatedPressable>
              ))}
            </View>
          </View>
        </FadeInView>

        {/* Application Status */}
        <FadeInView delay={400} duration={500} direction="up" distance={20}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Status Permohonan</Text>
            <AnimatedPressable onPress={() => navigation.navigate('FinancingStatus')}>
              <Text style={styles.seeAllText}>Lihat semua</Text>
            </AnimatedPressable>
          </View>

          <AnimatedPressable style={styles.statusCard} scaleTo={0.98}>
            <View style={styles.statusCardTop}>
              <View style={styles.statusSchemeTag}>
                <Text style={styles.statusSchemeText}>{applicationStatus.scheme}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: applicationStatus.statusColor + '15' }]}>
                <View style={[styles.statusDot, { backgroundColor: applicationStatus.statusColor }]} />
                <Text style={[styles.statusBadgeText, { color: applicationStatus.statusColor }]}>{applicationStatus.status}</Text>
              </View>
            </View>

            <View style={styles.statusInfoRow}>
              <View>
                <Text style={styles.statusRefLabel}>No. Rujukan</Text>
                <Text style={styles.statusRefValue}>{applicationStatus.id}</Text>
              </View>
              <View style={styles.statusAmountWrap}>
                <Text style={styles.statusAmountLabel}>Jumlah</Text>
                <Text style={styles.statusAmountValue}>{applicationStatus.amount}</Text>
              </View>
            </View>

            {/* Progress Steps */}
            <View style={styles.stepsRow}>
              {Array.from({ length: applicationStatus.totalSteps }).map((_, i) => (
                <View key={i} style={styles.stepItem}>
                  <View style={[
                    styles.stepDot,
                    i < applicationStatus.step
                      ? styles.stepDotDone
                      : i === applicationStatus.step
                        ? styles.stepDotCurrent
                        : styles.stepDotPending,
                  ]}>
                    {i < applicationStatus.step && (
                      <Ionicons name="checkmark" size={10} color={Colors.white} />
                    )}
                  </View>
                  {i < applicationStatus.totalSteps - 1 && (
                    <View style={[
                      styles.stepLine,
                      i < applicationStatus.step ? styles.stepLineDone : styles.stepLinePending,
                    ]} />
                  )}
                </View>
              ))}
            </View>
            <Text style={styles.stepCurrentLabel}>Langkah semasa: {applicationStatus.currentStep}</Text>
          </AnimatedPressable>
        </FadeInView>

        {/* Recent Transactions */}
        <FadeInView delay={500} duration={500} direction="up" distance={20}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Pembiayaan Aktif</Text>
            <AnimatedPressable><Text style={styles.seeAllText}>Lihat semua</Text></AnimatedPressable>
          </View>

          {recentLoans.map((loan, i) => (
            <AnimatedPressable
              key={loan.id}
              style={[styles.loanCard, { backgroundColor: loan.color }]}
              scaleTo={0.97}
              onPress={() => navigation.navigate('FinancingStatus')}
            >
              <View style={styles.loanCardContent}>
                <View>
                  <Text style={styles.loanId}>Pembiayaan {loan.id}</Text>
                  <Text style={styles.loanType}>{loan.label}</Text>
                  <Text style={styles.loanAmount}>{loan.amount}</Text>
                </View>
                <View style={styles.loanIconWrap}>
                  <Ionicons name={loan.icon} size={40} color={Colors.textSecondary + '40'} />
                </View>
              </View>
              <AnimatedPressable style={styles.detailsBtn} scaleTo={0.9}>
                <Text style={styles.detailsBtnText}>Butiran</Text>
              </AnimatedPressable>
            </AnimatedPressable>
          ))}
        </FadeInView>

      </ScrollView>

      {/* Chatbot FAB */}
      <AnimatedPressable style={styles.chatFab} scaleTo={0.9} onPress={() => navigation.navigate('Chatbot')}>
        <Ionicons name="chatbubble-ellipses" size={26} color={Colors.white} />
      </AnimatedPressable>
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  notiBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notiBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  headerText: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  heroSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  paymentDueBanner: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 20,
    padding: 20,
    backgroundColor: Colors.pastelCyan,
  },
  paymentDueTopLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  paymentDueHeroAmount: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  paymentDueDate: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textLight,
    marginBottom: 16,
  },
  paymentDueDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginBottom: 16,
  },
  paymentDueBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentDueSubLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  paymentDueSubAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  paymentDueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 50,
    gap: 6,
  },
  paymentDueBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  servicesCard: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(245,247,250,0.85)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    paddingTop: 16,
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceItem: {
    width: (width - 40 - 2) / 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  serviceLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15,
  },
  // Application Status
  statusCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 20,
  },
  statusCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusSchemeTag: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusSchemeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  statusRefLabel: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '500',
    marginBottom: 2,
  },
  statusRefValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  statusAmountWrap: {
    alignItems: 'flex-end',
  },
  statusAmountLabel: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '500',
    marginBottom: 2,
  },
  statusAmountValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotDone: {
    backgroundColor: Colors.accent,
  },
  stepDotCurrent: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: '#FF9500',
  },
  stepDotPending: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 2,
  },
  stepLineDone: {
    backgroundColor: Colors.accent,
  },
  stepLinePending: {
    backgroundColor: Colors.border,
  },
  stepCurrentLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: '600',
  },
  loanCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 8,
  },
  loanCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  loanId: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  loanType: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  loanAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  loanIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsBtn: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
  },
  detailsBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  chatFab: {
    position: 'absolute',
    bottom: 96,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
});
