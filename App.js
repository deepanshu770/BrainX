import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text,View,Button,ScrollView } from "react-native";
import Onboard from "./screens/Onboard";
// import Main from "./screens/Main";
import { scrollTo, useAnimatedRef, useDerivedValue, useSharedValue } from "react-native-reanimated";

const App = () => {
  const Stack = createStackNavigator();
  // const Comp = () => {
  //   const aref = useAnimatedRef();
  //   const scroll = useSharedValue(0);
  
  //   useDerivedValue(() => {
  //     scrollTo(aref, 0, scroll.value * 100, true);
  //   });
  
  //   const items = Array.from(Array(10).keys());
  
  //   return (
  //     <View>
  //       <Button
  //         title="scroll down"
  //         onPress={() => {
  //           scroll.value = scroll.value + 1;
  //           if (scroll.value >= 10) scroll.value = 0;
  //         }}
  //       />
  //       <View style={{ width: 120, height: 200, backgroundColor: 'green' }}>
  //         <ScrollView
  //           ref={aref}
  //           style={{ backgroundColor: 'orange', width: 120 }}>
  //           {items.map((_, i) => (
  //             <View
  //               key={i}
  //               style={{
  //                 backgroundColor: 'white',
  //                 width: 100,
  //                 height: 100,
  //                 margin: 10,
  //               }}
  //             />
  //           ))}
  //         </ScrollView>
  //       </View>
  //     </View>
  //   );
  // };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboard" component={Onboard} />
          {/* <Stack.Screen name="Main" component={Main} />  */}
         </Stack.Navigator>
      </NavigationContainer> 
  {/* <Comp/> */}
  
    </>
  );
};

export default App;
