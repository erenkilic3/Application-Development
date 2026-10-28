import { useState } from 'react';
import { FlatList, SafeAreaView, Switch, Text, View } from 'react-native';

/**
 * Sabit Modül Veri Seti (Data Array)
 * Her bir ders modülünün id, başlık (title) ve dakika cinsinden süre (duration) bilgilerini tutar.
 */
const MODULES = [
  { id: '1', title: 'Introduction & Setup', duration: 12 },
  { id: '2', title: 'Core Components', duration: 18 },
  { id: '3', title: 'State & Props', duration: 22 },
  { id: '4', title: 'Navigation', duration: 15 },
];

export default function CourseModules() {
  /**
   * State (Durum) Tanımı:
   * - completed: Her modülün tamamlanma (açık/kapalı) durumunu id bazlı tutan nesne (örn: { '1': true, '2': false }).
   */
  const [completed, setCompleted] = useState({});

  /**
   * Switch Değişim Fonksiyonu (Toggle Handler):
   * - Switch yeni boolean değeri (true/false) `value` parametresiyle döner.
   * - prev objesini kopyalar (...prev) ve sadece tıklanan id'nin durumunu günceller.
   */
  const toggleModule = (id, value) => {
    setCompleted((prev) => ({ ...prev, [id]: value }));
  };

  return (
    // SafeAreaView: Çentik ve durum çubuğu sınırlarını korur
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ padding: 24, gap: 16, flex: 1 }}>
        {/* Başlık */}
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#0f172a' }}>
          Course Modules
        </Text>

        {/**
         * FlatList Bileşeni:
         * - data: Listelenecek veri dizisi (MODULES).
         * - keyExtractor: Her eleman için benzersiz anahtar string'i belirler.
         * - ItemSeparatorComponent: Kartlar arasına 12 birim boşluk ekler.
         * - contentContainerStyle: Listenin en altından kaydırma payı (paddingBottom) bırakır.
         */}
        <FlatList
          data={MODULES}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            // Modülün tamamlanıp tamamlanmadığını kontrol eder (undefined veya boolean)
            const done = !!completed[item.id];

            return (
              <View
                style={{
                  padding: 18,
                  borderRadius: 16,
                  borderWidth: 1,
                  // Tamamlandıysa yeşil kenarlık ve açık yeşil arka plan, değilse beyaz
                  borderColor: done ? '#22c55e' : '#e2e8f0',
                  backgroundColor: done ? '#dcfce7' : '#fff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* Modül Başlığı ve Süresi */}
                <View style={{ gap: 4 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: '#475569' }}>
                    Duration: {item.duration} min
                  </Text>
                </View>

                {/**
                 * Switch (Açma/Kapama Düğmesi) Bileşeni:
                 * - value: Geçerli açık/kapalı durumu (boolean).
                 * - onValueChange: Kullanıcı düğmeyi kaydırdığında yeni boolean değerle tetiklenir.
                 */}
                <Switch
                  value={done}
                  onValueChange={(value) => toggleModule(item.id, value)}
                />
              </View>
            );
          }}
          /**
           * ListFooterComponent (Sınavda Sıkça Çıkar):
           * - FlatList'in en altına bir alt bilgi (footer) ekler.
           * - Listenin içeriğiyle birlikte kayar (scroll eder).
           * - Burada tamamlanan modül sayısı dinamik hesaplanıp gösterilmektedir.
           */
          ListFooterComponent={() => {
            const total = MODULES.length;
            // Object.values(completed) içindeki true olan değerleri filtreleyip sayısını alır
            const doneCount = Object.values(completed).filter(Boolean).length;

            return (
              <Text style={{ marginTop: 16, textAlign: 'center', color: '#1f2937', fontWeight: '500' }}>
                Completed: {doneCount} / {total}
              </Text>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
