import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import FadeInView from '../components/FadeInView';
import AnimatedPressable from '../components/AnimatedPressable';

const { width } = Dimensions.get('window');

const loans = [
  {
    id: '01',
    type: 'Skim Tekun Niaga',
    amount: 'RM 50,500.30',
    icon: 'storefront-outline' as const,
    color: Colors.pastelCyan,
    payments: 'RM 40,500.30',
    monthlyPay: 'RM 500.20',
  },
  {
    id: '02',
    type: 'Skim Teman Tekun',
    amount: 'RM 10,343.52',
    icon: 'briefcase-outline' as const,
    color: Colors.pastelLavender,
    payments: 'RM 5,000',
    monthlyPay: 'RM 850.25',
  },
];

// Per-loan chart data
const loanChartData = [
  [
    { month: 'Okt', paid: 500, balance: 50000 },
    { month: 'Nov', paid: 1000, balance: 49500 },
    { month: 'Dis', paid: 1500, balance: 49000 },
    { month: 'Jan', paid: 2000, balance: 48500 },
    { month: 'Feb', paid: 2500, balance: 48000 },
    { month: 'Mac', paid: 3000, balance: 47500 },
  ],
  [
    { month: 'Okt', paid: 850, balance: 10343 },
    { month: 'Nov', paid: 1700, balance: 9493 },
    { month: 'Dis', paid: 2550, balance: 8643 },
    { month: 'Jan', paid: 3400, balance: 7793 },
    { month: 'Feb', paid: 4250, balance: 6943 },
    { month: 'Mac', paid: 5100, balance: 6093 },
  ],
];

const loanSummaries = [
  { totalPaid: 'RM 3,000', currentBalance: 'RM 47,500', percentage: '6%', total: 'RM 50,500.30' },
  { totalPaid: 'RM 5,100', currentBalance: 'RM 6,093', percentage: '49%', total: 'RM 10,343.52' },
];

const loanMaxChart = [52000, 12000];

const CHART_H = 150;
const CHART_W = width - 100;
const CHART_PAD_TOP = 10;
const CHART_PAD_BOT = 6;

function valuesToPath(values: number[], max: number): string {
  const stepX = CHART_W / (values.length - 1);
  const usableH = CHART_H - CHART_PAD_TOP - CHART_PAD_BOT;
  return values.map((v, i) => {
    const x = i * stepX;
    const y = CHART_PAD_TOP + usableH - (v / max) * usableH;
    return i === 0 ? `M${x},${y}` : `L${x},${y}`;
  }).join(' ');
}

