import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo e Título */}
      <View style={styles.header}>
        <Image source={require('./imagens/logo.png')} style={styles.logo} />
        <Text style={styles.title}>ROTA DO SABOR</Text>
        <Text style={styles.subTitle}>Redefinir Senha</Text>
      </View>

      {/* Campos de Email e Senha */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="email" size={20} color="#000" />
      -+
         <TextInput style={styles.input} placeholder="Email" />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#000" />
          <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
        </View>
      </View>

      {/* Botão de Entrar */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Área Laranja na Parte Inferior */}
      <View style={styles.bottomCurve}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#FF7733',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomCurve: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 120,
    backgroundColor: '#FF7733',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
});

export default LoginScreen;