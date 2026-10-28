import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Pressable,
} from 'react-native';

/**
 * Başlangıç Öğrenci Verisi (Initial State Data)
 * Her öğrenci: id, name, gender (Male/Female) ve status ('on'/'off') bilgilerini içerir.
 */
const INITIAL_STUDENTS = [
  { id: '1', name: 'Eren', gender: 'Male', status: 'on' },
  { id: '2', name: 'Rasid', gender: 'Female', status: 'off' },
];

export default function StudentList() {
  /**
   * State (Durum) Tanımları:
   * 1. students: Öğrencilerin listesini ve dinamik güncellemelerini tutar.
   * 2. selectedStudentId: Hangi öğrencinin seçildiğini (id bazlı) tutar; başlangıçta null.
   */
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  /**
   * Öğrencinin on/off durumunu değiştiren fonksiyon:
   * - İmmutability (Değişmezlik) Kuralı: State doğrudan mutasyona uğratılmaz.
   * - prevList.map() kullanılarak yeni bir dizi referansı üretilir.
   * - Yalnızca tıklanan id ile eşleşen objenin status alanı tersine çevrilir ('on' <-> 'off').
   */
  const toggleStudentStatus = (id) => {
    setStudents((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'on' ? 'off' : 'on' }
          : item
      )
    );
  };

  /**
   * Türetilmiş State (Derived State):
   * Seçili öğrencinin güncel verisini ayrı bir state'te tutmak yerine,
   * ana listeden anlık olarak find() ile çekmek state senkronizasyon hatalarını önler.
   */
  const selectedStudent = students.find(
    (item) => item.id === selectedStudentId
  );

  return (
    // SafeAreaView: Çentik ve sistem çubuklarına taşmayı önler
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#f8fafc',
      }}
    >
      <View style={{ padding: 24, flex: 1 }}>
        {/* Sayfa Başlığı */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: 16,
          }}
        >
          Course Students
        </Text>

        {/**
         * FlatList Bileşeni (Sınav için ÇOK ÖNEMLİ):
         * - data: Listelenecek veri dizisi.
         * - keyExtractor: Her bir eleman için benzersiz anahtar belirler (React render optimizasyonu).
         * - ItemSeparatorComponent: Öğeler arasına ayırıcı boşluk veya çizgi koyar (Listenin en başına ve sonuna eklemez!).
         * - renderItem: Her bir öğenin nasıl çizileceğini belirleyen fonksiyon ({ item, index }).
         */}
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => {
            // Öğrencinin seçili olup olmadığı ve aktif durumu
            const isSelected = selectedStudentId === item.id;
            const isOn = item.status === 'on';

            return (
              /**
               * Dış Kart (Tıklanabilir Pressable):
               * Tıklandığında o öğrenciyi seçer (setSelectedStudentId).
               * isSelected durumuna göre kenarlık ve arka plan rengi koşullu değişir.
               */
              <Pressable
                onPress={() => setSelectedStudentId(item.id)}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: isSelected ? '#22c55e' : '#e2e8f0', // Seçiliyse yeşil kenarlık
                  backgroundColor: isSelected ? '#dcfce7' : '#ffffff', // Seçiliyse açık yeşil zemin
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {/* Öğrenci Bilgileri Alanı */}
                <View>
                  {/* Cinsiyete Göre Koşullu Metin Rengi: Male -> Mavi, Female -> Pembe */}
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color:
                        item.gender === 'Male' ? '#2563eb' : '#ec4899',
                    }}
                  >
                    {item.name}
                  </Text>

                  <Text style={{ color: '#475569', marginTop: 4 }}>
                    Gender: {item.gender}
                  </Text>
                </View>

                {/**
                 * Durumu On / Off Yapan İç Buton:
                 * - Tıklanıldığında toggleStudentStatus tetiklenir.
                 * - isOn durumuna göre yeşil (#16a34a) veya kırmızı (#dc2626) renk alır.
                 */}
                <Pressable
                  onPress={() => toggleStudentStatus(item.id)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 14,
                    borderRadius: 10,
                    backgroundColor: isOn ? '#16a34a' : '#dc2626',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#ffffff',
                      fontSize: 13,
                    }}
                  >
                    {item.status.toUpperCase()}
                  </Text>
                </Pressable>
              </Pressable>
            );
          }}
        />

        {/**
         * Koşullu Render (Conditional Rendering):
         * selectedStudent mevcutsa (null değilse) alttaki detay kartını gösterir.
         */}
        {selectedStudent && (
          <View
            style={{
              marginTop: 20,
              padding: 18,
              borderRadius: 16,
              backgroundColor: '#e2e8f0',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 6 }}>
              Selected Student
            </Text>

            <Text>ID: {selectedStudent.id}</Text>

            <Text
              style={{
                color:
                  selectedStudent.gender === 'Male'
                    ? '#2563eb'
                    : '#ec4899',
              }}
            >
              Name: {selectedStudent.name}
            </Text>

            <Text>Gender: {selectedStudent.gender}</Text>

            <Text
              style={{
                fontWeight: '700',
                color:
                  selectedStudent.status === 'on'
                    ? '#16a34a'
                    : '#dc2626',
                marginTop: 4,
              }}
            >
              Status: {selectedStudent.status.toUpperCase()}
            </Text>

            {/* Detay kutusu üzerinden de durumu açıp kapatmaya yarayan buton */}
            <Pressable
              onPress={() => toggleStudentStatus(selectedStudent.id)}
              style={{
                marginTop: 12,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor:
                  selectedStudent.status === 'on' ? '#dc2626' : '#16a34a',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#ffffff', fontWeight: '700' }}>
                Durumu {selectedStudent.status === 'on' ? 'OFF' : 'ON'} Yap
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
