// LoginScreen.js
import { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import logoImage from './imagens/logo.png';
import { firebaseApp } from '../config';

const LoginScreen = ({ setIsAuthenticated }) => { // Recebe como prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const tentarLogar = () => {
    const auth = getAuth(firebaseApp);

    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        setIsAuthenticated(true); // Atualiza o estado para indicar que o usuário está autenticado
        navigation.replace('Tabs'); // Redireciona para a tela principal
      })
      .catch(error => {
        console.error('Login failed:', error);
        Alert.alert('Erro', 'Não foi possível realizar o login. Verifique suas credenciais.');
      })
      .finally(() => {
        setLoading(false);
        setEmail('');
        setPassword('');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Componentes da tela de login */}
      <TouchableOpacity style={styles.button} onPress={tentarLogar} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Estilos da tela de login
});

export default LoginScreen;
