import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import FadeInView from '../components/FadeInView';
import AnimatedPressable from '../components/AnimatedPressable';

const schemes = [
  { id: 'niaga', label: 'Skim Tekun Niaga', desc: 'Sehingga RM 100,000', icon: 'storefront-outline' as const, color: '#007AFF', bg: '#E3F2FD' },
  { id: 'teman', label: 'Skim Teman Tekun', desc: 'Sehingga RM 10,000', icon: 'people-outline' as const, color: '#34C759', bg: Colors.pastelMint },
  { id: 'micro', label: 'Skim Pembiayaan Mikro', desc: 'Sehingga RM 50,000', icon: 'briefcase-outline' as const, color: '#FF9500', bg: '#FFF3E0' },
];

const durations = ['12 Bulan', '24 Bulan', '36 Bulan', '48 Bulan', '60 Bulan'];

const purposes = [
  'Modal Pusingan',
  'Pembelian Aset',
  'Pengubahsuaian Premis',
  'Pemasaran & Pengiklanan',
  'Lain-lain',
];

export default function LoanApplicationScreen({ navigation }: any) {
  const [activeScheme, setActiveScheme] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [activeDuration, setActiveDuration] = useState<number | null>(null);
  const [activePurpose, setActivePurpose] = useState<number | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(0);

  const canProceed = step === 0
    ? activeScheme !== null
    : step === 1
      ? amount.length > 0 && activeDuration !== null && activePurpose !== null
      : businessName.length > 0 && businessType.length > 0;

  const handleSubmit = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable style={styles.backBtn} scaleTo={0.9} onPress={() => {
          if (step > 0) setStep(step - 1);
          else navigation.goBack();
        }}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>Mohon Pembiayaan</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        {[0, 1, 2].map(i => (
          <View key={i} style={[styles.progressBar, i <= step && styles.progressBarActive]} />
        ))}
      </View>
      <Text style={styles.stepLabel}>
        {step === 0 ? 'Pilih Skim' : step === 1 ? 'Maklumat Pembiayaan' : 'Maklumat Perniagaan'}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

        {/* Step 0: Choose Scheme */}
        {step === 0 && (
          <FadeInView delay={100} duration={400} direction="up" distance={15}>
            <Text style={styles.sectionTitle}>Pilih Skim Pembiayaan</Text>
            {schemes.map(s => (
              <AnimatedPressable
                key={s.id}
                style={[styles.schemeCard, activeScheme === s.id && styles.schemeCardActive]}
                scaleTo={0.98}
                onPress={() => setActiveScheme(s.id)}
              >
                <View style={[styles.schemeIcon, { backgroundColor: s.bg }]}>
                  <Ionicons name={s.icon} size={22} color={s.color} />
                </View>
                <View style={styles.schemeInfo}>
                  <Text style={styles.schemeLabel}>{s.label}</Text>
                  <Text style={styles.schemeDesc}>{s.desc}</Text>
                </View>
                <View style={[styles.radioOuter, activeScheme === s.id && styles.radioOuterActive]}>
                  {activeScheme === s.id && <View style={styles.radioInner} />}
                </View>
              </AnimatedPressable>
            ))}
          </FadeInView>
        )}

        {/* Step 1: Loan Details */}
        {step === 1 && (
          <FadeInView delay={100} duration={400} direction="up" distance={15}>
            <Text style={styles.sectionTitle}>Jumlah Pembiayaan</Text>
            <View style={styles.amountInputWrap}>
              <Text style={styles.amountPrefix}>RM</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={Colors.textLight}
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.sectionTitle}>Tempoh Bayaran Balik</Text>
            <View style={styles.chipsRow}>
              {durations.map((d, i) => (
                <AnimatedPressable
                  key={d}
                  style={[styles.chip, activeDuration === i && styles.chipActive]}
                  scaleTo={0.93}
                  onPress={() => setActiveDuration(i)}
                >
                  <Text style={[styles.chipText, activeDuration === i && styles.chipTextActive]}>{d}</Text>
                </AnimatedPressable>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Tujuan Pembiayaan</Text>
            <View style={styles.chipsRow}>
              {purposes.map((p, i) => (
                <AnimatedPressable
                  key={p}
                  style={[styles.chip, activePurpose === i && styles.chipActive]}
                  scaleTo={0.93}
                  onPress={() => setActivePurpose(i)}
                >
                  <Text style={[styles.chipText, activePurpose === i && styles.chipTextActive]}>{p}</Text>
                </AnimatedPressable>
              ))}
            </View>

            {amount.length > 0 && activeDuration !== null && (
              <View style={styles.estimateCard}>
                <Ionicons name="calculator-outline" size={18} color={Colors.primary} />
                <View style={styles.estimateInfo}>
                  <Text style={styles.estimateLabel}>Anggaran Ansuran Bulanan</Text>
                  <Text style={styles.estimateValue}>
                    RM {(parseFloat(amount.replace(/,/g, '')) / parseInt(durations[activeDuration]) || 0).toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          </FadeInView>
        )}

        {/* Step 2: Business Info */}
        {step === 2 && (
          <FadeInView delay={100} duration={400} direction="up" distance={15}>
            <Text style={styles.sectionTitle}>Nama Perniagaan</Text>
            <TextInput
              style={styles.textInput}
              value={businessName}
              onChangeText={setBusinessName}
              placeholder="cth. Kedai Runcit Aminah"
              placeholderTextColor={Colors.textLight}
            />

            <Text style={styles.sectionTitle}>Jenis Perniagaan</Text>
            <TextInput
              style={styles.textInput}
              value={businessType}
              onChangeText={setBusinessType}
              placeholder="cth. Peruncitan, F&B, Perkhidmatan"
              placeholderTextColor={Colors.textLight}
            />

            <Text style={styles.sectionTitle}>Catatan Tambahan (Pilihan)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Maklumat tambahan untuk permohonan anda"
              placeholderTextColor={Colors.textLight}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Ringkasan Permohonan</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Skim</Text>
                <Text style={styles.summaryValue}>{schemes.find(s => s.id === activeScheme)?.label}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Jumlah</Text>
                <Text style={styles.summaryValue}>RM {amount}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tempoh</Text>
                <Text style={styles.summaryValue}>{activeDuration !== null ? durations[activeDuration] : '-'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tujuan</Text>
                <Text style={styles.summaryValue}>{activePurpose !== null ? purposes[activePurpose] : '-'}</Text>
              </View>
            </View>
          </FadeInView>
        )}

      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <AnimatedPressable
          style={[styles.nextBtn, !canProceed && styles.nextBtnDisabled]}
          scaleTo={0.97}
          onPress={() => {
            if (!canProceed) return;
            if (step < 2) setStep(step + 1);
            else handleSubmit();
          }}
        >
          <Text style={styles.nextBtnText}>{step === 2 ? 'Hantar Permohonan' : 'Seterusnya'}</Text>
          <Ionicons name={step === 2 ? 'checkmark' : 'arrow-forward'} size={18} color={Colors.white} />
        </AnimatedPressable>
      </View>
    </KeyboardAvoidingView>
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
    paddingBottom: 12,
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
  progressRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 6,
    marginBottom: 6,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  progressBarActive: {
    backgroundColor: Colors.primary,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
    marginTop: 8,
  },

  // Scheme cards
  schemeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  schemeCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  schemeIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  schemeInfo: {
    flex: 1,
  },
  schemeLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  schemeDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },

  // Amount input
  amountInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
  },
  amountPrefix: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    paddingVertical: 12,
  },

  // Chips
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: Colors.background,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.white,
  },

  // Estimate
  estimateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.pastelCyan,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    marginTop: 4,
  },
  estimateInfo: {
    flex: 1,
  },
  estimateLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  estimateValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },

  // Text inputs
  textInput: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 12,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },

  // Summary
  summaryCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },

  // Bottom
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 28,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 50,
    gap: 8,
  },
  nextBtnDisabled: {
    opacity: 0.4,
  },
  nextBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
