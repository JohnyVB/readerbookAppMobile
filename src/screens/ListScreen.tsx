import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { RootDrawerParams } from '../router/HomeDrawer';

interface Props extends DrawerScreenProps<RootDrawerParams, 'ListScreen'>{};

export const ListScreen = () => {
    return (
        <View>
            <Text>List Screen</Text>
        </View>
    )
}
