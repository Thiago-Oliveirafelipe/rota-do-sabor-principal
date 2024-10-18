import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Inicio1 from './componentes/inicio1';
import Home from './componentes/home';        
import Cadastrar from './componentes/cadastrar';  
import Redefinir from './componentes/redefinir';  
import PaginaPrincipal from './componentes/paginaPrincipal';
import detalhesRestaurantes from './componentes/detalhes'
import menu from './componentes/menus';

const TabBottom = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <TabBottom.Navigator
      initialRouteName="Inicio1"
      screenOptions={{
        tabBarActiveTintColor: "#7BB4E3"
      }}
    >
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
        name="Cadastrar" 
        component={Cadastrar}
        options={{
          tabBarLabel: "Cadastrar",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='person-add' size={size} color={color} />
          )
        }} 
      />
      <TabBottom.Screen 
        name="Redefinir" 
        component={Redefinir}
        options={{
          tabBarLabel: "Redefinir",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='refresh' size={size} color={color} />
          )
        }} 
      />
      <TabBottom.Screen 
        name="PaginaPrincipal" 
        component={PaginaPrincipal}
        options={{
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
          tabBarLabel: "detalhes",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='person-add' size={size} color={color} />
          )
        }} 
      /><TabBottom.Screen 
      name="menus" 
      component={menu}
      options={{
        tabBarLabel: "menus",
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <Ionicons name='person-add' size={size} color={color} />
        )
      }} 
    />
    </TabBottom.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio1"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Inicio1" component={Inicio1} />
        <Stack.Screen name="Tabs" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
