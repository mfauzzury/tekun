import { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import FadeInView from '../components/FadeInView';
import AnimatedPressable from '../components/AnimatedPressable';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  time: string;
};

const quickQuestions = [
  { icon: 'cash-outline' as const, text: 'Skim pembiayaan' },
  { icon: 'document-text-outline' as const, text: 'Cara memohon' },
  { icon: 'trending-up-outline' as const, text: 'Kadar keuntungan' },
  { icon: 'checkmark-circle-outline' as const, text: 'Syarat kelayakan' },
];

const botResponses: Record<string, string> = {
  'skim': 'TEKUN menawarkan beberapa skim pembiayaan:\n\n1. **Skim Tekun Niaga** — Sehingga RM 100,000 untuk perniagaan sedia ada.\n\n2. **Skim Teman Tekun** — Sehingga RM 10,000 untuk usahawan kecil dan mikro.\n\n3. **Skim Pembiayaan Mikro** — Sehingga RM 50,000 untuk PKS.\n\nSemua skim ini terbuka kepada usahawan Bumiputera yang berdaftar.',
  'mohon': 'Untuk memohon pembiayaan TEKUN:\n\n1. Lengkapkan borang permohonan dalam aplikasi.\n\n2. Sediakan dokumen sokongan — KP, lesen perniagaan, dan penyata bank 3 bulan terkini.\n\n3. Hadiri sesi temuduga yang akan dijadualkan.\n\n4. Tunggu kelulusan dalam tempoh 14-30 hari bekerja.',
  'kadar': 'Kadar keuntungan pembiayaan TEKUN:\n\n• **Skim Tekun Niaga** — 4% setahun (kadar tetap)\n• **Skim Teman Tekun** — 0% (tiada keuntungan dikenakan)\n• **Skim Pembiayaan Mikro** — 4% setahun\n\nTiada caj tersembunyi atau penalti bayaran awal.',
  'syarat': 'Syarat kelayakan umum:\n\n• Warganegara Malaysia (Bumiputera)\n• Berumur 18-65 tahun\n• Memiliki perniagaan berdaftar SSM/PBT\n• Tiada rekod CCRIS/CTOS bermasalah\n• Menghadiri kursus keusahawanan TEKUN',
  'default': 'Terima kasih atas pertanyaan anda. Saya boleh membantu dengan:\n\n• Maklumat skim pembiayaan\n• Cara memohon pinjaman\n• Kadar keuntungan\n• Syarat kelayakan\n\nSila tanya soalan anda atau pilih topik di atas.',
};

function getBotResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('skim') || lower.includes('tersedia') || lower.includes('jenis') || lower.includes('pembiayaan')) return botResponses['skim'];
  if (lower.includes('mohon') || lower.includes('cara') || lower.includes('apply')) return botResponses['mohon'];
  if (lower.includes('kadar') || lower.includes('keuntungan') || lower.includes('interest') || lower.includes('rate')) return botResponses['kadar'];
  if (lower.includes('syarat') || lower.includes('kelayakan') || lower.includes('eligib')) return botResponses['syarat'];
  return botResponses['default'];
}

function getTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatbotScreen({ navigation }: any) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: 'Assalamualaikum! Saya TekunBot, pembantu maya TEKUN. Bagaimana saya boleh membantu anda hari ini?',
      sender: 'bot',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: text.trim(), sender: 'user', time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: getBotResponse(text), sender: 'bot', time: getTime() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, isTyping]);

  return (
    <LinearGradient
      colors={['#0A84FF', '#0A84FF', '#FFA726']}
      locations={[0, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable style={styles.backBtn} scaleTo={0.9} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={Colors.white} />
        </AnimatedPressable>
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatarWrap}>
            <View style={styles.headerAvatar}>
              <Ionicons name="chatbubble-ellipses" size={16} color={Colors.white} />
            </View>
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.headerTitle}>TekunBot</Text>
            <Text style={styles.headerStatus}>Dalam Talian</Text>
          </View>
        </View>
        <AnimatedPressable style={styles.backBtn} scaleTo={0.9}>
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.white} />
        </AnimatedPressable>
      </View>

      {/* Content - rounded like login page */}
      <View style={styles.contentWrap}>
      <ScrollView
        ref={scrollRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date badge */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateBadgeText}>Hari Ini</Text>
        </View>

        {messages.map((msg, i) => (
          <FadeInView key={msg.id} delay={i === 0 ? 200 : 0} duration={300} direction="up" distance={10}>
            <View style={[styles.msgRow, msg.sender === 'user' && styles.msgRowUser]}>
              {msg.sender === 'bot' && (
                <View style={styles.botAvatar}>
                  <Ionicons name="chatbubble-ellipses" size={12} color={Colors.white} />
                </View>
              )}
              <View style={styles.msgContent}>
                <View style={[styles.msgBubble, msg.sender === 'user' ? styles.msgBubbleUser : styles.msgBubbleBot]}>
                  <Text style={[styles.msgText, msg.sender === 'user' && styles.msgTextUser]}>{msg.text}</Text>
                </View>
                <Text style={[styles.msgTime, msg.sender === 'user' && styles.msgTimeUser]}>{msg.time}</Text>
              </View>
            </View>
          </FadeInView>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <FadeInView duration={200} direction="up" distance={5}>
            <View style={styles.msgRow}>
              <View style={styles.botAvatar}>
                <Ionicons name="chatbubble-ellipses" size={12} color={Colors.white} />
              </View>
              <View style={[styles.msgBubble, styles.msgBubbleBot, styles.typingBubble]}>
                <View style={styles.typingDots}>
                  <View style={[styles.dot, { opacity: 0.4 }]} />
                  <View style={[styles.dot, { opacity: 0.7 }]} />
                  <View style={[styles.dot, { opacity: 1 }]} />
                </View>
              </View>
            </View>
          </FadeInView>
        )}

        {/* Quick Questions (show only if few messages) */}
        {messages.length <= 2 && !isTyping && (
          <FadeInView delay={400} duration={400} direction="up" distance={10}>
            <Text style={styles.quickLabel}>Soalan Popular</Text>
            <View style={styles.quickGrid}>
              {quickQuestions.map((q, i) => (
                <AnimatedPressable key={i} style={styles.quickCard} scaleTo={0.95} onPress={() => sendMessage(q.text)}>
                  <View style={styles.quickIconWrap}>
                    <Ionicons name={q.icon} size={20} color="#0A84FF" />
                  </View>
                  <Text style={styles.quickCardText}>{q.text}</Text>
                  <Ionicons name="arrow-forward" size={14} color={Colors.textLight} />
                </AnimatedPressable>
              ))}
            </View>
          </FadeInView>
        )}
      </ScrollView>

      {/* Input Bar */}

      <View style={styles.inputBar}>
        <AnimatedPressable style={styles.attachBtn} scaleTo={0.9}>
          <Ionicons name="add-circle-outline" size={26} color={Colors.textSecondary} />
        </AnimatedPressable>
        <View style={styles.textInputWrap}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Taip mesej anda..."
            placeholderTextColor={Colors.textLight}
            onSubmitEditing={() => sendMessage(input)}
            returnKeyType="send"
            multiline
          />
        </View>
        <AnimatedPressable
          style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
          scaleTo={0.9}
          onPress={() => sendMessage(input)}
        >
          <LinearGradient
            colors={input.trim() ? ['#0A84FF', '#0A84FF'] : ['#D1D5DB', '#D1D5DB']}
            style={styles.sendBtnGradient}
          >
            <Ionicons name="send" size={18} color={Colors.white} />
          </LinearGradient>
        </AnimatedPressable>
      </View>
      </View>
    </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A84FF',
  },

  // Content wrap (rounded like login)
  contentWrap: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerAvatarWrap: {
    position: 'relative',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: '#0A84FF',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
  headerStatus: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },

  // Date badge
  dateBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 16,
  },
  dateBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  // Chat
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 14,
    gap: 8,
  },
  msgRowUser: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  msgContent: {
    maxWidth: '75%',
  },
  msgBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  msgBubbleBot: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  msgBubbleUser: {
    backgroundColor: '#0A84FF',
    borderBottomRightRadius: 4,
  },
  msgText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  msgTextUser: {
    color: Colors.white,
  },
  msgTime: {
    fontSize: 10,
    color: Colors.textLight,
    marginTop: 4,
    marginLeft: 4,
  },
  msgTimeUser: {
    textAlign: 'right',
    marginRight: 4,
    marginLeft: 0,
  },

  // Typing indicator
  typingBubble: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.textLight,
  },

  // Quick Questions
  quickLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginTop: 8,
    marginBottom: 10,
    marginLeft: 34,
  },
  quickGrid: {
    gap: 8,
    marginLeft: 34,
  },
  quickCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  quickIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickCardText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },

  // Input
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 8,
  },
  attachBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputWrap: {
    flex: 1,
    backgroundColor: '#F6F8FA',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 4,
    maxHeight: 100,
  },
  textInput: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    paddingVertical: 8,
  },
  sendBtn: {
    width: 40,
    height: 40,
  },
  sendBtnDisabled: {
    opacity: 1,
  },
  sendBtnGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
