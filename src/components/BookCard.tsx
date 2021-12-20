import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimpArticulo, SimpArticuloSearch } from '../interfaces/AppInterfaces';

const widthScreen = Dimensions.get('window').width;

interface Props {
    book: SimpArticulo | SimpArticuloSearch;
}

export const BookCard = ({book}: Props) => {

    const imageBookDefault: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1615497606/backend-lector/default/defaultBook_njteg0.jpg';
    const navigation = useNavigation();

    return (
        
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('BookDetailScreen' as never , {bookId: book._id} as never)}
        >
            <View style={{...styles.cardContainer, width: widthScreen * 0.4}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{book.title}</Text>
                </View>
                <Image 
                    source={{uri: (book.image) ? book.image : imageBookDefault}}
                    style={styles.cardImage}
                />
                <View style={styles.typeContainer}>
                    <Text style={styles.typeText}>{book.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        marginBottom: 25
    },
    titleContainer: {
        position: 'absolute',
        zIndex: 999,
        width: 165,
        height: 22,
        backgroundColor: 'black',
        opacity: 0.7,
    },
    titleText: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    cardImage: {
        height: 260
    },
    typeContainer: {
        position: 'absolute',
        zIndex: 999,
        top: 238,
        width: 165,
        height: 22,
        backgroundColor: 'black',
        opacity: 0.7,
    },
    typeText: {
        color: '#FFFFFF',
        textAlign: 'center'
    }
});
