import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { app } from '../config';

export default function SecondScreen({ route }) {
  const [items, setItems] = useState([]);
  const db = getFirestore(app);
  const { selectedData } = route.params; // Recebe os dados da primeira página

  useEffect(() => {
    // Alterar para filtrar com base no ID do restaurante
    const q = query(collection(db, 'restaurantes'), where('id', '==', selectedData)); // Supondo que selectedData é o ID do restaurante
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome,
        rua: doc.data().rua,
        telefone: doc.data().telefone,
        horario: doc.data().horario,
        menu: doc.data().menu,
      }));
      setItems(itemsList);
    }, (error) => {
      console.error("Error fetching data: ", error);
    });

    // Limpar a inscrição no unmount
    return () => unsubscribe();
  }, [selectedData]);

  return (
    <ScrollView style={styles.container}>
      {items.length > 0 ? (
        items.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <Text>Nome: {item.nome}</Text>
            <Text>Rua: {item.rua}</Text>
            <Text>Telefone: {item.telefone}</Text>
            <Text>Horário: {item.horario}</Text>
            <Text>Menu: {item.menu}</Text>
          </View>
        ))
      ) : (
        <Text>Nenhum restaurante encontrado.</Text>
        
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
  },
});
