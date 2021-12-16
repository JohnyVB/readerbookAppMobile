import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import { useChapters } from '../hooks/useChapters';
import moment from 'moment';

interface Props {
    articleId: string;
}

export const ChapterListScreen = ({articleId}: Props) => {
    const {chapterList, isloading, loadChapters} = useChapters({articleId});
    return (
        <View style={styles.container}>
            {/* <View style={styles.controllerListContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnOrderOne}
                    onPress={() => loadChapters(-1)}
                >
                    <Icon name="caret-up-outline" style={styles.iconOne} size={30} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnOrderTwo}
                    onPress={() => loadChapters(1)}
                >
                    <Icon name="caret-down-outline" style={styles.iconTwo} size={30} />
                </TouchableOpacity>
            </View> */}

            

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
                                <View key={index} style={styles.chapterContainer}>
                                    <View>
                                        <Text numberOfLines={1} style={styles.chapterText}>{item.number} - {item.title}</Text>
                                        {/* <Text numberOfLines={1} style={styles.chapterText}>12 - ascascascascsccascascascascscscascascascascascascasc</Text> */}
                                    </View>
                                    <View style={styles.dateContainer}>
                                        <Icon name="calendar" size={20} style={styles.iconCalendar} /> 
                                        <Text style={styles.chapterText}>{moment(item.date).format('ll')}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {}}
                                    >
                                        <Icon name="play" size={30} style={styles.iconPlay} />
                                    </TouchableOpacity>
                                    
                                </View>
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
                onPress={() =>{}}
            >
                <Icon name="albums-outline" style={styles.iconTwo} size={30} />
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
    controllerListContainer: {
        flex: 1,
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
    },
    chapterContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#3B688C',
        marginVertical: 5,
        borderRadius: 5,
        padding: 8,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chapterText: {
        color: 'white',
        width: 140,
        marginRight: 10
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#3A3E40',
        borderRadius: 5,
        paddingVertical: 5
    },
    iconCalendar: {
        color: 'white',
        paddingHorizontal: 10
    },
    iconPlay: {
        color: 'white',
        paddingHorizontal: 10
    }
});
