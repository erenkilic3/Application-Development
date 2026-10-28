import { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import Checkbox from 'expo-checkbox';

/**
 * Sabit Veri Listeleri (Data Arrays)
 * Uygulama içerisinde listelenecek statik veriler id ve label ikilileriyle tanımlanır.
 */

// 1. Hobiler Listesi (Çoklu seçim / Checkbox örneği)
const TASKS = [
  { id: 'slides', label: 'Fishing' },
  { id: 'demo', label: 'Movies' },
  { id: 'prep', label: 'Reading book' },
];

// 2. Üniversite Bölümleri Listesi (Çoklu seçim / Checkbox örneği)
const bolumler = [
  { id: 'ybs', label: 'Yönetim Bilişim Sistemleri' },
  { id: 'ik', label: 'İktisat' },
  { id: 'is', label: 'İşletme' },
];

// 3. Fakülteler Listesi (Tekli seçim / Radio Button örneği)
const fakulteler = [
  { id: 'iktisat', label: 'İktisat Fakültesi' },
  { id: 'isletme', label: 'İşletme Fakültesi' },
  { id: 'muhendislik', label: 'Mühendislik Fakültesi' },
];

export default function LessonChecklist() {
  /**
   * State (Durum) Yönetimi
   */

  // Hobiler için işaretlenen öğelerin durumunu tutan nesne (örn: { slides: true, demo: false })
  const [completed, setCompleted] = useState({});

  // Seçilen bölümleri tutan nesne (örn: { ybs: true, ik: false })
  const [selectedBolumler, setSelectedBolumler] = useState({});

  // Tekli seçim (Radio Button) mantığı: Yalnızca tek bir fakültenin id'sini string veya null olarak saklar
  const [selectedFakulte, setSelectedFakulte] = useState(null);

  /**
   * Yardımcı Fonksiyonlar (Event Handlers)
   */

  // Hobi checkbox durumu değiştiğinde önceki state'i koruyup ilgili task'ı günceller
  const toggleTask = (taskId, value) => {
    setCompleted((prev) => ({
      ...prev,
      [taskId]: value,
    }));
  };

  // Bölüm checkbox durumu değiştiğinde ilgili bölümü günceller
  const toggleBolum = (bolumId, value) => {
    setSelectedBolumler((prev) => ({
      ...prev,
      [bolumId]: value,
    }));
  };

  return (
    // SafeAreaView: Cihazın çentik ve alt navigasyon barı gibi alanlarını hesaba katar
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
        
        {/* ======================= BÖLÜM 1: HOBİLER (CHECKBOX) ======================= */}
        <Text style={{ color: '#e2e8f0', fontSize: 22, fontWeight: '700' }}>
          Hobbies
        </Text>

        {TASKS.map((task) => (
          <View
            key={task.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingVertical: 8,
            }}
          >
            {/* expo-checkbox bileşeni */}
            <Checkbox
              value={!!completed[task.id]} // Değer boolean formatına zorlanır
              onValueChange={(value) => toggleTask(task.id, value)}
              color={completed[task.id] ? '#22c55e' : undefined} // Seçildiğinde yeşil renk
              style={{ width: 22, height: 22 }}
            />

            {/* Seçildiğinde üzeri çizili (line-through) metin stili */}
            <Text
              style={{
                color: '#e2e8f0',
                textDecorationLine: completed[task.id]
                  ? 'line-through'
                  : 'none',
              }}
            >
              {task.label}
            </Text>
          </View>
        ))}

        {/* ======================= BÖLÜM 2: BÖLÜMLER (CHECKBOX) ======================= */}
        <Text
          style={{
            color: '#e2e8f0',
            fontSize: 22,
            fontWeight: '700',
            marginTop: 16,
          }}
        >
          Bölümler
        </Text>

        {bolumler.map((bolum) => (
          <View
            key={bolum.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingVertical: 8,
            }}
          >
            <Checkbox
              value={!!selectedBolumler[bolum.id]}
              onValueChange={(value) => toggleBolum(bolum.id, value)}
              color={selectedBolumler[bolum.id] ? '#38bdf8' : undefined} // Seçildiğinde mavi renk
              style={{ width: 22, height: 22 }}
            />

            <Text
              style={{
                color: '#e2e8f0',
                textDecorationLine: selectedBolumler[bolum.id]
                  ? 'line-through'
                  : 'none',
              }}
            >
              {bolum.label}
            </Text>
          </View>
        ))}

        {/* ======================= BÖLÜM 3: FAKÜLTELER (RADIO BUTTON) ======================= */}
        <Text
          style={{
            color: '#e2e8f0',
            fontSize: 22,
            fontWeight: '700',
            marginTop: 16,
          }}
        >
          Fakülte
        </Text>

        {fakulteler.map((fakulte) => (
          // Pressable: Tıklanabilir alan oluşturur (Radio Button davranışı için)
          <Pressable
            key={fakulte.id}
            onPress={() => setSelectedFakulte(fakulte.id)} // Tıklandığında yalnızca o fakülte seçilir
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingVertical: 8,
            }}
          >
            {/* Özel Dış Halka (Radio Button Çerçevesi) */}
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2,
                borderColor:
                  selectedFakulte === fakulte.id ? '#38bdf8' : '#94a3b8',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Seçili ise gösterilen iç nokta */}
              {selectedFakulte === fakulte.id && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#38bdf8',
                  }}
                />
              )}
            </View>

            <Text style={{ color: '#e2e8f0' }}>
              {fakulte.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
