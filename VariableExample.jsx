import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * VariableExample Bileşeni
 * JavaScript (ES6) değişken tanımlama temelleri (const & let),
 * React Native StyleSheet kullanımı ve JSX içinde veri bağlama (data binding) örneklerini içerir.
 */
export default function VariableExample() {
  /**
   * 1. const (Sabit Değişken Tanımlama):
   * - const ile tanımlanan değişkenlerin referansı/değeri sonradan YENİDEN ATANAMAZ (reassign edilemez).
   * - Değişmeyeceğinden emin olunan uygulama adı, API URL'i veya versiyon gibi değerler için kullanılır.
   */
  const appName = "React Native Application";
  const version = "1.0.0";
  // appName = "Yeni İsim"; // HATA VERİR: TypeError: Assignment to constant variable.
  
  /**
   * 2. let (Değiştirilebilir Değişken Tanımlama):
   * - Blok kapsamlıdır (block scope).
   * - Değeri sonradan güncellenecek veya yeniden atanacak değişkenler için tanımlanır.
   */
  let userCount = 0;
  let isOnline = true;
  
  /**
   * Değişkenlerin Değerini Güncelleme:
   * - let ile tanımlandıkları için yeniden değer atanabilir.
   */
  userCount = userCount + 1; // userCount artık 1
  isOnline = false;          // isOnline artık false

  /**
   * SINAV İÇİN KRİTİK REACT NOTU:
   * Fonksiyonel bileşenin gövdesinde tanımlanan normal 'let' değişkenleri:
   * 1. Değerleri değiştiğinde bileşeni YENİDEN RENDER ETTİRMEZ! (Bunun için useState gerekir).
   * 2. Bileşen her render edildiğinde bu satırlar baştan çalışır ve değişkenler sıfırlanır.
   */
  
  return (
    // StyleSheet objesinden stil tanımları stillere aktarılır
    <View style={styles.container}>
      <Text style={styles.title}>Variable Example</Text>
      
      {/* 1. Kutu: const ile tanımlı appName */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>App Name:</Text>
        <Text style={styles.value}>{appName}</Text>
      </View>
      
      {/* 2. Kutu: const ile tanımlı version */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Version:</Text>
        <Text style={styles.value}>{version}</Text>
      </View>
      
      {/* 3. Kutu: let ile güncellenmiş userCount */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>User Count:</Text>
        <Text style={styles.value}>{userCount}</Text>
      </View>
      
      {/* 
        4. Kutu: Boolean Değeri JSX'te Gösterme (SINAV TUZAĞI):
        - React JSX içinde doğrudan {isOnline} yazarsanız ekranda HİÇBİR ŞEY görünmez!
        - Çünkü React JSX, boolean (true/false), null ve undefined değerleri ekrana basmaz (ignore eder).
        - Bu nedenle ekranda metin olarak göstermek için ternary operatörü kullanılır: {isOnline ? 'Yes' : 'No'}
      */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Online:</Text>
        <Text style={styles.value}>{isOnline ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );
}

/**
 * StyleSheet.create (React Native Stil Yönetimi):
 * Neden Inline Style yerine StyleSheet kullanılır? (Sınavda sorulabilir):
 * 1. Performans: StyleSheet stilleri köprüden (bridge) ID olarak geçirir ve her render'da yeni stil objesi üretmez.
 * 2. Doğrulama (Validation): Yazım hatalarını derleme/çalışma anında erken yakalar.
 * 3. Temiz Kod (Clean Code): Mantık (logic) ve tasarım (style) katmanını birbirinden ayırır.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Dikeyde dikey eksende ortalama
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4, // Sol kenarlık kalınlığı
    borderLeftColor: '#007AFF', // Sol kenarlık rengi (Mavi vurgu çizgisi)
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
