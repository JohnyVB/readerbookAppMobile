import React, { useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, Dimensions, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParams } from '../router/HomeDrawer';
import { useBook } from '../hooks/useBook';
import { BackgroundLogin } from '../components/BackgroundLogin';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { ChapterListScreen } from './ChapterListScreen';
import { CommentListScreen } from './CommentListScreen';

const widthScreen = Dimensions.get('window').width;


interface Props extends DrawerScreenProps<RootDrawerParams, 'BookDetailScreen'> {};

export const BookDetailScreen = ({ navigation, route }: Props) => {

    const imageBookDefault: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1615497606/backend-lector/default/defaultBook_njteg0.jpg';

    const { bookId } = route.params;
    const { book, isLoading, loadBook } = useBook(bookId);

    useEffect(() => {
        loadBook();
    }, [bookId]);

    return (
        <View style={styles.container}>

            <BackgroundLogin />
                {
                    (isLoading)
                        ? (
                            <ActivityIndicator 
                                style={styles.activity}
                                size={80}
                                color="#FFFFFF"
                            />
                        ): (
                            <ScrollView>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.btnGoback}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Icon name="backspace-outline" style={styles.iconBack} size={20} />
                                </TouchableOpacity>

                                <View style={styles.dataContainer}>

                                    <View style={styles.imageContainer}>
                                        <Image 
                                            source={{ uri: (book?.image) ? book?.image : imageBookDefault }}
                                            style={styles.image}
                                        />
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.title}>{book?.title}</Text>
                                        <TouchableOpacity 
                                            style={styles.authorContainer}
                                            activeOpacity={0.5}
                                            onPress={() => {}}
                                        >
                                            <Icon name="person-circle-outline" style={styles.iconAuthor} size={25} />
                                            <Text style={styles.authorText}>{book?.user.name} {book?.user.lastname}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.date}>{moment(book?.date).fromNow()}</Text>
                                        <Text style={styles.progress}>{book?.progress}</Text>
                                        <Text style={styles.description}>{book?.description}</Text>

                                        <FlatList 
                                            data={book?.genders}
                                            keyExtractor={(index) => index.toString()}
                                            renderItem={({item, index}) => <Text style={styles.gender} key={index}>{item}</Text>}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            style={styles.genderContainer}
                                        />

                                    </View>
                                </View>

                                <ChapterListScreen articleId={book!._id} />
                                <CommentListScreen entity='article' entityId={book!._id} />

                            </ScrollView>
                        )
                }

        </View>
   
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    activity: {
        height: 400
    },
    btnGoback: {
        position: 'absolute',
        zIndex: 999,
        top: 5,
        // padding: 15,
        paddingHorizontal: 20,
        paddingVertical: 5,
        // borderRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#3A3E40'
    },
    iconBack: {
        color: 'white'
    },
    dataContainer: {
        marginTop: 40
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        height: 600, 
        width: widthScreen * 0.9,
        borderRadius: 5
    },
    infoContainer: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black'
    },
    authorContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    iconAuthor: {
        color: 'black',
        marginRight: 5
    },
    authorText: {
        fontSize: 15,
        color: 'black'
    },
    date: {
        position: 'absolute',
        right: 10,
        top: 19
    },
    progress:{

    },
    description: {
        color: 'black',
        marginVertical: 10,
        textAlign: 'justify'
    },
    genderContainer: {
        marginVertical: 5
    },
    gender: {
        fontStyle: 'italic',
        backgroundColor: '#CCCCCC',
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 7
    }
});


