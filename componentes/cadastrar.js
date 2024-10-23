import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import logoImage from './imagens/logo.png'; 
import { getFirestore, collection, addDoc } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 
import { firebaseApp } from '../config'; // Importa sua configuração do Firebase

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const AdicionarClientes = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const auth = getAuth(firebaseApp); // Obtenha o auth do Firebase configurado

    try {
      // Crie o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user; // Obtenha o usuário criado

      // Após o usuário ser criado, salve os dados adicionais no Firestore
      const db = getFirestore(firebaseApp);
      const clientesCollection = collection(db, "clientes");

      await addDoc(clientesCollection, {
        uid: user.uid, // Salve o ID do usuário autenticado
        nome: nome,
        email: email,
      });

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.navigate('Home'); // Navega para a página inicial após cadastro
    } catch (error) {
      console.error("Erro ao adicionar usuário", error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar o usuário.");
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Corrigido para navegar para a tela de login
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity style={styles.button} onPress={AdicionarClientes}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginLink}>Já tem conta? Faça Login!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  form: {
    width: '80%',
  },
  input: {
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FA662A',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#808080',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CadastroScreen;
