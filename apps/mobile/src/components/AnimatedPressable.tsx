import React, { useRef } from 'react';
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

interface AnimatedPressableProps extends PressableProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    scaleTo?: number;
}

export default function AnimatedPressable({ children, style, scaleTo = 0.96, ...props }: AnimatedPressableProps) {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = (e: any) => {
        Animated.spring(scaleValue, {
            toValue: scaleTo,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
        }).start();
        if (props.onPressIn) props.onPressIn(e);
    };

    const handlePressOut = (e: any) => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
        }).start();
        if (props.onPressOut) props.onPressOut(e);
    };

    return (
        <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
            <Pressable
                {...props}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={style}
            >
                {children}
            </Pressable>
        </Animated.View>
    );
}
