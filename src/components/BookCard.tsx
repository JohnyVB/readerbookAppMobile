import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { SimpArticulo, SimpArticuloSearch } from '../interfaces/AppInterfaces';
import { BookCardStyles } from '../theme/BookCardTheme';

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
            <View style={{...BookCardStyles.cardContainer, width: widthScreen * 0.4}}>
                <View style={BookCardStyles.titleContainer}>
                    <Text style={BookCardStyles.titleText}>{book.title}</Text>
                </View>
                <Image 
                    source={{uri: (book.image) ? book.image : imageBookDefault}}
                    style={BookCardStyles.cardImage}
                />
                <View style={BookCardStyles.typeContainer}>
                    <Text style={BookCardStyles.typeText}>{book.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
