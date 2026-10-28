import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';

/**
 * Haftalık Çalışma Planı Veri Seti (Data Array)
 * Her bir günün konusu ve süresini içeren obje dizisi.
 */
const WEEKLY_PLAN = [
  { day: 'Monday', topic: 'Kickoff Session', duration: '40 min' },
  { day: 'Tuesday', topic: 'Core Components', duration: '60 min' },
  { day: 'Wednesday', topic: 'Navigation', duration: '50 min' },
  { day: 'Thursday', topic: 'State Management', duration: '55 min' },
  { day: 'Friday', topic: 'Performance', duration: '45 min' },
];

export default function WeeklyStudyPlan() {
  return (
    // SafeAreaView: Cihaz çentik ve güvenli alan sınırlarını korur, arka plan rengi slate-900 (#0f172a)
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      {/* 
        Dış ScrollView (Dikey Kaydırma):
        - showsVerticalScrollIndicator={false}: Dikey kaydırma çubuğunu gizler
      */}
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 
          Image Bileşeni (Uzak URL'den Görsel Yükleme):
          - source={{ uri: '...' }}: Ağ üzerindeki görseller için uri objesi kullanılır.
          - DİKKAT: React Native'de uzak görsellere (network images) MUTLAKA genişlik (width) ve yükseklik (height) verilmelidir, aksi halde görünmez!
          - resizeMode="contain": Görselin en-boy oranını bozmadan belirlenen alana sığdırır.
        */}
        <Image
          source={{
            uri: 'https://commons.wikimedia.org/wiki/Special:FilePath/%C4%B0stanbul_%C3%9Cniversitesi_Logo.png',
          }}
          style={{
            width: '100%',
            height: 240,
            borderRadius: 20,
          }}
          resizeMode="contain"
        />

        {/* Başlık ve Kartlar Alanı */}
        <View style={{ paddingTop: 24, paddingBottom: 32 }}>
          {/* Ana Başlık */}
          <Text
            style={{
              fontSize: 26,
              fontWeight: '700',
              marginHorizontal: 24,
              color: '#f8fafc',
            }}
          >
            Weekly Study Plan
          </Text>

          {/* Alt Başlık / Açıklama */}
          <Text
            style={{
              fontSize: 14,
              marginHorizontal: 24,
              marginTop: 8,
              color: '#94a3b8',
            }}
          >
            Stay focused and make progress every day.
          </Text>

          {/* 
            İç ScrollView (Yatay Kart Listesi - Horizontal Scroll):
            - horizontal: Listeyi yatay kaydırılabilir yapar (varsayılan dikey).
            - showsHorizontalScrollIndicator={false}: Yatay kaydırma çubuğunu gizler.
            - contentContainerStyle: ScrollView'ın içindeki elemanları saran konteynerın stilidir.
              (İç boşluk paddingHorizontal ve kartlar arası gap burada tanımlanır).
          */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingTop: 20,
              gap: 16,
            }}
          >
            {/* WEEKLY_PLAN dizisini map() ile dinamik kart bileşenlerine dönüştürme */}
            {WEEKLY_PLAN.map((item) => (
              <View
                key={item.day} // React için her elemana benzersiz key zorunludur
                style={{
                  width: 220, // Sabit kart genişliği (Yatay kaydırma için)
                  padding: 20,
                  borderRadius: 20,
                  backgroundColor: '#1f2937', // Koyu kart arka planı
                  gap: 10, // Kart içi elemanlar arası boşluk
                }}
              >
                {/* Gün Bilgisi */}
                <Text style={{ color: '#cbd5f5', fontSize: 16 }}>
                  {item.day}
                </Text>

                {/* Konu Başlığı */}
                <Text
                  style={{
                    color: '#f1f5f9',
                    fontWeight: '600',
                    fontSize: 20,
                  }}
                >
                  {item.topic}
                </Text>

                {/* Süre Bilgisi */}
                <Text style={{ color: '#94a3b8' }}>
                  {item.duration}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
