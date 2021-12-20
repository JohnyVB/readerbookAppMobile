import React, { useContext, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { BooksScreen } from './BooksScreen';
import { BooksListChapterScreen } from './BooksListChapterScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootDrawerParams } from '../router/HomeDrawer';

interface Props extends DrawerScreenProps<RootDrawerParams, 'HomeScreen'>{};

export const HomeScreen = ({navigation}: Props) => {

    const imageUserDefault: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1615497606/backend-lector/default/default-user_bur2mh.png';
    const imageIcon: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1637515054/backend-lector/default/readerBookIcon_zdgnqe.png';

    const { user } = useContext(AuthContext);

    const [searchScreen, setSearchScreen] = useState('home');

    return (
        <View style={styles.container}>
            <BackgroundLogin />
            <View style={styles.headerHomeContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeScreen')}
                >
                    <Image 
                        source={{uri: imageIcon}}
                        style={styles.ImageIcon}
                    />
                </TouchableOpacity>

                <Text style={styles.titleApp}>ReaderBook</Text>
             
                <TouchableOpacity
                    onPress={() => navigation.toggleDrawer()}
                    style={styles.btnImageUserScreen}
                >
                    <Image 
                        source={{ uri: (user?.image) ? user?.image : imageUserDefault}}
                        style={styles.imageUserScreen}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonBook}
                    onPress={() => setSearchScreen('home')}
                >
                    <Text style={styles.btnText}>
                        <Icon name="library-outline" color="white" size={20} />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonSearch}
                    onPress={() => navigation.navigate('SearchScreen' as never)}
                >
                    <Text style={styles.btnText}>
                        <Icon name="search-outline" color="white" size={20} />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonBook}
                    onPress={() => setSearchScreen('chapter')}
                >
                    <Text style={styles.btnText}>
                        <Icon name="book-outline" color="white" size={20} />
                    </Text>
                </TouchableOpacity>
            </View>


            <View style={styles.viewContainer}>
                {
                    (searchScreen === 'home')
                        ? <BooksScreen /> 
                        : <BooksListChapterScreen />
                        
                }
            </View>
                
                
        </View>
    )
}

export const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    headerHomeContainer:{
        flexDirection:'row',
        marginVertical: 10, 
        marginHorizontal: 10, 
        justifyContent: 'space-between',
    },
    ImageIcon:{
        width: 50,
        height: 50
    },
    titleApp: {
        flex: 1,
        color: '#3A3E40',
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 41,
        fontStyle: 'italic',
        fontFamily: ''
    },
    btnImageUserScreen:{
        marginHorizontal: 10
    },
    imageUserScreen: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginHorizontal: 25,
        justifyContent: 'space-around',
        marginVertical: 10
    },
    buttonBook: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40'
    },
    buttonSearch: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3B688C',
        marginHorizontal: 20
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 30
    },
    viewContainer: {
        height: 2000
    }
});