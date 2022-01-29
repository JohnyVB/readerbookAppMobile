import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import { useChapters } from '../hooks/useChapters';
import { useNavigation } from '@react-navigation/core';
import { ItemChapter } from '../components/ItemChapter';

interface Props {
    articleId: string;
}

export const ChapterListScreen = ({articleId}: Props) => {

    const {chapterList, isloading} = useChapters({articleId});

    const navigation = useNavigation();

    return (
        <View style={styles.container}>     

            <View style={styles.titleChaptersContainer}>
                <Text style={styles.titleChapters}>Capítulos</Text>
            </View>

            {
                (isloading)
                    ?(
                        <View style={styles.activityContainer}>
                            <ActivityIndicator 
                                style={styles.activity}
                                size={80}
                                color="#3A3E40"
                            />
                        </View>
                    )
                    : (chapterList.length > 0)
                        ? (
                            chapterList.map((item, index) =>(
                                <ItemChapter key={index} bookId={articleId} item={item} />
                            ))
                        )
                        : (
                            <View style={styles.emptyContainer}>
                                <Icon name="cafe" style={styles.iconEmty} size={60} />
                                <Text>Aun no hay capítulos</Text>
                            </View>
                        )
            }

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnAll}
                onPress={() => navigation.navigate('ChapterScreen'as never, {bookId: articleId} as never)}
                disabled={chapterList.length === 0}
            >
                <Icon name="albums-outline" style={styles.iconAll} size={30} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        borderRadius: 5, 
        padding: 10, 
        marginHorizontal: 20,
        marginBottom: 10
    },
    titleChaptersContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 5
    },
    titleChapters: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold'
    },
    btnAll: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40',
        marginVertical: 10
    },
    iconAll: {
        color: 'white'
    },
    activityContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activity: {
        height: 400
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        height: 300,
        justifyContent: 'center'
    },
    iconEmty: {
        color: '#3A3E40'
    }
});
