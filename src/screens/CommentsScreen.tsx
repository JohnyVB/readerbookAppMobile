import React, { useEffect } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootDrawerParams } from '../router/HomeDrawer';
import { BackgroundLogin } from '../components/BackgroundLogin';
import Icon from 'react-native-vector-icons/Ionicons';
import { useComments } from '../hooks/useComments';
import { useForm } from '../hooks/useForm';
import { ItemComment } from '../components/ItemComment';

interface Props extends DrawerScreenProps<RootDrawerParams, 'CommentsScreen'> {};

export const CommentsScreen = ({ navigation, route }: Props) => {

    const {entity, entityId} = route.params;

    const {commentsList, saveComment, saveCommentState, isLoading, loadComments} = useComments({entity, entityId, all: true});

    const { comment, onChangeForm } = useForm({comment: ''});

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

    useEffect(() => {
      loadComments();
    }, [entityId]);
    

    return (
        <View style={styles.container}>
            
            <BackgroundLogin />

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnGoback}
                onPress={() => navigation.navigate('BookDetailScreen' as never, {bookId: entityId} as never)}
            >
                <Icon name="arrow-back-outline" style={styles.iconOne} size={30} />
            </TouchableOpacity>

            <View style={styles.controllerListContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnOrderOne}
                    onPress={() => loadComments(1)}
                >
                    <Icon name="caret-up-outline" style={styles.iconOne} size={30} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnOrderTwo}
                    onPress={() => loadComments(-1)}
                >
                    <Icon name="caret-down-outline" style={styles.iconTwo} size={30} />
                </TouchableOpacity>
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
                (isLoading)
                    ?(
                        <View style={styles.activityContainer}>
                            <ActivityIndicator 
                                style={styles.activity}
                                size={80}
                                color="#3A3E40"
                            />
                        </View>
                    ):(
                        <FlatList  
                            style={styles.flatList}
                            data={commentsList}
                            keyExtractor={(item) => item._id}
                            renderItem={({item, index}) => <ItemComment key={index} item={item} /> }
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={ <Text style={styles.flatListTitle}>Todos los comentarios</Text>}
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
    inputCommentContainer: {
        marginVertical: 15,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },
    inputComment: {
        borderRadius: 5,
        backgroundColor: '#E8E8E8',
        borderColor: 'black',
        height: 60
    },
    btnComment: {
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

