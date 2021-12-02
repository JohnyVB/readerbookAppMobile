import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// import { DrawerScreenProps } from '@react-navigation/drawer';
// import { RootDrawerParams } from '../router/HomeDrawer';

// interface Props extends DrawerScreenProps<RootDrawerParams, 'SearchScreen'>{};

interface Props {
    searchString: string;
    setSearchScreen: (value: string) => void;
}

export const SearchScreen = ({searchString, setSearchScreen}: Props) => {
    return (
        <View>
            <TouchableOpacity 
                onPress={() => setSearchScreen('home')}
            >
                <Text>Atras</Text>
            </TouchableOpacity>
            <Text>Search Screen: {searchString}</Text>
        </View>
    )
}
