import React from 'react';
import { Text, StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImage from './imagem/logo.png'; 

const Login = () => {
  const navigation = useNavigation();

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
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
        />
        <TouchableOpacity 
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate('Redefinir')} // Navega para a tela "Redefinir"
        >
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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

export default Login;
