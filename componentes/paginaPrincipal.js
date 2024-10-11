import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Importar o hook useNavigation
import { app } from '../config'; // Importar a configuração do Firebase

export default function HomeScreen() {
  const [restaurantes, setRestaurantes] = useState([]);
  const navigation = useNavigation(); // Usar o hook useNavigation

  useEffect(() => {
    const db = getFirestore(app);
    const restaurantesCollection = collection(db, 'restaurantes');
    
    const unsubscribe = onSnapshot(restaurantesCollection, querySnapshot => {
      const restaurantesList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,  // Adicionar o id do documento como chave única
          nome: data.nome || 'N/A',
          rua: data.rua || 'N/A',
          imagem: data.imagem || '', // Certifique-se de que a imagem esteja presente
        };
      });
      setRestaurantes(restaurantesList);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const banners = [
    { image: require('./imagens/banner 01.png') },
    { image: require('./imagens/banner 02.png') },
    { image: require('./imagens/3.png') },
  ];

  const todayItems = [
    { image: require('./imagens/Foto ilustrativa.png'), title: 'Food 1', location: 'Location 1' },
    { image: require('./imagens/Foto ilustrativa.png'), title: 'Food 2', location: 'Location 2' },
  ];

  return (  
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.locationText}>Agrabadh 435, Chittagong</Text>
        <Image source={require('./imagens/6326055.png')} style={styles.profileImage} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Procurar" placeholderTextColor="#ccc" />
      </View>

      {/* Horizontal ScrollView after Search */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {banners.map((item, index) => (
          <Image key={index} source={item.image} style={styles.bannerImage} />
        ))}
      </ScrollView>

      {/* Today New Arrivals */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Melhores avaliações hoje</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionSubtitle}>Best of the today food list update</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {todayItems.map((item, index) => (
          <View key={index} style={styles.foodItem}>
            <Image source={item.image} style={styles.foodImage} />
            <Text style={styles.foodTitle}>{item.title}</Text>
            <Text style={styles.foodLocation}>{item.location}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Explore Restaurant */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Explore Restaurant</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionSubtitle}>Check your city Near by Restaurant</Text>
      {restaurantes.map((restaurant) => (
        <View key={restaurant.id} style={styles.restaurantContainer}>
          <Image source={{ uri: restaurant.imagem }} style={styles.restaurantImage} />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantTitle}>{restaurant.nome}</Text>
            <Text style={styles.restaurantLocation}>{restaurant.rua}</Text>
          </View>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate('detalhes', { restaurant })} // Passa os dados do restaurante para a tela de detalhes
          >
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#00A86B',
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  bannerImage: {
    width: 300,
    height: 150,
    borderRadius: 10,
    marginRight: 15,
  },
  foodItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  foodLocation: {
    fontSize: 14,
    color: '#888',
  },
  restaurantContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantLocation: {
    fontSize: 14,
    color: '#888',
  },
  bookButton: {
    backgroundColor: '#00A86B',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
