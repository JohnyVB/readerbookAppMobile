import React, { useContext, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Image, TextInput, TouchableOpacity, View, Keyboard, ScrollView, Text } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import { homeStyles } from '../theme/HomeTheme';
import { useForm } from '../hooks/useForm';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { BooksScreen } from './BooksScreen';
import { SearchScreen } from './SearchScreen';
import { BooksListChapterScreen } from './BooksListChapterScreen';

interface Props extends DrawerScreenProps<any, any>{};

export const HomeScreen = ({navigation}: Props) => {

    const imageUserDefault: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1615497606/backend-lector/default/default-user_bur2mh.png';
    const imageIcon: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1637515054/backend-lector/default/readerBookIcon_zdgnqe.png';

    const { user } = useContext(AuthContext);

    const [searchScreen, setSearchScreen] = useState('home');

    const {searchString, onChangeForm} = useForm({
        searchString: ''
    });
    
    const onSearch = () => {
        console.log({searchString});
        setSearchScreen('search');
        Keyboard.dismiss();
    }

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

                <TextInput 
                    placeholder="Buscar...."
                    placeholderTextColor="#3B688C"
                    underlineColorAndroid="#3B688C"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={homeStyles.inputSearch}
                    onChangeText={(value) => onChangeForm(value, 'searchString')}
                    value={searchString}
                    onSubmitEditing={onSearch}
                />
             
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

            {/* <View style={homeStyles.viewContainer}>
                {
                    (!searchScreen)
                        ? (
                            <>
                                <BooksScreen />
                                <BooksListChapterScreen />
                            </>
                        )
                        : <SearchScreen searchString={searchString} setSearchScreen={setSearchScreen} />
                }
            </View> */}

            <View style={homeStyles.buttonsContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={homeStyles.buttonBook}
                    onPress={() => setSearchScreen('home')}
                >
                    <Text style={homeStyles.btnText}>B Recientes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={homeStyles.buttonBook}
                    onPress={() => setSearchScreen('chapter')}
                >
                    <Text style={homeStyles.btnText}>C Recientes</Text>
                </TouchableOpacity>
            </View>


            <View style={homeStyles.viewContainer}>
                {
                    (searchScreen === 'home')
                        ? (
                            <BooksScreen />
                        )
                        : (searchScreen === 'chapter')
                            ? (
                                <BooksListChapterScreen />
                            )
                            : <SearchScreen searchString={searchString} setSearchScreen={setSearchScreen} />
                       
                }
            </View>
                
                
        </View>
    )
}