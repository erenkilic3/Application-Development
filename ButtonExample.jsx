import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * CustomButton (Özelleştirilebilir Buton) Bileşeni:
 * - Default Props (Varsayılan Prop Değerleri - Sınavda Çıkar):
 *   color = '#007AFF' ve disabled = false tanımları, üst bileşenden bu değerler
 *   gönderilmediğinde (undefined olduğunda) devreye giren varsayılan değerlerdir.
 * - TouchableOpacity: Dokunulduğunda saydamlaşarak (opacity düşürerek) kullanıcıya dokunma geribildirimi (feedback) verir.
 */
function CustomButton({ title, onPress, color = '#007AFF', disabled = false }) {
  return (
    <TouchableOpacity
      // Stil dizisi: Temel buton stili + devre dışıysa gri (#ccc), aktifse dinamik renk
      style={[
        styles.button,
        { backgroundColor: disabled ? '#ccc' : color }
      ]}
      onPress={onPress}
      // disabled={true} olduğunda butona basılamaz, tıklama olayını ve opaklık efektini engeller
      disabled={disabled}
      activeOpacity={0.7} // Dokunulduğunda inilecek opaklık seviyesi (varsayılan: 0.2)
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

/**
 * ButtonExample (Ana Bileşen):
 * Farklı prop'lara (renk, durum) sahip butonların listelendiği ekran.
 */
export default function ButtonExample() {
  /**
   * Olay Yöneticisi (Event Handler):
   * Butona basıldığında çalıştırılmak üzere alt bileşene prop (callback function) olarak aktarılır.
   */
  const handlePress = () => {
    alert('Button clicked!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button Examples</Text>
      
      {/* 1. Mavi Buton */}
      <CustomButton 
        title="Blue Button" 
        onPress={handlePress}
        color="#007AFF"
      />
      
      {/* 2. Yeşil Buton */}
      <CustomButton 
        title="Green Button" 
        onPress={handlePress}
        color="#28A745"
      />
      
      {/* 3. Kırmızı Buton */}
      <CustomButton 
        title="Red Button" 
        onPress={handlePress}
        color="#DC3545"
      />
      
      {/* 
        4. Devre Dışı (Disabled) Buton:
        - disabled={true} prop'u ile buton tıklanamaz hale gelir ve arka planı gri olur.
      */}
      <CustomButton 
        title="Disabled Button" 
        onPress={handlePress}
        color="#007AFF"
        disabled={true}
      />
    </View>
  );
}

/**
 * StyleSheet Tanımları
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Dikey eksende ortalama
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center', // Buton içindeki metni yatayda ortalar
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
