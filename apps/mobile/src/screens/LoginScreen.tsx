import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import FadeInView from '../components/FadeInView';
import AnimatedPressable from '../components/AnimatedPressable';

export default function LoginScreen({ navigation }: any) {
  const [ic, setIc] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = () => {
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        {/* Logo area */}
        <FadeInView delay={200} duration={600} direction="up" distance={30}>
          <View style={styles.logoContainer}>
            <LinearGradient colors={[...Colors.gradientPurple]} style={styles.logoCircle}>
              <Text style={styles.logoText}>T</Text>
            </LinearGradient>
            <Text style={styles.appName}>myTEKUN</Text>
            <Text style={styles.tagline}>Portal Usahawan Digital</Text>
          </View>
        </FadeInView>

        {/* Login form */}
        <FadeInView delay={400} duration={600} direction="up" distance={40} style={styles.formCard}>
          <Text style={styles.formTitle}>Log Masuk</Text>

          <Text style={styles.label}>No. Kad Pengenalan</Text>
          <TextInput
            style={[styles.input, focusedInput === 'ic' && styles.inputFocused]}
            placeholder="cth: 901234-56-7890"
            placeholderTextColor={Colors.textLight}
            value={ic}
            onChangeText={setIc}
            keyboardType="number-pad"
            onFocus={() => setFocusedInput('ic')}
            onBlur={() => setFocusedInput(null)}
          />

          <Text style={styles.label}>Kata Laluan</Text>
          <TextInput
            style={[styles.input, focusedInput === 'pwd' && styles.inputFocused]}
            placeholder="Masukkan kata laluan"
            placeholderTextColor={Colors.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setFocusedInput('pwd')}
            onBlur={() => setFocusedInput(null)}
          />

          <AnimatedPressable style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Lupa kata laluan?</Text>
          </AnimatedPressable>

          <AnimatedPressable onPress={handleLogin} style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Log Masuk</Text>
          </AnimatedPressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>atau</Text>
            <View style={styles.dividerLine} />
          </View>

          <AnimatedPressable style={styles.registerBtn}>
            <Text style={styles.registerBtnText}>Daftar Akaun Baru</Text>
          </AnimatedPressable>
        </FadeInView>

        <FadeInView delay={600} direction="up" distance={20}>
          <Text style={styles.footer}>© 2026 TEKUN Nasional</Text>
        </FadeInView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#7B2FBE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  inputFocused: {
    borderColor: '#7B2FBE',
    backgroundColor: Colors.white,
    shadowColor: '#7B2FBE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 13,
    color: '#7B2FBE',
    fontWeight: '500',
  },
  loginBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: Colors.textLight,
  },
  registerBtn: {
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  registerBtnText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    color: Colors.textLight,
    fontSize: 12,
    marginTop: 24,
  },
});
