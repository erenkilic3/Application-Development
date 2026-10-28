import { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

/**
 * Oturumlar Veri Seti (Data Array)
 * Her oturum bir id, başlık (title) ve ait olduğu parkur (track: 'foundation' | 'growth' | 'advanced') bilgisine sahiptir.
 */
const SESSIONS = [
  { id: '1', title: 'Intro to View', track: 'foundation' },
  { id: '2', title: 'Layout Playground', track: 'foundation' },
  { id: '3', title: 'State Drill', track: 'growth' },
  { id: '4', title: 'FlatList Patterns', track: 'growth' },
  { id: '5', title: 'Perf Budgeting', track: 'advanced' },
];

export default function ScheduleFilter() {
  /**
   * State (Durum) Tanımı:
   * - track: Seçili olan eğitim parkurunu tutar (varsayılan: 'foundation').
   */
  const [track, setTrack] = useState('foundation');

  /**
   * useMemo Kancası (Sınav için ÇOK ÖNEMLİ):
   * - Amacı: Gereksiz ve maliyetli hesaplamaların her render'da yeniden çalışmasını önlemek (Memorization / Önbellekleme).
   * - Sadece bağımlılık dizisindeki [track] değeri değiştiğinde filtreleme fonksiyonunu yeniden çalıştırır.
   * - Bileşendeki diğer alakasız state değişikliklerinde önbellekteki sonucu döner, performansı korur.
   */
  const filtered = useMemo(
    () => SESSIONS.filter((session) => session.track === track),
    [track] // Bağımlılık dizisi (Dependency array)
  );

  return (
    // SafeAreaView: Çentik alanını korur ve koyu arka plan uygular (#020617)
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617', padding: 24 }}>
      
      {/**
       * Picker (Açılır Liste / Dropdown Menü) Konteyneri:
       * - @react-native-picker/picker kütüphanesinden gelir.
       * - selectedValue: Seçili olan değeri state'ten alır.
       * - onValueChange: Kullanıcı listeden yeni bir seçim yaptığında state'i günceller.
       * - mode="dropdown": Android'de açılır menü şeklinde görüntülenmesini sağlar (alternatifi 'dialog').
       * - dropdownIconColor: Açılır liste okunun rengini belirler.
       */}
      <View
        style={{
          backgroundColor: '#1e293b',
          borderRadius: 14,
          paddingHorizontal: 12,
        }}
      >
        <Picker
          selectedValue={track}
          onValueChange={(value) => setTrack(value)}
          mode="dropdown"
          dropdownIconColor="#f97316"
        >
          <Picker.Item label="Foundation Track" value="foundation" />
          <Picker.Item label="Growth Track" value="growth" />
          <Picker.Item label="Advanced Track" value="advanced" />
        </Picker>
      </View>

      {/**
       * FlatList Bileşeni:
       * - data={filtered}: useMemo ile filtrelenen güncel diziyi alır.
       * - keyExtractor: Benzersiz session id'sini kullanır.
       * - ListEmptyComponent (Önemli Sınav Özelliği):
       *   Eğer filtrelenen listede hiç eleman kalmazsa (data = []), ekranda boşluk yerine
       *   buraya verilen bileşeni / mesajı gösterir.
       */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, marginTop: 24 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: '#0f172a',
              padding: 18,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#1f2937',
            }}
          >
            {/* Oturum Başlığı */}
            <Text style={{ color: '#e2e8f0', fontSize: 16, fontWeight: '600' }}>
              {item.title}
            </Text>

            {/* İç İçe Ternary Operatörü ile Dinamik Seviye Etiketi */}
            <Text style={{ color: '#94a3b8', marginTop: 4 }}>
              {track === 'foundation' ? 'Temel' : track === 'growth' ? 'Orta' : 'İleri'} seviye
            </Text>
          </View>
        )}
        // Liste boş olduğunda gösterilecek bileşen
        ListEmptyComponent={
          <Text style={{ color: '#94a3b8', textAlign: 'center', marginTop: 32 }}>
            Bu track için oturum planlanmadı.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
