import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, StatusBar, Pressable } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    text: 'Explore o mundo, saboreie \n o destino!',
    image: require('./imagem/logo.png'),
    backgroundColor: 'transparent',
  },
  {
    key: 2,
    text: 'Encontre o restaurante mais \n próximo de você!',
    image: require('./imagem/localizar.png'),
    backgroundColor: '#FA662A',
  }
];

export default function App({ navigation }) {
  const [showHome, setShowHome] = useState(false);

  function renderSlides({ item }) {
    return (
      <SafeAreaView style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>{item.text}</Text>
        {item.key === 2 && (
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        )}
      </SafeAreaView>
    );
  }

  if (showHome) {
    return (
  
          <Text style={styles.buttonText}>Entrar</Text>
  
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <AppIntroSlider
          renderItem={renderSlides}
          data={slides}
          activeDotStyle={styles.activeDot}
          onDone={() => setShowHome(true)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Adiciona algum espaço horizontal
    marginBottom:0,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20, // Adiciona espaço abaixo da imagem
  },
  image: {
    resizeMode: 'contain',
    height: 500,  // Define a altura fixa para a imagem
    width: '50%',   // Ajusta a largura da imagem para 80% da tela
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20, // Ajusta a margem inferior do texto
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 80,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 30,
  },
});
