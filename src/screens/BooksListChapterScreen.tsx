import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { BookListCard } from '../components/BookListCard';
import { useBooks } from '../hooks/useBooks';

export const BooksListChapterScreen = () => {

    const {bookList, isLoading} = useBooks();

    return (
        <View style={styles.container}>
            {
                (isLoading)
                    ?(
                        <ActivityIndicator 
                            style={styles.activityIndicator}
                            size={80}
                            color="#FFFFFF"
                        />
                    )
                    :(
                        <View style={styles.flatListContainer}>
                            <FlatList 
                                data={bookList}
                                keyExtractor={(article) => article._id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item}) => <BookListCard book={item} />}
                                style={styles.flatList}
                                ListHeaderComponent={
                                    <Text style={styles.flatListTitle}>Capítulos Recientes</Text>
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
