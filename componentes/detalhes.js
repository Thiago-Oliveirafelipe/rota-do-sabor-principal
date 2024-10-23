import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, Alert, Dimensions } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { app } from '../config';
import * as ImagePicker from 'expo-image-picker';

const { width: screenWidth } = Dimensions.get('window');

export default function SecondScreen({ route, navigation }) {
  const [item, setItem] = useState(null);
  const [carouselImages, setCarouselImages] = useState([]); // Imagens para o carrossel
  const db = getFirestore(app);
  const { selectedData } = route.params;

  useEffect(() => {
    if (!selectedData) {
      console.log("Nenhum ID de restaurante foi passado.");
      return;
    }

    const restaurantRef = doc(db, 'restaurantes', selectedData);

    const fetchRestaurantData = async () => {
      try {
        const docSnap = await getDoc(restaurantRef);
        if (docSnap.exists()) {
          const restaurantData = docSnap.data();
          setItem(restaurantData);
          setCarouselImages(restaurantData.imagens || []); // Imagens para o carrossel
        } else {
          console.log("Nenhum restaurante encontrado com esse ID.");
        }
      } catch (error) {
        console.error("Erro ao buscar o restaurante: ", error);
      }
    };

    fetchRestaurantData();
  }, [selectedData, db]);

  const openMaps = (endereco) => {
    const query = encodeURIComponent(endereco);
    const url = `https://maps.google.com/?q=${query}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Não foi possível abrir o Google Maps.");
        }
      })
      .catch((err) => console.error("Erro ao tentar abrir o Google Maps", err));
  };

  // Função para escolher a imagem do dispositivo
  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permissão necessária", "Precisamos da permissão para acessar suas fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      await atualizarImagem(newImageUri); // Atualiza a imagem no Firestore
    }
  };

  // Função para atualizar a imagem no Firestore
  const atualizarImagem = async (newImageUri) => {
    const restaurantRef = doc(db, 'restaurantes', selectedData);

    try {
      // Primeiro, obtenha o array atual de imagens do Firestore
      const docSnap = await getDoc(restaurantRef);
      if (docSnap.exists()) {
        const restaurantData = docSnap.data();
        const imagensAtuais = restaurantData.imagens || [];

        // Adicione a nova imagem ao array de imagens
        const imagensAtualizadas = [...imagensAtuais, newImageUri];

        // Atualize o documento no Firestore com o novo array de imagens
        await updateDoc(restaurantRef, { imagens: imagensAtualizadas });

        setCarouselImages(imagensAtualizadas); // Atualiza o estado local
        Alert.alert("Sucesso", "Imagem adicionada com sucesso!");
      } else {
        Alert.alert("Erro", "Restaurante não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao atualizar a imagem: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {item ? (
          <View>
            <View style={styles.header}>
              <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('PaginaPrincipal')}>
                <Icon name="arrow-left" size={30} color="#FA662A" />
              </TouchableOpacity>

              <Text style={styles.nome}>{item.nome}</Text>

              <TouchableOpacity style={styles.iconButton}>
                <Icon name="heart-o" size={30} color="#333" />
              </TouchableOpacity>
            </View>
            {/* Exibir carrossel de imagens */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContent} // Use contentContainerStyle para estilizar o conteúdo
              style={styles.carouselContainer}
            >
              {carouselImages && carouselImages.length > 0 ? (
                carouselImages.map((imageUrl, index) => (
                  <Image
                    key={index}
                    source={{ uri: imageUrl }}
                    style={styles.carouselImage}
                    resizeMode="cover" // Garante que a imagem ocupe todo o espaço sem distorção
                  />
                ))
              ) : (
                <Text style={styles.noImagesText}>Nenhuma imagem disponível.</Text> // Adicionei um estilo para o texto
              )}
            </ScrollView>
            {/* Botão para escolher e enviar uma nova imagem */}
            <TouchableOpacity onPress={escolherImagem} style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Quer deixar sua recordação desse lugar? Escolha uma imagem</Text>
            </TouchableOpacity>


            <Text style={styles.infodesc}>{item.descricao}</Text>
            <Text style={styles.endereco}>Endereço</Text>
            <View style={styles.infoRow}>
              <TouchableOpacity onPress={() => openMaps(item.rua)} style={styles.mapButton}>
                <Image
                  source={{ uri: 'https://t.ctcdn.com.br/TsDYMux-ZlhMhRe2LOni3S_3aTk=/1200x675/smart/i381158.jpeg' }}
                  style={styles.icon}
                />
              </TouchableOpacity>

            </View>
            <Text style={styles.inforowText}>{item.rua}</Text>
            <Text style={styles.endereco}>Telefone</Text>
            <Text style={styles.textex}>Entre em contato e tenha uma experiencia gastronomica</Text>

            <Text style={styles.infoTextTel}>{item.telefone}</Text>
            <Text style={styles.endereco}>Horário</Text>
            <Text style={styles.infoTextho}>{item.horario}</Text>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => navigation.navigate('menus', { selectedData: selectedData })} // Navega para a tela de menu
              activeOpacity={0.7} // Torna o botão mais opaco ao toque
            >
              <Text style={styles.bookButtonText}>Ver Menu</Text> {/* Texto do botão */}
            </TouchableOpacity>

          </View>
        ) : (
          <Text>Nenhum restaurante encontrado.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inforowText: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center',
  },
  textex: {
    textAlign: ' center',
    fontSize: 15,
  },
  endereco: {
    fontSize: 30,
    textAlign: 'center',
    color: '#FA662A',
    fontWeight: 'bold',
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
  },
  nome: {
    fontSize: 30,
    textAlign: 'center',
    color: '#FA662A',
    fontWeight: 'bold',
    flex: 1,
  },
  infodesc: {
    textAlign: 'justify',
    lineHeight: 22,
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,

  },
  mapButton: {
    marginRight: 10,
  },
  icon: {
    width: 350,
    height: 150,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  carouselContainer: {
    marginTop: 20,
  },
  carouselImage: {
    width: screenWidth * 0.8,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
  uploadButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,

  },
  uploadButtonText: {
    color: '#FA662A',
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: '#666',
    padding: 15,
  },
  infoTextTel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
  infoTextho: {
    fontWeight: 'bold',
    fontSize: 20
    ,
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
