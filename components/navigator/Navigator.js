import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Home from '../screens/Home';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

function MyTabBar( { state, descriptors, navigation } ) {

    return (
        <View style={{ backgroundColor: '#fff' }}>
            <View style={styles.tabConatiner}>
                {state.routes.map( ( route, index ) => {
                    const { options } = descriptors[route.key];
                    // console.log( options )
                    const { tabBarIcon } = options
                    console.log( tabBarIcon )
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit( {
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        } );

                        if ( !isFocused && !event.defaultPrevented ) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate( { name: route.name, merge: true } );
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit( {
                            type: 'tabLongPress',
                            target: route.key,
                        } );
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        >
                            {route.name === 'Orders' && <MaterialCommunityIcons name='dog' size={25} color={isFocused ? '#c48c54' : '#B9B0B0'} />}
                            {route.name === 'Finance' && <FontAwesome name='money' size={25} color={isFocused ? '#c48c54' : '#B9B0B0'} />}
                            {route.name === 'Help' && <MaterialIcons name='support-agent' size={25} color={isFocused ? '#c48c54' : '#B9B0B0'} />}
                            <Text style={{ color: isFocused ? '#c48c54' : '#716464' }}>
                                {route.name}
                            </Text>
                        </TouchableOpacity>
                    );
                } )}
            </View>
        </View>
    );
}

const Navigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                style={{ backgroundColor: '#000' }}
                tabBar={props => <MyTabBar {...props} />}
                screenOptions={{
                    headerShown: false
                }}>
                <Tab.Screen name="Orders" component={Home} />
                <Tab.Screen name="Finance" component={Home} />
                <Tab.Screen name="Help" component={Home} />

            </Tab.Navigator>
        </NavigationContainer>
    )
}
export default Navigator;

const styles = StyleSheet.create( {
    tabConatiner: {
        flexDirection: 'row',
        height: 70,
        elevation: 5,
        backgroundColor: '#fff'
    }
} )