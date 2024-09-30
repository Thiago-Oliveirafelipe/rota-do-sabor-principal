import { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import logoImage from './imagens/logo.png';
import firebaseConfig from '../config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mova a inicialização do Firebase para o arquivo de configuração
  // Não inicialize o Firebase aqui dentro da função tentarLogar

  const tentarLogar = () => {
    const auth = getAuth(firebaseConfig); // Use a instância do Firebase configurada

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('Home'); // Navega para a tela "Home" após login bem-sucedido
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
    setEmail('');
    setPassword('');
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
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate('Redefinir')} // Navega para a tela "Redefinir"
          >
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => tentarLogar()}>

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
    color: '#989a91', // Mesma cor do link "Esqueceu a senha?"
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
