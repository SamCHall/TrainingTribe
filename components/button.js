import { View, Text, TouchableOpacity } from 'react-native'
import { FONTS, SHADOWS, COLORS } from '../constants'
import React from 'react'

export const OvalButton = ({text, onPress, ...props}) => {
    return(
        <TouchableOpacity
            style={{
                backgroundColor: COLORS.secondary,
                borderRadius: 25,
                width: 150,
                height: 40,
                marginTop: 15,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                justifySelf: 'center',
                alignSelf: 'center',
                ...props
            }}
            onPress={onPress}
            title={text}
        >
            <Text style={{
                color: COLORS.black,
                fontFamily: FONTS.bold,
            }}>{text}</Text>
        </TouchableOpacity>
    )
}

export const TextButton = ({text, onPress, ...props}) => {
    return(
        <TouchableOpacity
            style={{
                backgroundColor: COLORS.primary,
                margin: 10,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                ...props
            }}
            onPress={onPress}
            title={text}
        >
            <Text style={{
                color: COLORS.secondary,
                fontFamily: FONTS.bold,
            }}>{text}</Text>
        </TouchableOpacity>
    )
}
