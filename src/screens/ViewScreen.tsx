import React, { useContext, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { RootDrawerParams } from '../router/HomeDrawer';
import { AuthContext } from '../context/auth/AuthContext';
import { useChapterView } from '../hooks/useChapterView';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Pdf from 'react-native-pdf';

interface Props extends DrawerScreenProps<RootDrawerParams, 'ViewScreen'> {};

export const ViewScreen = ({navigation, route}: Props) => {

    const {bookId, numChapter} = route.params;

    const {user} = useContext(AuthContext);

    const {currentChapter, isloading, nextChapter, previousChapter, startChapter, endChapter} =  useChapterView({articleId: bookId, numChapter});


    return (
        <View style={styles.container}>
            <BackgroundLogin />
            <View style={styles.head}>
                <Text style={styles.title}>Capitulo: {currentChapter?.number} - {currentChapter?.title}</Text>
            </View>

       
            <View style={styles.viewContainer}>

                <View style={styles.buttonContainer}>
                    <View>
                        {
                            (!startChapter)
                                && (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.button}
                                        onPress={() => previousChapter()}
                                        disabled={startChapter}
                                    >
                                        <Icon name="play-skip-back" color="white" size={20} />
                                    </TouchableOpacity>
                                )
                        }
                    </View>
                    <View>
                        {/* {
                            (!user?.reader)
                                && (
                                    <Picker
                                        // selectedValue={}
                                        onValueChange={(itemValue, itemIndex) => {}}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label='{index}' value='{index}' />
                                    </Picker>
                                )
                        } */}

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.buttonComment}
                            onPress={() => navigation.navigate('CommentsScreen' as never, { entity: 'chapter', entityId: bookId } as never)}
                        >
                            <Text style={styles.TextComment}>Comentarios</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {
                            (!endChapter)
                                && (
                                    
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.button}
                                        onPress={() => nextChapter()}
                                        disabled={endChapter}
                                    >
                                        <Icon name="play-skip-forward" color="white" size={20} />
                                    </TouchableOpacity> 
                                    
                                )
                        } 
                    </View>
                        
                </View>

            
                <Pdf 
                    source={{uri: currentChapter?.image, cache: true}}
                    // onLoadComplete={(numberOfPages) => {
                       
                    // }}
                    // onError={(error) => {
                    //     console.log(error);
                    // }}
                    // onPageChanged={(page) => {
                       
                    // }}
                    style={styles.pdf}
                />
            


                
                {/* <Text>user logged: {user?.name} {user?.lastname} {user?._id} {(user?.reader) ? 'Cascada' : 'Paginada'}</Text>
                {
                    (isloading)
                        ? <ActivityIndicator style={{height: 400}} size={80} color="#FFFFFF" />
                        : (
                            <View>
                                <Text>Capitulo: {currentChapter?.number} {currentChapter?.title}</Text>
                                <Text>{startChapter ? 'Inicio' : endChapter ? 'Fin' : 'Intermedio'}</Text>
                            </View>
                        )
                } */}

                
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    head: {
        backgroundColor: '#3A3E40',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginBottom: 10
    },
    viewContainer: {
        flex: 1,
        paddingVertical: 10
    },
    title: {
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 5,
        backgroundColor: '#3A3E40'
    },
    buttonComment: {
        paddingHorizontal: 30,
        paddingVertical: 13,
        borderRadius: 5,
        backgroundColor: '#3B688C'
    },
    picker: {
        backgroundColor: 'white',
        width: 200,
        borderRadius: 5
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: 600,
        marginVertical: 10,
        alignSelf: 'center'
    },
    TextComment: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
