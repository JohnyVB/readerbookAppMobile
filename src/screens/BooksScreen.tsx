import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { BookCard } from '../components/BookCard';
import { useBooks } from '../hooks/useBooks';
import { RootDrawerParams } from '../router/HomeDrawer';

interface Props extends DrawerScreenProps<RootDrawerParams, 'BooksScreen'>{};

export const BooksScreen = () => {

    const {bookList, isLoading} = useBooks();

    return (
        <View style={styles.container}>
            {
                (isLoading)
                    ? (
                        <ActivityIndicator 
                            style={styles.activityIndicator}
                            size={80}
                            color="#FFFFFF"
                        />
                    )
                    : (
                        <View style={styles.flatListContainer}>
                            <FlatList 
                                data={bookList}
                                keyExtractor={(article) => article._id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item}) => <BookCard book={item} />}
                                numColumns={2}
                                style={styles.flatList}
                                ListHeaderComponent={
                                    <Text style={styles.flatListTitle}>Libros Recientes</Text>
                                }
                                scrollEnabled
                            />
                        </View>
                    )
            }
        </View>
    )
}

export const styles = StyleSheet.create({
    container:{
        marginBottom: 20
    },
    activityIndicator: {
        height: 400
    },
    flatListContainer: {
        alignItems: 'center',
        height: 700
    },
    flatList: {
        height: 600
    },
    flatListTitle: {
        marginVertical: 10, 
        fontSize: 25, 
        color: 'black', 
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
