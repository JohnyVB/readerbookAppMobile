import React from 'react';
import { Image, View } from 'react-native';

export const AppLogo = () => {
    return (
        <View
            style={{
                alignItems: 'center'
            }}
        >
            <Image 
                source={ require('../assets/images/readerbook_logo.png') }
                style={{
                    width: 150,
                    height: 150
                }}
            />
        </View>
    )
}


// colores logo: #3B688C #3A3E40 #CC3D3D #FFFFFF
// Background color: #FFC107