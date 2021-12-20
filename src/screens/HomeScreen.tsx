import React, { useContext, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Image, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import { homeStyles } from '../theme/HomeTheme';
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
        <View style={homeStyles.container}>
            <BackgroundLogin />
            <View style={homeStyles.headerHomeContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeScreen')}
                >
                    <Image 
                        source={{uri: imageIcon}}
                        style={homeStyles.ImageIcon}
                    />
                </TouchableOpacity>

                <Text style={homeStyles.titleApp}>ReaderBook</Text>
             
                <TouchableOpacity
                    onPress={() => navigation.toggleDrawer()}
                    style={homeStyles.btnImageUserScreen}
                >
                    <Image 
                        source={{ uri: (user?.image) ? user?.image : imageUserDefault}}
                        style={homeStyles.imageUserScreen}
                    />
                </TouchableOpacity>
            </View>

            <View style={homeStyles.buttonsContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={homeStyles.buttonBook}
                    onPress={() => setSearchScreen('home')}
                >
                    <Text style={homeStyles.btnText}>
                        <Icon name="library-outline" color="white" size={20} />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={homeStyles.buttonSearch}
                    onPress={() => navigation.navigate('SearchScreen' as never)}
                >
                    <Text style={homeStyles.btnText}>
                        <Icon name="search-outline" color="white" size={20} />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={homeStyles.buttonBook}
                    onPress={() => setSearchScreen('chapter')}
                >
                    <Text style={homeStyles.btnText}>
                        <Icon name="book-outline" color="white" size={20} />
                    </Text>
                </TouchableOpacity>
            </View>


            <View style={homeStyles.viewContainer}>
                {
                    (searchScreen === 'home')
                        ? <BooksScreen /> 
                        : <BooksListChapterScreen />
                        
                }
            </View>
                
                
        </View>
    )
}