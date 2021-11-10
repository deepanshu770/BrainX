import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Onboard from "./screens/Onboard";
import Main from "./screens/Main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
const Stack = createStackNavigator();
const App = () => {
  const [First, setFirst] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem("isFirstLaunched").then((value) => {
      if (value == null) {
        setFirst(true);
        AsyncStorage.setItem("isFirstLaunched", "true");
      } else {
        setFirst(false);
      }
    });
  }, []);
  if (First === true) {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboard" component={Onboard} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  }
  else if(First==null)
  {
return<></>
  } else {
    return <Main />;
  }
};

export default App;
