import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native';
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

const businessTypes = [
  'Peruncitan',
  'Makanan & Minuman (F&B)',
  'Perkhidmatan',
  'Pembuatan',
  'Pertanian',
  'Teknologi & Digital',
  'Pengangkutan & Logistik',
  'Lain-lain',
];

const registrationStatuses = [
  { id: 'ssm', label: 'Berdaftar dengan SSM' },
  { id: 'pbt', label: 'Berdaftar dengan PBT' },
  { id: 'both', label: 'Berdaftar SSM & PBT' },
  { id: 'none', label: 'Belum Berdaftar' },
];

const requiredDocs = [
  { id: 'ic', label: 'Salinan Kad Pengenalan', icon: 'id-card-outline' as const },
  { id: 'license', label: 'Lesen Perniagaan / SSM', icon: 'document-text-outline' as const },
  { id: 'bank', label: 'Penyata Bank (3 Bulan)', icon: 'receipt-outline' as const },
  { id: 'photo', label: 'Gambar Premis Perniagaan', icon: 'camera-outline' as const },
  { id: 'other', label: 'Dokumen Sokongan Lain', icon: 'attach-outline' as const },
];

const stepLabels = ['Pilih Skim', 'Maklumat Pembiayaan', 'Maklumat Perniagaan', 'Muat Naik Dokumen'];

