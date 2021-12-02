import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../router/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'LoadingScreen'>{};

export const LoadingScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <ActivityIndicator 
                size={100}
                color="#FFC107"
            />
        </View>
    )
}
