import React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { RootDrawerParams } from '../router/HomeDrawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useChapters } from '../hooks/useChapters';
import { ItemChapter } from '../components/ItemChapter';

interface Props extends DrawerScreenProps<RootDrawerParams, 'ChapterScreen'> {};

export const ChapterScreen = ({ navigation, route }: Props) => {

    const {bookId} = route.params;

    const {chapterList, isloading, loadChapters} = useChapters({articleId: bookId, all: true});

    return (
        <View style={styles.container}>
            <BackgroundLogin />

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnGoback}
                onPress={() => navigation.navigate('BookDetailScreen' as never, {bookId} as never)}
            >
                <Icon name="arrow-back-outline" style={styles.iconOne} size={30} />
            </TouchableOpacity>

            <View style={styles.controllerListContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnOrderOne}
                    onPress={() => loadChapters(1)}
                >
                    <Icon name="caret-up-outline" style={styles.iconOne} size={30} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnOrderTwo}
                    onPress={() => loadChapters(-1)}
                >
                    <Icon name="caret-down-outline" style={styles.iconTwo} size={30} />
                </TouchableOpacity>
            </View>

            {
                (isloading)
                    ? (
                        <View style={styles.activityContainer}>
                            <ActivityIndicator 
                                style={styles.activity}
                                size={80}
                                color="#3A3E40"
                            />
                        </View>
                    ): (

                        <FlatList 
                            style={styles.flatList}
                            data={chapterList}
                            keyExtractor={(item) => item._id}
                            renderItem={({item, index}) => <ItemChapter key={index} item={item} />}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={ <Text style={styles.flatListTitle}>Todos los capítulos</Text>}
                        />            
                    )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    btnGoback: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40',
        marginVertical: 10
    },
    controllerListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    btnOrderOne: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40',
        marginRight: 5
    },
    iconOne: {
        color: 'white'
    },
    btnOrderTwo: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40',
        marginLeft: 5
    },
    iconTwo: {
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
    flatList: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        marginVertical: 10,
        padding: 10
    },
    flatListTitle: {
        marginVertical: 10, 
        fontSize: 25, 
        color: 'black', 
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
