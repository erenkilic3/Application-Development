import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * SimpleCounter (Basit Sayaç) Bileşeni
 * React'in en temel ve en önemli kancası olan `useState` hook'unun çalışma mantığını,
 * durum güncellemelerini (state updates) ve yeniden render (re-render) döngüsünü öğretir.
 */
export default function SimpleCounter() {
  /**
   * useState Kancası (Hook):
   * - count: O anki sayaç değerini tutan durum değişkeni (başlangıç değeri: 0).
   * - setCount: count değerini değiştirmeye yarayan özel güncelleme fonksiyonu.
   * 
   * SINAV KURALI:
   * React'te `count = count + 1` şeklinde doğrudan atama YAPILAMAZ!
   * Ekranın güncellenmesi ve React'in bileşeni yeniden çizmesi (re-render) için
   * mutlaka setCount fonksiyonu çağrılmalıdır.
   */
  const [count, setCount] = useState(0);

  /**
   * Sayacı 1 Artıran Fonksiyon:
   * Alternatif/Daha Güvenli Yazım (Functional Update):
   * setCount((prevCount) => prevCount + 1);
   */
  const increment = () => {
    setCount(count + 1);
  };

  /**
   * Sayacı 1 Azaltan Fonksiyon:
   * setCount((prevCount) => prevCount - 1);
   */
  const decrement = () => {
    setCount(count - 1);
  };

  /**
   * Sayacı Sıfırlayan Fonksiyon:
   * Durumu doğrudan başlangıç değeri olan 0'a eşitler.
   */
  const reset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      {/* Başlık */}
      <Text style={styles.title}>Simple Counter</Text>
      
      {/* Dinamik Sayaç Değeri (State her değiştiğinde bu Text yeniden render olur) */}
      <Text style={styles.countText}>{count}</Text>
      
      {/* 
        Artırma ve Azaltma Butonları Kapsayıcısı:
        - flexDirection: 'row' ile butonlar yan yana hizalanır (varsayılan 'column' dikey hizadır).
      */}
      <View style={styles.buttonContainer}>
        {/* Azaltma Butonu (-) */}
        <TouchableOpacity style={styles.button} onPress={decrement} activeOpacity={0.7}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        {/* Artırma Butonu (+) */}
        <TouchableOpacity style={styles.button} onPress={increment} activeOpacity={0.7}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Sıfırlama Butonu (Reset) */}
      <TouchableOpacity style={styles.resetButton} onPress={reset} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * StyleSheet Tanımları
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Dikey eksende ortalama
    alignItems: 'center',     // Yatay eksende ortalama
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#007AFF', // Vurgulu mavi sayaç rakamı
  },
  buttonContainer: {
    flexDirection: 'row', // Çocuk elemanları yatayda yan yana dizer
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 50, // Yuvarlak (dairesel) buton görünümü sağlar
    margin: 10,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#DC3545', // Kırmızı sıfırlama butonu
    padding: 15,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
