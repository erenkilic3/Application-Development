import { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';

/**
 * SumCalculator Bileşeni
 * İki sayının kullanıcıdan alınıp toplanmasını ve sonucun dinamik olarak ekranda gösterilmesini sağlar.
 * TextInput (form girdileri), klavye türleri, kontrollü bileşenler ve tip dönüşümü konularını içerir.
 */
export default function SumCalculator() {
  /**
   * State (Durum) Tanımları:
   * - first, second: TextInput bileşenleri her zaman string (metin) değer döner; bu yüzden ilk değerler boş metindir ('').
   * - result: Hesaplama sonucunu saklar. Henüz hesaplama yapılmadıysa null olur.
   */
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [result, setResult] = useState(null);

  /**
   * Toplama Fonksiyonu (Hesaplama Mantığı):
   * - TextInput'tan gelen değerler string olduğu için Number() ile sayıya dönüştürülür.
   * - Number.isFinite(): Toplamın geçerli ve sonlu bir sayı (NaN veya Infinity olmama) olup olmadığını doğrular.
   * - Geçerli ise state'e sayı atanır, geçersizse null atanarak uyarı gösterilir.
   */
  const handleSum = () => {
    const total = Number(first) + Number(second);
    setResult(Number.isFinite(total) ? total : null);
  };

  return (
    // SafeAreaView: Cihaz çentik ve alt navigasyon çubuğu alanlarını güvene alır
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center', // İçeriği ekranda dikey olarak ortalar
          padding: 24,
          gap: 16,
        }}
      >
        {/* Başlık */}
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#0f172a' }}>
          Add two numbers
        </Text>

        {/**
         * Form Kartı (Card Container):
         * - iOS için gölge: shadowColor, shadowOpacity, shadowRadius
         * - Android için gölge: elevation (Sınavda sorulabilir: Android gölgeleri elevation ile yönetilir)
         */}
        <View
          style={{
            borderRadius: 16,
            backgroundColor: '#fff',
            padding: 20,
            gap: 16,
            // iOS Gölgelendirme
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 12,
            // Android Gölgelendirme
            elevation: 2,
          }}
        >
          {/**
           * 1. Sayı Girdisi (Controlled TextInput):
           * - placeholder: Kutucuk boşken görünen ipucu metni
           * - keyboardType="numeric": Kullanıcı dokunduğunda sayısal klavyeyi açar
           * - value={first}: Kontrollü bileşen kuralı gereği değeri state'ten alır
           * - onChangeText={setFirst}: Her harf/rakam yazıldığında state'i doğrudan günceller
           */}
          <TextInput
            placeholder="First number"
            keyboardType="numeric"
            value={first}
            onChangeText={setFirst}
            style={{
              borderWidth: 1,
              borderColor: '#d4d4d8',
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          />

          {/* 2. Sayı Girdisi */}
          <TextInput
            placeholder="Second number"
            keyboardType="numeric"
            value={second}
            onChangeText={setSecond}
            style={{
              borderWidth: 1,
              borderColor: '#d4d4d8',
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          />

          {/**
           * React Native Standart Butonu:
           * - title: Buton üzerinde yazacak metin (Zorunludur)
           * - onPress: Tıklama olduğunda çalışacak fonksiyon referansı
           */}
          <Button title="Calculate sum" onPress={handleSum} />

          {/* Sonuç Alanı */}
          <View>
            <Text style={{ color: '#475569' }}>Result:</Text>
            {/* Ternary operatörü ile koşullu sonuç gösterimi */}
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#2563eb' }}>
              {result === null ? 'Enter two valid numbers' : result}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
