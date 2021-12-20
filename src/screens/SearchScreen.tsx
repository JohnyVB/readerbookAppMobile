import React from 'react';
import { ActivityIndicator, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BookCard } from '../components/BookCard';
import { useForm } from '../hooks/useForm';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParams } from '../router/HomeDrawer';
import { useSearch } from '../hooks/useSearch';
import { BackgroundLogin } from '../components/BackgroundLogin';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends DrawerScreenProps<RootDrawerParams, 'SearchScreen'>{};

export const SearchScreen = ({navigation}: Props) => {

    
    const {resultSearch, isLoading, loadResults, dataString} = useSearch();
    
    const {searchString, onChangeForm} = useForm({
        searchString: ''
    });


    const onSearch = () => {
        loadResults(searchString);
        onChangeForm('', 'searchString');
        Keyboard.dismiss();
    }

    return (
        <View style={styles.container}>
            <BackgroundLogin />

            <View style={styles.inputContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnGoback}
                    onPress={() => navigation.navigate('HomeScreen' as never)}
                >
                    <Icon name="arrow-back-outline" style={styles.iconGoback} size={30} />
                </TouchableOpacity>

                <TextInput 
                    placeholder="Buscar...."
                    placeholderTextColor="#3B688C"
                    underlineColorAndroid="#3B688C"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.inputSearch}
                    onChangeText={(value) => onChangeForm(value, 'searchString')}
                    value={searchString}
                    onSubmitEditing={onSearch}
                />

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnGoback}
                    onPress={() => navigation.navigate('ChapterScreen' as never)}
                >
                    <Icon name="search-outline" style={styles.iconGoback} size={30} />
                </TouchableOpacity>
            </View>
            <View>
                {
                    (isLoading)
                        ?(
                            <ActivityIndicator 
                                style={{height: 400}}
                                size={80}
                                color="#FFFFFF"
                            /> 
                        ):(resultSearch.length > 0 && dataString !== '')
                            ?(
                                <View style={styles.flatListContainer}>
                                    <FlatList 
                                        data={resultSearch}
                                        keyExtractor={(item) => item._id}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({item}) => <BookCard book={item} />}
                                        numColumns={2}
                                        style={styles.flatList}
                                        ListHeaderComponent={
                                            <Text style={styles.flatListTitle}>Busqueda: {dataString}</Text>
                                        }
                                    />
                                </View>
                            ):(dataString === '')
                                ? (
                                    <View style={styles.warningContainer}>
                                            <Text style={styles.titleInfo}>Pantalla de busqueda</Text>
                                            <Text style={styles.textInfo}>Puedes buscar por: </Text>
                                            <Text style={styles.textInfo}>- Titulo </Text>
                                            <Text style={styles.textInfo}>- generos: (Accion, Aventura, Romance) </Text>
                                            <Text style={styles.textInfo}>- Tipo: (Manhwua, Manga, Comic, Web Novel)  </Text>
                                            <Text style={styles.textInfo}>- Estado </Text>
                                            <Icon name="cafe" style={styles.iconInfo} size={50} />
                                    </View>
                                ):(
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.flatListTitle}>No se encontraron datos por esta busqueda:</Text>
                                        <Text style={styles.resultString}>{dataString}</Text>
                                        <Icon name="warning-outline" style={styles.iconWarning} size={50} />
                                    </View>
                                )

                                
                            
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputSearch:{
        flex: 1,
        color: '#3A3E40',
        backgroundColor: 'white',
        opacity: 0.7,
        borderRadius: 5,
        marginHorizontal: 5
    },
    btnGoback: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40'
    },
    iconGoback: {
        color: 'white'
    },
    flatListContainer: {
        alignItems: 'center'
    },
    flatList: {
        height: 700, 
        marginTop: 20
    },
    flatListTitle: {
        marginVertical: 10, 
        fontSize: 25, 
        color: 'black',
        textAlign: 'center'
    },
    resultString: {
        fontSize: 20, 
        color: 'black', 
        fontWeight: 'bold',
        textAlign: 'center'
    },
    warningContainer: {
        alignItems: 'center'
    },
    iconWarning: {
        color: 'red'
    },
    infoContainer: {
        alignItems: 'center'
    },
    iconInfo: {
        color: 'white',
        marginTop: 20
    },
    titleInfo: {
        marginTop: 20,
        marginBottom: 10, 
        fontSize: 25, 
        color: 'black', 
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textInfo: {
        fontSize: 15, 
        color: 'black',
        textAlign: 'center'
    }
});
