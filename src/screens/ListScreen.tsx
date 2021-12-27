import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Alert, Modal, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { BookCard } from '../components/BookCard';
import { useList } from '../hooks/useList';
import { RootDrawerParams } from '../router/HomeDrawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../hooks/useForm';

interface Props extends DrawerScreenProps<RootDrawerParams, 'ListScreen'>{};

export const ListScreen = ({navigation, route}: Props) => {

    const {userId} = route.params;

    const {list, isLoading, deleteItemList, isLoadingDelete, deleteListProm, editNameListProm} = useList({userId});

    const [editList, setEditList] = useState<boolean>(false);

    const {newNameList, listId, onChangeForm} = useForm({newNameList: '', listId: ''});

    const deleteItem = (listId: string, bookId: string) => {
        Alert.alert(
            'Eliminar libro de la lista',
            '¿Esta seguro de eliminar el libro de la lista?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => deleteItemList(listId, bookId)
                }
            ]
        );
    }

    const deleteList = (listId: string) => {
        Alert.alert(
            'Eliminar lista',
            '¿Esta seguro de eliminar la lista?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => deleteListProm(listId)
                }
            ]
        );
    }

    const editNameList = () => {
        editNameListProm(listId, newNameList);
        onChangeForm('', 'newNameList');
        setEditList(false); 
    }

    return (
        <View style={styles.container}>
            <BackgroundLogin />
            <ScrollView style={styles.listContainer}>
                <View style={styles.btnContainer}>
                    
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnGoback}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back-outline" style={styles.btnIcon} size={25} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnGoback}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Icon name="menu-sharp" style={styles.btnIcon} size={25} />
                    </TouchableOpacity>

                </View>
                <Text style={styles.title}>Mis listas</Text>
                {
                    (isLoading)
                        ?(
                            <ActivityIndicator 
                                style={{height: 400}}
                                size={80}
                                color="#3A3E40"
                            />
                        ): (list.length > 0)
                                ?(
                                    list.map((item, index) => (
                                        <View key={index} style={styles.flatListContainer}>
                                            <View style={styles.titleListContainer}>
                                                <Text style={styles.flatListTitle}>{item.name}</Text>
                                                <View style={styles.btnControllers}>
                                                    <TouchableOpacity
                                                        style={styles.btnEdit}
                                                        onPress={() => {
                                                            setEditList(true);
                                                            onChangeForm(item._id, 'listId');
                                                        }}
                                                    >
                                                        <Icon name="create-outline" color="white" size={20} />
                                                        <Text style={styles.textBtn}>Editar</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={styles.btnDelete}
                                                        onPress={() => deleteList(item._id)}
                                                    >
                                                        <Icon name="trash-outline" color="white" size={20} />
                                                        <Text style={styles.textBtn}>Eliminar</Text>
                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                            {
                                                (item.article.length > 0)
                                                    ?(
                                                        <FlatList 
                                                            data={item.article}
                                                            keyExtractor={(itemList) => itemList._id}
                                                            showsVerticalScrollIndicator={false}
                                                            horizontal
                                                            renderItem={({item}) => (
                                                                <View style={styles.bookCardContainer}>
                                                                    <BookCard book={item} />
                                                                    <TouchableOpacity
                                                                        style={styles.buttonTrash}
                                                                        onPress={() => deleteItem(list[index]._id, item._id)}
                                                                        disabled={isLoadingDelete}
                                                                    >
                                                                        <Icon name="trash-outline" color="white" size={20} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )}
                                                        />
                                                    ): (
                                                        <View style={styles.containerEmty}>
                                                            <Text style={{color: 'black'}}>¡Aún no hay libros para esta lista!</Text>
                                                            <Icon name="cafe-sharp" color="black" size={20} />
                                                        </View>
                                                    )
                                            }
                                        </View>
                                    ))
                                ): (
                                    <View style={styles.containerEmty}>
                                        <Text style={{color: 'black'}}>¡Aún no hay listas!</Text>
                                        <Icon name="cafe-sharp" color="black" size={20} />
                                    </View>
                                )
                }
            </ScrollView>
            
            {/* Modal edit list */}

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editList}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                        setEditList(!editList);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Editar lista</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput 
                                    style={styles.textInputList}
                                    underlineColorAndroid="#3B688C"
                                    value={newNameList}
                                    onChangeText={(value) => onChangeForm(value, 'newNameList')}
                                    onSubmitEditing={editNameList}
                                />

                                <TouchableOpacity
                                    style={styles.btnSaveList}
                                    onPress={() => editNameList()}
                                    disabled={isLoadingDelete}
                                >
                                    <Icon name="save" color="white" size={20} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.btnCancel}
                                    onPress={() => setEditList(!editList)}
                                    disabled={isLoadingDelete}
                                >
                                    <Icon name="close-outline" color="white" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    listContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnGoback: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40'
    },
    btnIcon: {
        color: 'white'
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    flatListTitle: {
        marginVertical: 10, 
        fontSize: 17, 
        color: 'black'
    },
    bookCardContainer: {
        justifyContent: 'center'
    },
    buttonTrash: {
        marginHorizontal: 40,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#CC3D3D',
        alignItems: 'center'
    },
    flatListContainer: {
        backgroundColor: '#E9EAED',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        paddingVertical: 20
    },
    containerEmty: {
        backgroundColor: '#E9EAED',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnControllers: {
        flexDirection: 'row'
    },
    btnEdit: {
        backgroundColor: '#FFC107',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        paddingVertical: 2,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDelete: {
        backgroundColor: '#CC3D3D',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        color: 'white',
        marginLeft: 8
    },

    // Estilos del modal:
    
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'black'
    },
    textInputList:{
        backgroundColor: '#E9EAED', 
        width: 150, 
        height: 40, 
        borderRadius: 5
    },
    btnSaveList: {
        backgroundColor: 'green', 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        justifyContent: 'center', 
        borderRadius: 5, 
        marginHorizontal: 10
    },
    btnCancel: {
        backgroundColor: '#CC3D3D', 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        justifyContent: 'center', 
        borderRadius: 5, 
        marginHorizontal: 10
    }
});
