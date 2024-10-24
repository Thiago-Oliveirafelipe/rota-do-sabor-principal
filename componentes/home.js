import { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import logoImage from './imagens/logo.png';
import { firebaseApp } from '../config'; // Assuming firebaseApp is initialized properly in your config

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const tentarLogar = () => {
    const auth = getAuth(firebaseApp); // Make sure firebaseApp is properly initialized

    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('PaginaPrincipal'); // Navigate to the Home screen upon successful login
      })
      .catch(error => {
        console.error('Login failed:', error);
        Alert.alert('Erro', 'Não foi possível realizar o login. Verifique suas credenciais.');
      })
      .finally(() => {
        // Reset the form fields after attempting login
        setEmail('');
        setPassword('');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.registerLinkContainer}
          onPress={() => navigation.navigate('Cadastrar')}
        >
          <Text style={styles.registerLinkText}>Cadastrar</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate('Redefinir')} // Navigate to the "Redefinir" screen
        >
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={tentarLogar}>
          <Text style={styles.buttonText}>Entrar</Text>
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
  registerLinkContainer: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  registerLinkText: {
    color: '#989a91',
    fontSize: 16,
    textDecorationLine: 'underline',
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#989a91',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#FA662A',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
