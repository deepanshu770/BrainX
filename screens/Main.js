import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Player from "./Player";
import Start from "./Start";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createSharedElementStackNavigator();
const Main=() =>{
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="main" component={Start} />
      <Stack.Screen name="player" component={Player}
      sharedElements={(route)=>{
        return [route.params.id]
      }} />
    </Stack.Navigator>
  );
}
export default Main
