import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { BookCard } from '../components/BookCard';
import { useBooks } from '../hooks/useBooks';
import { RootDrawerParams } from '../router/HomeDrawer';
import { BooksStyles } from '../theme/BooksTheme';

interface Props extends DrawerScreenProps<RootDrawerParams, 'BooksScreen'>{};

export const BooksScreen = () => {

    const {bookList, isLoading} = useBooks();

    return (
        <View style={BooksStyles.container}>
            {
                (isLoading)
                    ? (
                        <ActivityIndicator 
                            style={BooksStyles.activityIndicator}
                            size={80}
                            color="#FFFFFF"
                        />
                    )
                    : (
                        <View style={BooksStyles.flatListContainer}>
                            <FlatList 
                                data={bookList}
                                keyExtractor={(article) => article._id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item}) => <BookCard book={item} />}
                                numColumns={2}
                                style={BooksStyles.flatList}
                                ListHeaderComponent={
                                    <Text style={BooksStyles.flatListTitle}>Libros Recientes</Text>
                                }
                                scrollEnabled
                            />
                        </View>
                    )
            }
        </View>
    )
}
