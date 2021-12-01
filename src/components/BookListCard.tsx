import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SimpArticulo } from '../interfaces/AppInterfaces';
import { bookListCardStyles } from '../theme/BookListCardTheme';

const widthScreen = Dimensions.get('window').width;

interface Props {
    book: SimpArticulo;
}

export const BookListCard = ({book: {_id, title, image, type, chapter}}: Props) => {

    const imageBookDefault: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1615497606/backend-lector/default/defaultBook_njteg0.jpg';

    return (
          
        <View style={{...bookListCardStyles.cardContainer, width: widthScreen * 0.9}}>
            <View style={bookListCardStyles.titleContainer}>
                <Text style={bookListCardStyles.title}>{title}</Text>
            </View>

            <View style={bookListCardStyles.dataContainer}>

                <View style={bookListCardStyles.imageContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                    >
                        <Image 
                            source={{uri: (image) ? image : imageBookDefault}}
                            style={bookListCardStyles.image}
                        />
                    </TouchableOpacity>
                </View>

                <View style={bookListCardStyles.chaptersContaniner}>
                    {                           
                        (chapter.length > 0)
                            ? (
                                chapter.map(item => (
                                    
                                    <View style={bookListCardStyles.titleChapter} key={item._id}>
                                        <TouchableOpacity
                                            onPress={() => {}}
                                        >
                                            <Text>{item.number} - {item.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                                
                            )
                            : (
                                <View style={bookListCardStyles.cafeContainer}>
                                    <Icon name="cafe" color="gray" size={30} />
                                    <Text>¡Aún no hay capítulos!</Text>
                                </View> 
                            )
                    }
                </View>

            </View>
            <View style={bookListCardStyles.typeContainer}>
                <Text style={bookListCardStyles.type}>{type}</Text>
            </View>
        </View>
    )
}
