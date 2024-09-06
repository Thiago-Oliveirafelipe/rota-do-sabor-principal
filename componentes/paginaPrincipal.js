import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const banners = [
    { image: require('./imagens/banner 01.png') },
    { image: require('./imagens/banner 02.png') },
    { image: require('./imagens/3.png') },
  ];

  const todayItems = [
    { image: require('./imagens/banner 01.png'), title: 'Apaloosa Churrascaria', location: "Caçapava" },
    { image: require('./imagens/banner 02.png'), title: 'Boa Prosa Botequim', location: 'Caçapava' },
    { image: require('./imagens/3.png'), title: 'Chicken Ramen', location: 'Yum Restaurant' },
  ];

  const restaurants = [
    { name: 'Ambrosia Hotel & Restaurant', location: 'Taiger Pass, Chittagong', image: require('./imagens/banner 01.png') },
    { name: 'Tava Restaurant', location: 'Zakir Hossain Rd, Chittagong', image: require('./imagens/banner 02.png') },
    { name: 'Haatkhola', location: 'Surson Road, Chittagong', image: require('./imagens/3.png') },
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
      {restaurants.map((restaurant, index) => (
        <View key={index} style={styles.restaurantContainer}>
          <Image source={restaurant.image} style={styles.restaurantImage} />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
            <Text style={styles.restaurantLocation}>{restaurant.location}</Text>
          </View>
          <TouchableOpacity style={styles.bookButton}>
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
