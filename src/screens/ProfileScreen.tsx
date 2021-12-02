import React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { RootDrawerParams } from '../router/HomeDrawer';

interface Props extends DrawerScreenProps<RootDrawerParams, 'ProfileScreen'>{};

export const ProfileScreen = () => {
    return (
        <View>
            <Text>Profile Screen</Text>
        </View>
    )
}
