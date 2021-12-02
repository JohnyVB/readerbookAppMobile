import React from 'react';
import { Text, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParams } from '../router/HomeDrawer';

interface Props extends DrawerScreenProps<RootDrawerParams, 'BookDetailScreen'>{};

export const BookDetailScreen = ({navigation, route}: Props) => {

    const {bookId} = route.params;

    return (
        <View>
            <Text>Book id: {bookId}</Text>
        </View>
    )
}
