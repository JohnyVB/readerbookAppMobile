import React from 'react'
import { View } from 'react-native'

export const BackgroundLogin = () => {
    return (
        <View 
            style={{
                position: 'absolute',
                backgroundColor: '#FFC107',
                width: 1000,
                top: -350,
                height: 1200,
                transform: [
                    { rotate: '140deg'}
                ]
            }}
        />
    )
}
