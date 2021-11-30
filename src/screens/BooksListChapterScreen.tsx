import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useBooks } from '../hooks/useBooks';
import { BooksListStyles } from '../theme/BookListChapterTheme';

export const BooksListChapterScreen = () => {

    const {bookList, isLoading} = useBooks();

    return (
        <View style={BooksListStyles.container}>
            {
                (isLoading)
                    ?(
                        <ActivityIndicator 
                            style={BooksListStyles.activityIndicator}
                            size={80}
                            color="#FFFFFF"
                        />
                    )
                    :(
                        <View style={BooksListStyles.flatListContainer}>
                            <FlatList 
                                data={bookList}
                                keyExtractor={(article) => article._id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item}) => <Text>{item._id}</Text>}
                                style={BooksListStyles.flatList}
                                ListHeaderComponent={
                                    <Text style={BooksListStyles.flatListTitle}>Capitulos Recientes</Text>
                                }
                                scrollEnabled
                            />
                        </View>
                    )
            }
        </View>
    )
}
