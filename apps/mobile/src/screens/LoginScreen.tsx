import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import FadeInView from '../components/FadeInView';
import AnimatedPressable from '../components/AnimatedPressable';

export default function LoginScreen({ navigation }: any) {
  const [ic, setIc] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    navigation.replace('Main');
  };

  const isFormValid = ic.length > 0 && password.length > 0;

  return (
    <LinearGradient
      colors={['#0A84FF', '#0A84FF', '#FFA726']}
      locations={[0, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* Top decorative section */}
      <View style={styles.topSection}>
        <View style={styles.topDecor1} />
        <View style={styles.topDecor2} />

        <FadeInView delay={200} duration={600} direction="up" distance={30}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>T</Text>
            </View>
            <Text style={styles.appName}>myTEKUN</Text>
            <Text style={styles.tagline}>Portal Usahawan Digital</Text>
          </View>
        </FadeInView>
      </View>

      {/* Form section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.formContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <FadeInView delay={400} duration={600} direction="up" distance={30}>
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Log Masuk</Text>
              <Text style={styles.formSubtitle}>Sila masukkan maklumat anda untuk meneruskan</Text>

              {/* IC Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>No. Kad Pengenalan</Text>
                <View style={[styles.inputWrap, focusedInput === 'ic' && styles.inputWrapFocused]}>
                  <Ionicons name="id-card-outline" size={20} color={focusedInput === 'ic' ? Colors.primary : Colors.textLight} />
                  <TextInput
                    style={styles.input}
                    placeholder="cth: 901234-56-7890"
                    placeholderTextColor={Colors.textLight}
                    value={ic}
                    onChangeText={setIc}
                    keyboardType="number-pad"
                    onFocus={() => setFocusedInput('ic')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Kata Laluan</Text>
                <View style={[styles.inputWrap, focusedInput === 'pwd' && styles.inputWrapFocused]}>
                  <Ionicons name="lock-closed-outline" size={20} color={focusedInput === 'pwd' ? Colors.primary : Colors.textLight} />
                  <TextInput
                    style={styles.input}
                    placeholder="Masukkan kata laluan"
                    placeholderTextColor={Colors.textLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onFocus={() => setFocusedInput('pwd')}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <AnimatedPressable scaleTo={0.9} onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color={Colors.textLight}
                    />
                  </AnimatedPressable>
                </View>
              </View>

              {/* Remember & Forgot Row */}
              <View style={styles.optionsRow}>
                <AnimatedPressable style={styles.rememberRow} scaleTo={0.98} onPress={() => setRememberMe(!rememberMe)}>
                  <View style={[styles.checkboxSmall, rememberMe && styles.checkboxSmallActive]}>
                    {rememberMe && <Ionicons name="checkmark" size={12} color={Colors.white} />}
                  </View>
                  <Text style={styles.rememberText}>Ingat saya</Text>
                </AnimatedPressable>
                <AnimatedPressable scaleTo={0.95}>
                  <Text style={styles.forgotText}>Lupa kata laluan?</Text>
                </AnimatedPressable>
              </View>

              {/* Login Button */}
              <AnimatedPressable
                onPress={handleLogin}
                style={[styles.loginBtn, !isFormValid && styles.loginBtnDisabled]}
                scaleTo={0.97}
              >
                <Text style={styles.loginBtnText}>Log Masuk</Text>
                <Ionicons name="arrow-forward" size={18} color={Colors.white} />
              </AnimatedPressable>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>atau log masuk dengan</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login */}
              <View style={styles.socialRow}>
                <View style={styles.socialBtnWrap}>
                  <AnimatedPressable style={styles.socialBtn} scaleTo={0.95}>
                    <Ionicons name="finger-print-outline" size={22} color={Colors.text} />
                    <Text style={styles.socialBtnText}>Biometrik</Text>
                  </AnimatedPressable>
                </View>
                <View style={{ width: 12 }} />
                <View style={styles.socialBtnWrap}>
                  <AnimatedPressable style={styles.socialBtn} scaleTo={0.95}>
                    <Ionicons name="phone-portrait-outline" size={22} color={Colors.text} />
                    <Text style={styles.socialBtnText}>OTP</Text>
                  </AnimatedPressable>
                </View>
              </View>

              {/* Register */}
              <View style={styles.registerRow}>
                <Text style={styles.registerText}>Belum mempunyai akaun? </Text>
                <AnimatedPressable scaleTo={0.95}>
                  <Text style={styles.registerLink}>Daftar Sekarang</Text>
                </AnimatedPressable>
              </View>
            </View>
          </FadeInView>

          {/* Footer */}
          <FadeInView delay={600} direction="up" distance={15}>
            <View style={styles.footerRow}>
              <Ionicons name="shield-checkmark-outline" size={14} color={Colors.textLight} />
              <Text style={styles.footer}>Dilindungi oleh TEKUN Nasional</Text>
            </View>
            <Text style={styles.footerCopy}>Versi 1.0.0  |  © 2026 TEKUN Nasional</Text>
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Top Section
  topSection: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    overflow: 'hidden',
  },
  topDecor1: {
    position: 'absolute',
    top: -40,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,200,0,0.2)',
  },
  topDecor2: {
    position: 'absolute',
    top: 20,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,165,0,0.15)',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    fontWeight: '500',
  },

  // Form
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 28,
    paddingBottom: 30,
  },
  formCard: {},
  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 24,
  },

  // Input
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 14,
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  inputWrapFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },

  // Options Row
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxSmall: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSmallActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rememberText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  forgotText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },

  // Login Button
  loginBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loginBtnDisabled: {
    opacity: 0.4,
  },
  loginBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: '500',
  },

  // Social
  socialRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  socialBtnWrap: {
    flex: 1,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },

  // Register
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  registerLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
  },

  // Footer
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 24,
  },
  footer: {
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: '500',
  },
  footerCopy: {
    textAlign: 'center',
    color: Colors.textLight,
    fontSize: 11,
    marginTop: 6,
    fontWeight: '400',
  },
});
