import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Inicio1 from './componentes/inicio1';
import Home from './componentes/home';
import Cadastrar from './componentes/cadastrar';
import Redefinir from './componentes/redefinir';
import PaginaPrincipal from './componentes/paginaPrincipal';
import detalhesRestaurantes from './componentes/detalhes';
import menu from './componentes/menus';

const TabBottom = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <TabBottom.Navigator
      initialRouteName="PaginaPrincipal"
      screenOptions={{
        tabBarActiveTintColor: "#7BB4E3"
      }}
    >
      <TabBottom.Screen 
        name="PaginaPrincipal" 
        component={PaginaPrincipal}
        options={{
          tabBarLabel: "Página Principal",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='home' size={size} color={color} />
          )
        }} 
      />
      <TabBottom.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='home' size={size} color={color} />
          )
        }} 
      />
      <TabBottom.Screen 
        name="detalhes" 
        component={detalhesRestaurantes}
        options={{
          tabBarLabel: "Detalhes",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='information-circle' size={size} color={color} />
          )
        }} 
      />
      <TabBottom.Screen 
        name="menus" 
        component={menu}
        options={{
          tabBarLabel: "Menus",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='list' size={size} color={color} />
          )
        }} 
      />
    </TabBottom.Navigator>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar o login

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio1"
        screenOptions={{ headerShown: false }}
      >
        {!isAuthenticated ? ( // Exibe a tela de login até o usuário estar autenticado
          <>
            <Stack.Screen name="Inicio1" component={Inicio1} />
            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="Cadastrar" component={Cadastrar} />
            <Stack.Screen name="Redefinir" component={Redefinir} />
          </>
        ) : (
          // Exibe as tabs apenas após o login
          <Stack.Screen name="Tabs" component={MyTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
