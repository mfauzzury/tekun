import { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import FadeInView from '../components/FadeInView';
import AnimatedPressable from '../components/AnimatedPressable';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
};

const quickQuestions = [
  'Apakah skim pembiayaan yang tersedia?',
  'Bagaimana cara mohon pinjaman?',
  'Berapakah kadar keuntungan?',
  'Apakah syarat kelayakan?',
];

const botResponses: Record<string, string> = {
  'skim': 'TEKUN menawarkan beberapa skim pembiayaan:\n\n1. **Skim Tekun Niaga** — Sehingga RM 100,000 untuk perniagaan sedia ada.\n\n2. **Skim Teman Tekun** — Sehingga RM 10,000 untuk usahawan kecil dan mikro.\n\n3. **Skim Pembiayaan Mikro** — Sehingga RM 50,000 untuk PKS.\n\nSemua skim ini terbuka kepada usahawan Bumiputera yang berdaftar.',
  'mohon': 'Untuk memohon pembiayaan TEKUN:\n\n1. Lengkapkan borang permohonan dalam aplikasi (tekan "Mohon Pembiayaan" di halaman utama).\n\n2. Sediakan dokumen sokongan — KP, lesen perniagaan, dan penyata bank 3 bulan terkini.\n\n3. Hadiri sesi temuduga yang akan dijadualkan.\n\n4. Tunggu kelulusan dalam tempoh 14-30 hari bekerja.\n\nBoleh saya bantu anda memulakan permohonan?',
  'kadar': 'Kadar keuntungan pembiayaan TEKUN:\n\n• **Skim Tekun Niaga** — 4% setahun (kadar tetap)\n• **Skim Teman Tekun** — 0% (tiada keuntungan dikenakan)\n• **Skim Pembiayaan Mikro** — 4% setahun\n\nTiada caj tersembunyi atau penalti bayaran awal. Ansuran bulanan tetap sepanjang tempoh pembiayaan.',
  'syarat': 'Syarat kelayakan umum pembiayaan TEKUN:\n\n• Warganegara Malaysia (Bumiputera)\n• Berumur 18-65 tahun\n• Memiliki perniagaan yang berdaftar dengan SSM/PBT\n• Tiada rekod CCRIS/CTOS yang bermasalah\n• Menghadiri kursus keusahawanan TEKUN (jika pemohon baru)\n\nDokumen diperlukan: Salinan KP, lesen perniagaan, penyata bank 3 bulan, dan gambar premis perniagaan.',
  'default': 'Terima kasih atas pertanyaan anda. Saya boleh membantu dengan:\n\n• Maklumat skim pembiayaan\n• Cara memohon pinjaman\n• Kadar keuntungan\n• Syarat kelayakan\n• Status permohonan\n\nSila tanya soalan anda atau pilih salah satu topik di atas.',
};

function getBotResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('skim') || lower.includes('tersedia') || lower.includes('jenis')) return botResponses['skim'];
  if (lower.includes('mohon') || lower.includes('cara') || lower.includes('apply')) return botResponses['mohon'];
  if (lower.includes('kadar') || lower.includes('keuntungan') || lower.includes('interest') || lower.includes('rate')) return botResponses['kadar'];
  if (lower.includes('syarat') || lower.includes('kelayakan') || lower.includes('eligib')) return botResponses['syarat'];
  return botResponses['default'];
}

export default function ChatbotScreen({ navigation }: any) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: 'Assalamualaikum! 👋 Saya TekunBot, pembantu maya TEKUN. Bagaimana saya boleh membantu anda hari ini?',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: text.trim(), sender: 'user' };
    const botMsg: Message = { id: (Date.now() + 1).toString(), text: getBotResponse(text), sender: 'bot' };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <AnimatedPressable style={styles.backBtn} scaleTo={0.9} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </AnimatedPressable>
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}>
            <Ionicons name="chatbubble-ellipses" size={18} color={Colors.white} />
          </View>
          <View>
            <Text style={styles.headerTitle}>TekunBot</Text>
            <Text style={styles.headerStatus}>Dalam Talian</Text>
          </View>
        </View>
        <View style={{ width: 44 }} />
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, i) => (
          <FadeInView key={msg.id} delay={i === 0 ? 200 : 0} duration={300} direction="up" distance={10}>
            <View style={[styles.msgRow, msg.sender === 'user' && styles.msgRowUser]}>
              {msg.sender === 'bot' && (
                <View style={styles.botAvatar}>
                  <Ionicons name="chatbubble-ellipses" size={14} color={Colors.white} />
                </View>
              )}
              <View style={[styles.msgBubble, msg.sender === 'user' ? styles.msgBubbleUser : styles.msgBubbleBot]}>
                <Text style={[styles.msgText, msg.sender === 'user' && styles.msgTextUser]}>{msg.text}</Text>
              </View>
            </View>
          </FadeInView>
        ))}

        {/* Quick Questions (show only if few messages) */}
        {messages.length <= 2 && (
          <FadeInView delay={400} duration={400} direction="up" distance={10}>
            <Text style={styles.quickLabel}>Soalan Popular</Text>
            <View style={styles.quickRow}>
              {quickQuestions.map((q, i) => (
                <AnimatedPressable key={i} style={styles.quickChip} scaleTo={0.95} onPress={() => sendMessage(q)}>
                  <Text style={styles.quickChipText}>{q}</Text>
                </AnimatedPressable>
              ))}
            </View>
          </FadeInView>
        )}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Taip mesej anda..."
          placeholderTextColor={Colors.textLight}
          onSubmitEditing={() => sendMessage(input)}
          returnKeyType="send"
        />
        <AnimatedPressable
          style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
          scaleTo={0.9}
          onPress={() => sendMessage(input)}
        >
          <Ionicons name="send" size={20} color={Colors.white} />
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  headerStatus: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.accent,
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
    marginBottom: 12,
    gap: 8,
  },
  msgRowUser: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  msgBubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  msgBubbleBot: {
    backgroundColor: Colors.background,
    borderBottomLeftRadius: 4,
  },
  msgBubbleUser: {
    backgroundColor: Colors.primary,
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

  // Quick Questions
  quickLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginTop: 8,
    marginBottom: 10,
    marginLeft: 36,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginLeft: 36,
  },
  quickChip: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
  },
  quickChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },

  // Input
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
});
