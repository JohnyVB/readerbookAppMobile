import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimpComment } from '../interfaces/AppInterfaces';
import moment from 'moment';

interface Props {
    item: SimpComment;
}

export const ItemComment = ({item}: Props) => {

    const imageUserDefault: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1615497606/backend-lector/default/default-user_bur2mh.png';

    return (
        <View style={styles.commentContainer}>
            <TouchableOpacity
                onPress={() => { }}
            >
                <Image
                    source={{ uri: (item.user.image) ? item.user.image : imageUserDefault }}
                    style={styles.imageUser}
                />
            </TouchableOpacity>
            <View style={styles.dataCommentContainer}>
                <Text style={styles.textNameUser}>{item.user.name} {item.user.lastname}</Text>
                <Text style={styles.textDateComment}>{moment(item.date).fromNow()}</Text>
                <Text style={styles.textComment}>{item.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    commentContainer: {
        flex: 1,
        backgroundColor: '#17A2B8',
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    imageUser: {
        width: 65,
        height: 65,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5
    },
    dataCommentContainer: {
        flex: 1,
        marginHorizontal: 5,
        padding: 5
    },
    textNameUser: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    textDateComment: {
        position: 'absolute',
        zIndex: 999,
        alignSelf: 'flex-end',
        top: 5
    },
    textComment: {
        color: 'white',
        marginTop: 5
    },
});