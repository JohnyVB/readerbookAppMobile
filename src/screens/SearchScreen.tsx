import React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Button, Text, TouchableOpacity, View } from 'react-native';

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
