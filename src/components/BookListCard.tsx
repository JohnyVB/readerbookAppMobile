import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SimpArticulo } from '../interfaces/AppInterfaces';
import { useNavigation } from '@react-navigation/core';

const widthScreen = Dimensions.get('window').width;

interface Props {
    book: SimpArticulo;
}

export const BookListCard = ({book: {_id, title, image, type, chapter}}: Props) => {

    const imageBookDefault: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1615497606/backend-lector/default/defaultBook_njteg0.jpg';

    const navigation = useNavigation();

    return (
          
        <View style={{...styles.cardContainer, width: widthScreen * 0.9}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.dataContainer}>

                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('BookDetailScreen' as never , {bookId: _id} as never)}
                    >
                        <Image 
                            source={{uri: (image) ? image : imageBookDefault}}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.chaptersContaniner}>
                    {                           
                        (chapter.length > 0)
                            ? (
                                chapter.map(item => (
                                    
                                    <View style={styles.titleChapter} key={item._id}>
                                        <TouchableOpacity
                                            onPress={() => {}}
                                        >
                                            <Text numberOfLines={1} style={styles.titleChapterText} >{item.number} - {item.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                                
                            )
                            : (
                                <View style={styles.cafeContainer}>
                                    <Icon name="cafe" color="gray" size={30} />
                                    <Text>¡Aún no hay capítulos!</Text>
                                </View> 
                            )
                    }
                </View>

            </View>
            <View style={styles.typeContainer}>
                <Text style={styles.type}>{type}</Text>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginBottom: 25,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10
    },
    title: {
        fontWeight: 'bold',
        color: 'black'
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    imageContainer: {
        flex: 1,
        marginBottom: 10
    },
    image: {
        height: 300
    },
    chaptersContaniner: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleChapter: {
       marginVertical: 5 
    },
    titleChapterText: {
        marginHorizontal: 15
    },
    typeContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'gray',
        borderRadius: 5,
        paddingVertical: 3
    },
    type: {
        color: 'white'
    },
    cafeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
