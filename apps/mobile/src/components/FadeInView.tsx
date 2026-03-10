import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface FadeInViewProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
}

export default function FadeInView({
    children,
    style,
    delay = 0,
    duration = 500,
    direction = 'up',
    distance = 20,
}: FadeInViewProps) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translate = useRef(new Animated.Value(distance)).current;

    useEffect(() => {
        const translateAnim = Animated.timing(translate, {
            toValue: 0,
            duration,
            delay,
            useNativeDriver: true,
        });

        const opacityAnim = Animated.timing(opacity, {
            toValue: 1,
            duration,
            delay,
            useNativeDriver: true,
        });

        if (direction === 'none') {
            opacityAnim.start();
        } else {
            Animated.parallel([opacityAnim, translateAnim]).start();
        }
    }, [delay, duration, direction, distance]);

    const getTransform = () => {
        if (direction === 'none') return [];
        if (direction === 'up') return [{ translateY: translate }];
        if (direction === 'down') return [{ translateY: Animated.multiply(translate, -1) }];
        if (direction === 'left') return [{ translateX: translate }];
        if (direction === 'right') return [{ translateX: Animated.multiply(translate, -1) }];
        return [];
    };

    return (
        <Animated.View
            style={[
                style,
                {
                    opacity,
                    transform: getTransform(),
                },
            ]}
        >
            {children}
        </Animated.View>
    );
}
