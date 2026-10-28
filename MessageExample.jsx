import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Message (Alt / Çocuk - Child) Bileşeni:
 * - Props (Properties - Özellikler) Alımı:
 *   Üst bileşenden (Parent) gelen verileri parametre olarak alır.
 * - Props Destructuring (Nesne Parçalama):
 *   `props.title`, `props.message` yazmak yerine doğrudan `{ title, message, color }` şeklinde karşılanır.
 * - Sınav Notu: Props'lar "Salt Okunur"dur (Read-Only). Alt bileşen kendisine gelen prop'u değiştiremez!
 */
function Message({ title, message, color }) {
  return (
    <View style={styles.container}>
      {/**
       * Stil Dizisi (Style Array) Kullanımı (Sınavda Çok Sorulur):
       * - Sabit bir stil ile dinamik bir inline stili birleştirmek için dizi formatı kullanılır:
       *   `style={[styles.title, { color }]}`
       * - Dizide sağdaki stiller, soldaki aynı adlı stilleri ezer (override eder).
       */}
      <Text style={[styles.title, { color }]}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

/**
 * MessageExample (Üst / Ebeveyn - Parent) Bileşeni:
 * - Tekrar kullanılabilir (reusable) `Message` bileşenine farklı prop değerleri aktarır.
 * - Tek yönlü veri akışını (One-way data flow) temsil eder (Parent -> Child).
 */
export default function MessageExample() {
  return (
    <View style={styles.app}>
      {/* 1. Mavi Bilgi Mesajı */}
      <Message 
        title="Welcome" 
        message="You are learning React Native!" 
        color="#007AFF"
      />
      
      {/* 2. Yeşil Başarı Mesajı */}
      <Message 
        title="Success" 
        message="You learned props usage!" 
        color="#28A745"
      />
      
      {/* 3. Sarı Uyarı Mesajı */}
      <Message 
        title="Warning" 
        message="Props are read-only!" 
        color="#FFC107"
      />
    </View>
  );
}

/**
 * StyleSheet Tanımları
 */
const styles = StyleSheet.create({
  app: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Dikeyde ortalama
    backgroundColor: '#ffffff',
  },
  container: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#cbd5e1',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
});
