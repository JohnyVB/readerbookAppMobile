import React, { useEffect } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RootDrawerParams } from '../router/HomeDrawer';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { Usuario } from '../interfaces/AppInterfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import { useBooksUser } from '../hooks/useBooksUser';
import { BookCard } from '../components/BookCard';

interface Props extends DrawerScreenProps<RootDrawerParams, 'ProfileScreen'>{};

export const ProfileScreen = ({navigation, route}: Props) => {

    const {user} = useContext(AuthContext);

    const {userBook} = route.params;

    const imageUserDefault: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1615497606/backend-lector/default/default-user_bur2mh.png';

    const userData: Usuario | null = (userBook) ? userBook : user;

    const {bookList, isLoading, loadBooks} = useBooksUser({userId: userData!._id});

    useEffect(() => {
        loadBooks();
    }, [userData]);

    return (
        <View style={styles.container}>
            <BackgroundLogin />
            <View style={styles.profileContainer}>
                <View style={styles.btnContainer}>
                    
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnGoback}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="home-sharp" style={styles.btnIcon} size={25} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnGoback}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Icon name="menu-sharp" style={styles.btnIcon} size={25} />
                    </TouchableOpacity>

                </View>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: userData?.image ? userData?.image : imageUserDefault}}
                        style={styles.imageUser}
                    />
                </View>

                <Text style={styles.subTitle}>Información</Text>
                <View style={styles.dataContainer}>
                    <View style={styles.dataInfo}>
                    <Icon name='person-sharp' size={25} style={styles.iconUser} />
                        <Text style={styles.text}>{userData?.name} { userData?.lastname}</Text>
                    </View>
                    <View style={styles.dataBooks}>
                        <Icon name='library-sharp' size={25} style={styles.iconBook} />
                        <Text style={styles.text}>Publicaciones: {bookList.length}</Text>
                    </View>
                </View>

                <Text style={styles.subTitle}>Sobre mi</Text>
                <View style={styles.selfContainer}>
                    <Text style={styles.text}>{userData?.biography}</Text>
                </View>

                <Text style={styles.subTitle}>Email</Text>
                <View style={styles.selfContainer}>
                    <Text style={styles.text}>{userData?.email}</Text>
                </View>

                <Text style={styles.subTitle}>Preferencia de lectura</Text>
                <View style={styles.selfContainer}>
                    <Text style={styles.text}>{userData?.reader ? 'Cascada' : 'Paginada'}</Text>
                </View>

                <Text style={styles.subTitle}>Libros publicados</Text>
                <View style={styles.selfContainer}>
                    {
                        (isLoading)
                            ?(
                                <ActivityIndicator 
                                    style={{height: 400}}
                                    size={80}
                                    color="#FFFFFF"
                                />
                            ): (bookList.length === 0)
                                    ? (
                                        <View style={styles.cafeContainer}>
                                            <Icon name="cafe" color="gray" style={styles.cafeIcon} size={30} />
                                            <Text style={styles.text}>¡Aún no hay publicaciones!</Text>
                                        </View> 
                                    ): (
                                        <FlatList 
                                            data={bookList}
                                            keyExtractor={(item) => item._id}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({item}) => <BookCard book={item} />}
                                            horizontal
                                            style={styles.flatList}
                                        />
                                    )
                    }    
            </View>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnGoback: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40'
    },
    btnIcon: {
        color: 'white'
    },
    profileContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        padding: 10
    },
    imageContainer: {
        alignItems: 'center'
    },
    imageUser: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    subTitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E9EAED',
        borderRadius: 5,
        padding: 10
    },
    dataInfo: {
        flexDirection: 'row'
    },
    iconUser: {
        color: 'black',
        marginRight: 10
    },
    text: {
        color: 'black',
        alignSelf: 'center',
        fontStyle: 'italic'
    },
    dataBooks: {
        flexDirection: 'row'
    },
    iconBook: {
        color: 'black',
        marginRight: 10
    },
    selfContainer: {
        backgroundColor: '#E9EAED',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    flatList: {
        height: 270,
    },
    cafeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 80
    },
    cafeIcon: {
        color: 'black'
    }
});
