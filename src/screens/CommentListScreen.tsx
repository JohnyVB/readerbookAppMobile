import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useComments } from '../hooks/useComments';
import { useForm } from '../hooks/useForm';
import moment from 'moment';
import { useNavigation } from '@react-navigation/core';
import { ItemComment } from '../components/ItemComment';

interface Props {
    entity: string;
    entityId: string;
}

export const CommentListScreen = ({ entity, entityId }: Props) => {

    const { commentsList, saveComment, saveCommentState } = useComments({entity,entityId});

    const navigation = useNavigation();

    const { comment, onChangeForm } = useForm({
        comment: ''
    });

    const imageUserDefault: string = 'https://res.cloudinary.com/dr0wxllnu/image/upload/v1615497606/backend-lector/default/default-user_bur2mh.png';

    const sendComment = () => {
        if (!comment) {
            return Alert.alert(
                'Campo vacio',
                'Por favor ingrese su comentario',
                [
                    {
                        text: 'Ok'
                    }
                ]
            );
        }
        saveComment(comment);
        onChangeForm('', 'comment');
    }

    return (
        <View style={styles.container}>

            <View style={styles.titleCommentsContainer}>
                <Text style={styles.titleComments}>Comentarios</Text>
            </View>

            <View style={styles.inputCommentContainer}>
                <TextInput
                    style={styles.inputComment}
                    underlineColorAndroid={'#3B688C'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='Tu comentario aqui...'
                    placeholderTextColor="#3B688C"
                    onChangeText={(value) => onChangeForm(value, 'comment')}
                    onSubmitEditing={sendComment}
                    value={comment}
                />

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnComment}
                    onPress={sendComment}
                    disabled={saveCommentState}
                >
                    {
                        (!saveCommentState)
                            ? <Text style={styles.btnText}>Comentar</Text>
                            : <ActivityIndicator color="white" style={styles.activityComment} size={20} />
                    }
                </TouchableOpacity>

            </View>

            {
                (commentsList.length > 0)
                    ? (
                        commentsList.map((item, index) => (
                            <ItemComment key={index} item={item} />
                        ))
                    )
                    : (
                        <View style={styles.emptyContainer}>
                            <Icon name="cafe" style={styles.iconEmty} size={60} />
                            <Text>Aun no hay comentarios</Text>
                        </View>
                    )
            }

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnAll}
                onPress={() => navigation.navigate('CommentsScreen' as never, { entity, entityId } as never)}
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
    titleCommentsContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 5
    },
    titleComments: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold'
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
    inputCommentContainer: {
        flex: 1,
        marginVertical: 15
    },
    inputComment: {
        borderRadius: 5,
        backgroundColor: '#E8E8E8',
        borderColor: 'black',
        height: 60
    },
    btnComment: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
        backgroundColor: '#3B688C',
        marginVertical: 10
    },
    btnText: {
        fontSize: 18,
        color: 'white'
    },
    activityComment: {
        marginHorizontal: 20,
        marginVertical: 4
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
});