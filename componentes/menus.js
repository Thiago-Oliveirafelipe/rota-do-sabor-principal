import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MenuScreen({ route }) {
  const { menu } = route.params; // Recebe o menu passado como parâmetro

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text style={styles.menuText}>{menu}</Text> {/* Exibe o conteúdo do menu */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FA662A',
    fontWeight: 'bold',
  },
  menuText: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'left',
    color: '#333',
  },
});
