import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, StatusBar, Pressable } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    text: 'Explore o mundo, saboreie \n o destino!',
    image: require('./imagens/logo.png'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 2,
    text: 'Encontre o restaurante mais \n próximo de você!',
    image: require('./imagens/localizar.png'),
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

          </Pressable>
        )}
      </SafeAreaView>
    );
  }

  if (showHome) {
    return (
<<<<<<< HEAD
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('home')}
      >
</Pressable>
        );
=======
      <Pressable style={styles.button}
      onPress={() => navigation.navigate('Tabs', { screen: 'Home'})}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

    );
>>>>>>> 9c1837d5d9c291a873f4a0a07d59d9b129168321
  } else {
    return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <AppIntroSlider
            renderItem={renderSlides}
            data={slides}
            activeDotStyle={styles.activeDot}
            onDone={() => setShowHome(false)
            }
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
        paddingHorizontal: 20,
        width: '100%',  // Ajusta a largura para ocupar toda a tela
        height: '100%',
  },
        imageContainer: {
          justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,

  },
        image: {
          resizeMode: 'contain',
        height: 500,
        width: '50%',

  },
        text: {
          fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
  },
        button: {
          backgroundColor: '#FA662A',  // Cor de fundo igual ao slide laranja
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginTop: 'auto',  // Posiciona o botão na parte inferior
        marginBottom: 40,   // Adiciona espaço no final
  },
        buttonText: {
          color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
  },
        activeDot: {
        width: 30,
  },
});