function valuesToFillPath(values: number[], max: number): string {
  const stepX = CHART_W / (values.length - 1);
  const usableH = CHART_H - CHART_PAD_TOP - CHART_PAD_BOT;
  const linePath = values.map((v, i) => {
    const x = i * stepX;
    const y = CHART_PAD_TOP + usableH - (v / max) * usableH;
    return i === 0 ? `M${x},${y}` : `L${x},${y}`;
  }).join(' ');
  return `${linePath} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;
}

function getPoint(values: number[], index: number, max: number) {
  const stepX = CHART_W / (values.length - 1);
  const usableH = CHART_H - CHART_PAD_TOP - CHART_PAD_BOT;
  return {
    x: index * stepX,
    y: CHART_PAD_TOP + usableH - (values[index] / max) * usableH,
  };
}

export default function FinancingStatusScreen() {
  const [activeLoan, setActiveLoan] = useState(0);
  const loan = loans[activeLoan];
  const chartData = loanChartData[activeLoan];
  const summary = loanSummaries[activeLoan];
  const maxChart = loanMaxChart[activeLoan];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable style={styles.backBtn} scaleTo={0.9}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>Pembiayaan Saya</Text>
        <AnimatedPressable style={styles.bellBtn} scaleTo={0.9}>
          <Ionicons name="notifications-outline" size={22} color={Colors.text} />
        </AnimatedPressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Tab Selector */}
        <FadeInView delay={100} duration={600} direction="up" distance={20}>
          <View style={styles.tabContainer}>
            {loans.map((l, index) => (
              <AnimatedPressable
                key={l.id}
                style={[styles.tab, activeLoan === index && styles.tabActive]}
                scaleTo={0.97}
                onPress={() => setActiveLoan(index)}
              >
                <View style={[styles.tabIconWrap, { backgroundColor: activeLoan === index ? l.color : Colors.background }]}>
                  <Ionicons name={l.icon} size={20} color={activeLoan === index ? Colors.text : Colors.textLight} />
                </View>
                <Text style={[styles.tabLabel, activeLoan === index && styles.tabLabelActive]} numberOfLines={1}>
                  {l.type}
                </Text>
              </AnimatedPressable>
            ))}
          </View>
        </FadeInView>

        {/* Selected Loan Card */}
        <FadeInView delay={200} duration={600} direction="up" distance={20}>
          <View style={[styles.loanCard, { backgroundColor: loan.color }]}>
            <View style={styles.loanCardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.loanId}>Pembiayaan {loan.id}</Text>
                <Text style={styles.loanType}>{loan.type}</Text>
                <Text style={styles.loanAmount}>{loan.amount}</Text>
              </View>
              <AnimatedPressable style={styles.detailsBtn} scaleTo={0.9}>
                <Text style={styles.detailsBtnText}>Butiran</Text>
              </AnimatedPressable>
            </View>
          </View>
        </FadeInView>

        {/* Chart Section */}
        <FadeInView delay={350} duration={600} direction="up" distance={20}>
          <View style={styles.chartCard}>
            <View style={styles.chartHeaderRow}>
              <Text style={styles.chartTitle}>Bayaran vs Baki Pembiayaan</Text>
              <View style={styles.chartPeriodBadge}>
                <Text style={styles.chartPeriodText}>6 Bulan</Text>
              </View>
            </View>

            {/* Legend */}
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.accent }]} />
                <Text style={styles.legendText}>Bayaran Bulanan</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#7B2FBE' }]} />
                <Text style={styles.legendText}>Baki Pembiayaan</Text>
              </View>
            </View>

            {/* Line Chart */}
            <View style={styles.chartArea}>
              <View style={styles.yAxis}>
                <Text style={styles.yLabel}>{activeLoan === 0 ? 'RM 52k' : 'RM 12k'}</Text>
                <Text style={styles.yLabel}>{activeLoan === 0 ? 'RM 26k' : 'RM 6k'}</Text>
                <Text style={styles.yLabel}>RM 0</Text>
              </View>

              <View style={styles.svgWrap}>
                {/* Grid lines */}
                <View style={[styles.gridLine, { top: CHART_PAD_TOP }]} />
                <View style={[styles.gridLine, { top: '50%' }]} />
                <View style={[styles.gridLine, { bottom: CHART_PAD_BOT }]} />

                <Svg width={CHART_W} height={CHART_H}>
                  <Defs>
                    <SvgGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#7B2FBE" stopOpacity="0.2" />
                      <Stop offset="1" stopColor="#7B2FBE" stopOpacity="0" />
                    </SvgGradient>
                    <SvgGradient id="paidFill" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor={Colors.accent} stopOpacity="0.15" />
                      <Stop offset="1" stopColor={Colors.accent} stopOpacity="0" />
                    </SvgGradient>
                  </Defs>

                  {/* Balance area fill */}
                  <Path
                    d={valuesToFillPath(chartData.map(d => d.balance), maxChart)}
                    fill="url(#balanceFill)"
                  />
                  {/* Balance line */}
                  <Path
                    d={valuesToPath(chartData.map(d => d.balance), maxChart)}
                    stroke="#7B2FBE"
                    strokeWidth={2.5}
                    fill="none"
                    strokeLinejoin="round"
                  />
                  {/* Balance dots */}
                  {chartData.map((_, i) => {
                    const pt = getPoint(chartData.map(d => d.balance), i, maxChart);
                    return <Circle key={`b${i}`} cx={pt.x} cy={pt.y} r={4} fill="#7B2FBE" stroke={Colors.white} strokeWidth={2} />;
                  })}

                  {/* Paid area fill */}
                  <Path
                    d={valuesToFillPath(chartData.map(d => d.paid), maxChart)}
                    fill="url(#paidFill)"
                  />
                  {/* Paid line */}
                  <Path
                    d={valuesToPath(chartData.map(d => d.paid), maxChart)}
                    stroke={Colors.accent}
                    strokeWidth={2.5}
                    fill="none"
                    strokeLinejoin="round"
                  />
                  {/* Paid dots */}
                  {chartData.map((_, i) => {
                    const pt = getPoint(chartData.map(d => d.paid), i, maxChart);
                    return <Circle key={`p${i}`} cx={pt.x} cy={pt.y} r={4} fill={Colors.accent} stroke={Colors.white} strokeWidth={2} />;
                  })}
                </Svg>

                {/* X-axis labels */}
                <View style={styles.xLabelsRow}>
                  {chartData.map((item, i) => (
                    <Text key={i} style={styles.xLabel}>{item.month}</Text>
                  ))}
                </View>
              </View>
            </View>

            {/* Summary below chart */}
            <View style={styles.chartSummaryRow}>
              <View style={styles.chartSummaryItem}>
                <Text style={styles.chartSummaryValue}>{summary.totalPaid}</Text>
                <Text style={styles.chartSummaryLabel}>Jumlah Dibayar</Text>
              </View>
              <View style={styles.chartSummaryDivider} />
              <View style={styles.chartSummaryItem}>
                <Text style={styles.chartSummaryValue}>{summary.currentBalance}</Text>
                <Text style={styles.chartSummaryLabel}>Baki Semasa</Text>
              </View>
              <View style={styles.chartSummaryDivider} />
              <View style={styles.chartSummaryItem}>
                <Text style={[styles.chartSummaryValue, { color: Colors.accent }]}>{summary.percentage}</Text>
                <Text style={styles.chartSummaryLabel}>Selesai</Text>
              </View>
            </View>

          </View>
        </FadeInView>

        {/* Payment Breakdown + Pay Button */}
        <FadeInView delay={400} duration={500} direction="up" distance={15}>
          <View style={styles.breakdownSection}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Jumlah Pembiayaan</Text>
              <Text style={styles.breakdownValue}>{loan.amount}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Jumlah Dibayar</Text>
              <Text style={styles.breakdownValue}>{loan.payments}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Bayaran Bulanan</Text>
              <Text style={styles.breakdownValue}>{loan.monthlyPay}</Text>
            </View>
            <View style={styles.breakdownDivider} />
            <View style={styles.payRow}>
              <View>
                <Text style={styles.payRowLabel}>Baki Keseluruhan</Text>
                <Text style={styles.payRowValue}>{summary.currentBalance}</Text>
              </View>
              <AnimatedPressable style={styles.payBtn} scaleTo={0.97}>
                <Text style={styles.payBtnText}>Bayar</Text>
              </AnimatedPressable>
            </View>
          </View>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 8,
  },
  tabActive: {
    backgroundColor: Colors.white,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  tabIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textLight,
  },
  tabLabelActive: {
    color: Colors.text,
    fontWeight: '700',
  },
  loanCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  loanCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: '700',
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

  // Chart
  chartCard: {
    backgroundColor: Colors.background,
    borderRadius: 24,
    padding: 20,
    marginBottom: 12,
  },
  chartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  chartPeriodBadge: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  chartPeriodText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  chartArea: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  yAxis: {
    width: 44,
    height: CHART_H,
    justifyContent: 'space-between',
  },
  yLabel: {
    fontSize: 9,
    color: Colors.textLight,
    fontWeight: '500',
  },
  svgWrap: {
    flex: 1,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.border,
  },
  xLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  xLabel: {
    fontSize: 10,
    color: Colors.textLight,
    fontWeight: '600',
  },
  chartSummaryRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
  },
  chartSummaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  chartSummaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  chartSummaryLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  chartSummaryDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },

  // Breakdown
  breakdownSection: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 16,
    marginTop: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
  },
  breakdownLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 6,
  },
  payRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  payRowLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  payRowValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  payBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  payBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
