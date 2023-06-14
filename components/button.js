import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export const OvalButton = ({text, onPress, ...props}) => {
    return(
        <TouchableOpacity
            style={{
                backgroundColor: 'black',
                borderRadius: 25,
                width: 200,
                height: 50,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                ...props
            }}
            onPress={onPress}
            title={text}
        >
            <Text style={{color: 'white'}}>{text}</Text>
        </TouchableOpacity>
    )
}

