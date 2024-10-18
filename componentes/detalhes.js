import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Linking, Alert } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ref, listAll, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";
import { app } from '../config';
import * as ImagePicker from 'expo-image-picker'; // Adicionando o ImagePicker

export default function SecondScreen({ route }) {
  const [item, setItem] = useState(null); 
  const [isLiked, setIsLiked] = useState(false); 
  const [imageUri, setImageUri] = useState(null); // Para armazenar a URI da imagem
  const [imagens, setImagens] = useState([]); // Estado para armazenar imagens
  const [loading, setLoading] = useState(true); // Estado para exibir o ActivityIndicator
  const db = getFirestore(app);
  const storage = getStorage(app); // Inicializando o storage do Firebase

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
          setItem({
            id: docSnap.id,
            nome: restaurantData.nome,
            rua: restaurantData.rua,
            telefone: restaurantData.telefone,
            horario: restaurantData.horario,
            menu: restaurantData.menu,
            descricao: restaurantData.descricao
          });
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
      setImageUri(result.assets[0].uri); // Corrigido para acessar a URI da imagem
    }
  };

  // Função para fazer o upload da imagem
  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("Erro", "Nenhuma imagem selecionada.");
      return;
    }

    try {
      const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `imagens/${filename}`);

      const response = await fetch(imageUri);
      const blob = await response.blob();

      const snapshot = await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Imagem disponível em: ", downloadURL);
      Alert.alert("Sucesso", "Imagem salva com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer o upload da imagem", error);
    }
  };

  // Função para listar imagens da pasta 'imagens' no Firebase Storage
  const fetchImagens = async () => {
    setLoading(true);
    const listRef = ref(storage, 'imagens/');

    try {
      const res = await listAll(listRef);
      const imageUrls = await Promise.all(
        res.items.map(async (itemRef) => {
          try {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          } catch (error) {
            console.error(`Erro ao obter URL da imagem ${itemRef.name}: `, error);
          }
        })
      );
      setImagens(imageUrls.filter((image) => image));
    } catch (error) {
      console.error('Erro ao carregar imagens: ', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchImagens(); // Carregar imagens ao montar o componente
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {item ? (
          <View>
            <View style={styles.header}>
              <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Voltar')}>
                <Icon name="arrow-left" size={30} color="#FA662A" />
              </TouchableOpacity>
              
              <Text style={styles.nome}>{item.nome}</Text>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsLiked(!isLiked)}
              >
                <Icon
                  name={isLiked ? "heart" : "heart-o"}
                  size={30}
                  color={isLiked ? "red" : "#333"}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.infodesc}>{item.descricao}</Text>

            <View style={styles.infoRow}>
              <TouchableOpacity onPress={() => openMaps(item.rua)} style={styles.mapButton}>
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6614/6614958.png' }}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.infoText}>{item.rua}</Text>
            </View>

            <Text style={styles.infoText}>Telefone: {item.telefone}</Text>
            <Text style={styles.infoText}>Horário: {item.horario}</Text>
            <Text style={styles.infoText}>Menu: {item.menu}</Text>

            {/* Exibir imagens carregadas */}
            {loading ? (
              <ActivityIndicator size="large" color="#FA662A" />
            ) : (
              imagens.map((img) => (
                <Image key={img.name} source={{ uri: img.url }} style={styles.restaurantImage} />
              ))
            )}

            {/* Botão para escolher e enviar uma nova imagem */}
            <TouchableOpacity onPress={escolherImagem} style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Escolher Imagem</Text>
            </TouchableOpacity>

            {imageUri && (
              <View>
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
                <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>Fazer Upload</Text>
                </TouchableOpacity>
              </View>
            )}

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
    marginBottom: 10,
    color: '#FA662A',
    fontWeight: 'bold',
    flex: 1,
  },
  infodesc: {
    textAlign: 'justify',
    lineHeight: 22,
    fontSize: 18,
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
    width: 30,
    height: 30,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  uploadButtonn: {
    backgroundColor: '#FA662A',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
});