export default function LoanApplicationScreen({ navigation }: any) {
  const [activeScheme, setActiveScheme] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [activeDuration, setActiveDuration] = useState<number | null>(null);
  const [activePurpose, setActivePurpose] = useState<number | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeDeclaration, setAgreeDeclaration] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [step, setStep] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const canProceed = step === 0
    ? activeScheme !== null
    : step === 1
      ? amount.length > 0 && activeDuration !== null && activePurpose !== null
      : step === 2
        ? businessName.length > 0 && businessType !== null && registrationStatus !== null && agreeTerms && agreePrivacy && agreeDeclaration
        : Object.keys(uploadedDocs).length >= 3;

  const formatAmount = (text: string) => {
    // Remove everything except digits and dot
    let clean = text.replace(/[^0-9.]/g, '');
    // Only allow one dot
    const parts = clean.split('.');
    if (parts.length > 2) clean = parts[0] + '.' + parts.slice(1).join('');
    // Limit decimal to 2 digits
    if (parts.length === 2 && parts[1].length > 2) {
      clean = parts[0] + '.' + parts[1].slice(0, 2);
    }
    // Add commas to integer part
    const [intPart, decPart] = clean.split('.');
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setAmount(decPart !== undefined ? `${withCommas}.${decPart}` : withCommas);
  };

  const getRawAmount = () => parseFloat(amount.replace(/,/g, '')) || 0;

  const handleSubmit = () => {
    navigation.goBack();
  };

  const toggleDoc = (docId: string) => {
    setUploadedDocs(prev => {
      const next = { ...prev };
      if (next[docId]) delete next[docId];
      else next[docId] = true;
      return next;
    });
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
        {[0, 1, 2, 3].map(i => {
          const stepColors = ['#007AFF', '#FF9500', '#34C759', Colors.primary];
          return (
            <View
              key={i}
              style={[
                styles.progressBar,
                i <= step && { backgroundColor: stepColors[i] },
              ]}
            />
          );
        })}
      </View>
      <Text style={styles.stepLabel}>
        Langkah {step + 1}/4 — {stepLabels[step]}
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
                onChangeText={formatAmount}
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
                    RM {(getRawAmount() / parseInt(durations[activeDuration]) || 0).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

            {/* Dropdown: Jenis Perniagaan */}
            <Text style={styles.sectionTitle}>Jenis Perniagaan</Text>
            <AnimatedPressable
              style={styles.dropdownBtn}
              scaleTo={0.98}
              onPress={() => setDropdownOpen(true)}
            >
              <Text style={[styles.dropdownBtnText, !businessType && { color: Colors.textLight }]}>
                {businessType || 'Pilih jenis perniagaan'}
              </Text>
              <Ionicons name="chevron-down" size={18} color={Colors.textSecondary} />
            </AnimatedPressable>

            {/* Dropdown Modal */}
            <Modal visible={dropdownOpen} transparent animationType="fade">
              <AnimatedPressable style={styles.modalOverlay} onPress={() => setDropdownOpen(false)}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Jenis Perniagaan</Text>
                    <AnimatedPressable scaleTo={0.9} onPress={() => setDropdownOpen(false)}>
                      <Ionicons name="close" size={22} color={Colors.text} />
                    </AnimatedPressable>
                  </View>
                  <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                    {businessTypes.map(bt => (
                      <AnimatedPressable
                        key={bt}
                        style={[styles.modalOption, businessType === bt && styles.modalOptionActive]}
                        scaleTo={0.98}
                        onPress={() => { setBusinessType(bt); setDropdownOpen(false); }}
                      >
                        <Text style={[styles.modalOptionText, businessType === bt && styles.modalOptionTextActive]}>
                          {bt}
                        </Text>
                        {businessType === bt && (
                          <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                        )}
                      </AnimatedPressable>
                    ))}
                  </ScrollView>
                </View>
              </AnimatedPressable>
            </Modal>

            {/* Radio: Status Pendaftaran */}
            <Text style={styles.sectionTitle}>Status Pendaftaran Perniagaan</Text>
            {registrationStatuses.map(rs => (
              <AnimatedPressable
                key={rs.id}
                style={styles.radioRow}
                scaleTo={0.98}
                onPress={() => setRegistrationStatus(rs.id)}
              >
                <View style={[styles.radioOuter, registrationStatus === rs.id && styles.radioOuterActive]}>
                  {registrationStatus === rs.id && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{rs.label}</Text>
              </AnimatedPressable>
            ))}

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

            {/* Checkboxes: Terms */}
            <Text style={styles.sectionTitle}>Perakuan & Persetujuan</Text>
            <AnimatedPressable style={styles.checkboxRow} scaleTo={0.98} onPress={() => setAgreeTerms(!agreeTerms)}>
              <View style={[styles.checkboxOuter, agreeTerms && styles.checkboxOuterActive]}>
                {agreeTerms && <Ionicons name="checkmark" size={14} color={Colors.white} />}
              </View>
              <Text style={styles.checkboxLabel}>Saya bersetuju dengan <Text style={styles.linkText}>Terma & Syarat</Text> pembiayaan TEKUN.</Text>
            </AnimatedPressable>

            <AnimatedPressable style={styles.checkboxRow} scaleTo={0.98} onPress={() => setAgreePrivacy(!agreePrivacy)}>
              <View style={[styles.checkboxOuter, agreePrivacy && styles.checkboxOuterActive]}>
                {agreePrivacy && <Ionicons name="checkmark" size={14} color={Colors.white} />}
              </View>
              <Text style={styles.checkboxLabel}>Saya bersetuju dengan <Text style={styles.linkText}>Dasar Privasi</Text> dan pemprosesan data peribadi.</Text>
            </AnimatedPressable>

            <AnimatedPressable style={styles.checkboxRow} scaleTo={0.98} onPress={() => setAgreeDeclaration(!agreeDeclaration)}>
              <View style={[styles.checkboxOuter, agreeDeclaration && styles.checkboxOuterActive]}>
                {agreeDeclaration && <Ionicons name="checkmark" size={14} color={Colors.white} />}
              </View>
              <Text style={styles.checkboxLabel}>Saya mengaku bahawa semua maklumat yang diberikan adalah benar dan tepat.</Text>
            </AnimatedPressable>
          </FadeInView>
        )}

        {/* Step 3: Document Upload */}
        {step === 3 && (
          <FadeInView delay={100} duration={400} direction="up" distance={15}>
            <Text style={styles.sectionTitle}>Muat Naik Dokumen</Text>
            <Text style={styles.sectionSubtitle}>Sila muat naik sekurang-kurangnya 3 dokumen yang diperlukan.</Text>

            {requiredDocs.map(doc => (
              <AnimatedPressable
                key={doc.id}
                style={[styles.fileCard, uploadedDocs[doc.id] && styles.fileCardUploaded]}
                scaleTo={0.98}
                onPress={() => toggleDoc(doc.id)}
              >
                <View style={[styles.fileIconWrap, uploadedDocs[doc.id] && styles.fileIconWrapUploaded]}>
                  <Ionicons name={doc.icon} size={20} color={uploadedDocs[doc.id] ? Colors.accent : Colors.textSecondary} />
                </View>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileLabel}>{doc.label}</Text>
                  <Text style={[styles.fileStatus, uploadedDocs[doc.id] && styles.fileStatusUploaded]}>
                    {uploadedDocs[doc.id] ? 'Berjaya dimuat naik' : 'Belum dimuat naik'}
                  </Text>
                </View>
                <View style={[styles.fileAction, uploadedDocs[doc.id] && styles.fileActionUploaded]}>
                  <Ionicons
                    name={uploadedDocs[doc.id] ? 'checkmark' : 'cloud-upload-outline'}
                    size={18}
                    color={uploadedDocs[doc.id] ? Colors.white : Colors.primary}
                  />
                </View>
              </AnimatedPressable>
            ))}

            <View style={styles.fileHint}>
              <Ionicons name="information-circle-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.fileHintText}>Format diterima: PDF, JPG, PNG. Saiz maksimum: 5MB setiap fail.</Text>
            </View>

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
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Perniagaan</Text>
                <Text style={styles.summaryValue}>{businessName}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Jenis</Text>
                <Text style={styles.summaryValue}>{businessType || '-'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Dokumen</Text>
                <Text style={styles.summaryValue}>{Object.keys(uploadedDocs).length}/{requiredDocs.length} dimuat naik</Text>
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
            if (step < 3) setStep(step + 1);
            else handleSubmit();
          }}
        >
          <Text style={styles.nextBtnText}>{step === 3 ? 'Hantar Permohonan' : 'Seterusnya'}</Text>
          <Ionicons name={step === 3 ? 'checkmark' : 'arrow-forward'} size={18} color={Colors.white} />
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
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 14,
    marginTop: -4,
    lineHeight: 17,
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

  // Radio
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
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
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    flex: 1,
  },

  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  checkboxOuter: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxOuterActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
    flex: 1,
    lineHeight: 19,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '600',
  },

  // Dropdown
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  dropdownBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },

  // Modal (Dropdown)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  modalScroll: {
    paddingHorizontal: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalOptionActive: {
    backgroundColor: Colors.primary + '08',
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  modalOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  modalOptionTextActive: {
    fontWeight: '700',
    color: Colors.primary,
  },

  // File attachment
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
  },
  fileCardUploaded: {
    borderColor: Colors.accent + '40',
    backgroundColor: Colors.pastelMint,
    borderStyle: 'solid',
  },
  fileIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fileIconWrapUploaded: {
    backgroundColor: Colors.accent + '15',
  },
  fileInfo: {
    flex: 1,
  },
  fileLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  fileStatus: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.textLight,
  },
  fileStatusUploaded: {
    color: Colors.accent,
  },
  fileAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileActionUploaded: {
    backgroundColor: Colors.accent,
  },
  fileHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    marginBottom: 16,
  },
  fileHintText: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 16,
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
    borderWidth: 1,
    borderColor: '#D1D5DB',
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
    borderWidth: 1,
    borderColor: '#D1D5DB',
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
    maxWidth: '55%',
    textAlign: 'right',
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
