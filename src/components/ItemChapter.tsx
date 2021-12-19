import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { SimChapter } from '../interfaces/AppInterfaces';

interface Props {
    item: SimChapter;
}

export const ItemChapter = ({item}: Props) => {

    return (
        <View style={styles.chapterContainer}>
            <View>
                <Text numberOfLines={1} style={styles.chapterText}>{item.number} - {item.title}</Text>
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
    )
}

const styles = StyleSheet.create({
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