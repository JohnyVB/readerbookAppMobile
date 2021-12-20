import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { ProfileScreen } from '../screens/ProfileScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import { ListScreen } from '../screens/ListScreen';
import { BooksScreen } from '../screens/BooksScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { BookDetailScreen } from '../screens/BookDetailScreen';
import { ChapterScreen } from '../screens/ChapterScreen';
import { CommentsScreen } from '../screens/CommentsScreen';

export type RootDrawerParams = {
  HomeScreen: undefined,
  ProfileScreen: undefined,
  ListScreen: undefined,
  BooksScreen: undefined,
  SearchScreen: undefined,
  BookDetailScreen: {bookId: string},
  ChapterScreen: {bookId: string},
  CommentsScreen: {entity: string, entityId: string}
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
        <Drawer.Screen name="ChapterScreen" component={ChapterScreen} />
        <Drawer.Screen name="CommentsScreen" component={CommentsScreen} />
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
    <DrawerContentScrollView style={styles.container}>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image 
          source={{
            uri: (user?.image) ? user.image : imageUserDefault
          }}
          style={styles.avatar}
        />
      </View>

      {/* Opciones de menú */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.btnText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Text style={styles.btnText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ListScreen')}
        >
          <Text style={styles.btnText}>Listas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnClose}
          onPress={outSession}
        >
          <Text style={styles.textClose}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

    </DrawerContentScrollView>
  )
}

export const styles = StyleSheet.create({
  container:{
      flex: 1,
      marginHorizontal: 20
  },
  avatarContainer:{
      flex: 1, 
      alignItems: 'center',
      marginTop: 20
  },
  avatar: {
      height: 150,
      width: 150,
      borderRadius: 100
  },
  menuContainer: {
      marginVertical: 30,
      alignItems: 'center'
  },
  btn:{
      marginVertical: 10
  },
  btnText:{
      fontSize: 20
  },
  btnClose:{
      marginVertical: 10,
      backgroundColor: '#CC3D3D',
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 5
  },
  textClose:{
      fontSize: 20,
      color: 'white'
  }
});