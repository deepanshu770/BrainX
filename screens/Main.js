import React from "react";
import Player from "./Player";
import Start from "./Start";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createSharedElementStackNavigator();
const Main=() =>{
  return (
    <NavigationContainer independent={true}>
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
    </NavigationContainer>
  );
}
export default Main
