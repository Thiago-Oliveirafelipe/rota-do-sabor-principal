import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MenuScreen({ route, navigation }) {
  const [menuItems, setMenuItems] = useState([]);
  const db = getFirestore(app);
  const { selectedData } = route.params;

  useEffect(() => {
    const fetchMenuData = async () => {
      if (!selectedData) {
        console.log("Nenhum ID de restaurante foi passado.");
        return;
      }

      console.log("Buscando dados para o restaurante com ID:", selectedData);
      const menuRef = doc(db, 'restaurantes', selectedData);

      try {
        const docSnap = await getDoc(menuRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMenuItems(data.itens || []); // Aqui, 'itens' deve ser uma propriedade válida do documento
          console.log("Itens do menu:", data.itens);
        } else {
          console.log("Nenhum menu encontrado para este restaurante.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do menu: ", error);
      }
    };

    fetchMenuData();
  }, [selectedData, db]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu do Restaurante</Text>
      <ScrollView>
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <View key={index} style={styles.menuItem}>
              <Text style={styles.menuItemText}>{item.menu}</Text> {/* Verifique se 'menu' é a propriedade correta */}
            </View>
          ))
        ) : (
          <Text style={styles.noMenuText}>Nenhum item de menu disponível.</Text>
        )}
      </ScrollView>

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('PaginaPrincipal')}>
          <Icon name="arrow-left" size={30} color="#FA662A" />
        </TouchableOpacity>

        <Text style={styles.nome}>{selectedData}</Text> {/* Exibindo o nome do restaurante ou ID aqui */}

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="heart-o" size={30} color="#333" />
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 15,
  },
  menuItemText: {
    fontSize: 18,
  },
  menuItemPrice: {
    fontSize: 16,
    color: '#FA662A',
  },
  noMenuText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  iconButton: {
    padding: 10,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
