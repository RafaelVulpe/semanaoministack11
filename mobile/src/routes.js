import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Casos from './pages/Casos';
import Detalhes from './pages/Detalhes';

const appStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
        <appStack.Navigator screenOptions={{ headerShown: false }}>
            <appStack.Screen name="Casos" component={Casos} />
            <appStack.Screen name="Detalhes" component={Detalhes} />
        </appStack.Navigator>
        </NavigationContainer>        
    );
}

