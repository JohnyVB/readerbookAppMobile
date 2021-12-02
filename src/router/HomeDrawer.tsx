import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { ProfileScreen } from '../screens/ProfileScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import { ListScreen } from '../screens/ListScreen';
import { drawerstyles } from '../theme/DrawerTheme';
import { BooksScreen } from '../screens/BooksScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { BookDetailScreen } from '../screens/BookDetailScreen';

export type RootDrawerParams = {
  HomeScreen: undefined,
  ProfileScreen: undefined,
  ListScreen: undefined,
  BooksScreen: undefined,
  SearchScreen: undefined,
  BookDetailScreen: {bookId: string},
}

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const HomeDrawer =() => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition:'right',
        headerShown: false
      }}
      drawerContent={(props) => <ContentDrawe {...props} />}
    >
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        <Drawer.Screen name="ListScreen" component={ListScreen} />
        <Drawer.Screen name="BooksScreen" component={BooksScreen} />
        <Drawer.Screen name="BookDetailScreen" component={BookDetailScreen} />
        <Drawer.Screen name="SearchScreen" component={SearchScreen} />
    </Drawer.Navigator>
  );
}

const ContentDrawe = ({navigation}: DrawerContentComponentProps) => {
  const imageUserDefault: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1615497606/backend-lector/default/default-user_bur2mh.png';
  const {user, logOut} = useContext(AuthContext);

  const outSession = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Desea cerrar sesión?',
      [
        {
          text: 'Cancelar',
          onPress: () => navigation.toggleDrawer(),
          style: 'cancel'
        },
        {
          text: 'Ok',
          onPress: () => logOut()
        }
      ]
    );
  }

  return (
    <DrawerContentScrollView style={drawerstyles.container}>

      {/* Avatar */}
      <View style={drawerstyles.avatarContainer}>
        <Image 
          source={{
            uri: (user?.image) ? user.image : imageUserDefault
          }}
          style={drawerstyles.avatar}
        />
      </View>

      {/* Opciones de menú */}
      <View style={drawerstyles.menuContainer}>
        <TouchableOpacity
          style={drawerstyles.btn}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={drawerstyles.btnText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={drawerstyles.btn}
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Text style={drawerstyles.btnText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={drawerstyles.btn}
          onPress={() => navigation.navigate('ListScreen')}
        >
          <Text style={drawerstyles.btnText}>Listas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={drawerstyles.btnClose}
          onPress={outSession}
        >
          <Text style={drawerstyles.textClose}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

    </DrawerContentScrollView>
  )
}