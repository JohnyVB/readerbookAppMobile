import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useComments } from '../hooks/useComments';
import { useForm } from '../hooks/useForm';
import moment from 'moment';

interface Props {
    entity: string;
    entityId: string;
    all: boolean;
}

export const CommentListScreen = ({entity, entityId, all}: Props) => {

    const {commentsList, loadComments, isLoading} = useComments({entity, entityId});

    const {comment, onChangeForm} = useForm({
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
                <View style={styles.btnCommentContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btn}
                        onPress={sendComment}
                        disabled={false}
                    >
                        {
                            (true)
                                ? <Text style={styles.btnText}>Comentar</Text>
                                : <ActivityIndicator color="white" style={styles.activityComment} size={20} />
                        }
                    </TouchableOpacity>
                </View>
            </View>

            {
                (isLoading)
                    ? (
                        <View style={styles.activityContainer}>
                            <ActivityIndicator 
                                style={styles.activity}
                                size={80}
                                color="#3A3E40"
                            />
                        </View>
                    )
                    : (commentsList.length > 0)
                        ? (
                            commentsList.map((item, index) => (
                                <View key={index} style={styles.commentContainer}>
                                    <TouchableOpacity 
                                        style={styles.imageContainer}
                                        onPress={() => {}}
                                    >
                                        <Image 
                                            source={{ uri: (item.user.image) ? item.user.image : imageUserDefault}}
                                            style={styles.imageUser}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.dataCommentContainer}>
                                        <Text style={styles.textNameUser}>{item.user.name} {item.user.lastname}</Text>
                                        <Text style={styles.textDateComment}>{moment(item.date).fromNow()}</Text>
                                        <Text style={styles.textComment}>{item.text}</Text>
                                    </View>
                                    
                                </View>
                            ))
                        )
                        : (
                            <View style={styles.emptyContainer}>
                                <Icon name="cafe" style={styles.iconEmty} size={60} />
                                <Text>Aun no hay comentarios</Text>
                            </View>
                        )
            }
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
    btnCommentContainer: {
        alignItems: 'flex-end'
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3B688C',
        width: 120,
        marginTop: 10
    },
    btnText: {
        fontSize: 18,
        color: 'white'
    },
    activityComment : {
        marginHorizontal: 20,
        marginVertical: 4
    },
    commentContainer: {
        flex: 1,
        backgroundColor: '#17A2B8',
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    imageContainer: {
        
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
        color: 'white'
    }
});