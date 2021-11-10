import React, { memo } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Animated, {
  Easing,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
const { height, width } = Dimensions.get("window");

const BottomBar = ({
  currentIndex,
  setcurrentIndex,
  scrollOffset,
  beatsData,
  scrollX,
}) => {
  const xPosition = useSharedValue([]);
  const indiWidth = useSharedValue([]);
  const arrOfX = [];
  const arrOfWidth = [];

  const measure = (e) => {
    arrOfX.push(e.nativeEvent.layout.x);
    arrOfWidth.push(e.nativeEvent.layout.width);
    if (arrOfX.length === beatsData.length) {
      xPosition.value = arrOfX;
      indiWidth.value = arrOfWidth;
    }
  };

  //Indicator Component of BottomBar
  const Indicators = memo(() => {
    const inputRange = beatsData.map((_, index) => index * width);
    const animatedStyle = useAnimatedStyle(() => {
      const translateX =
        xPosition.value.length === 0
          ? 0
          : interpolate(scrollX.value, inputRange, xPosition.value);
      const width =
        indiWidth.value.length === 0
          ? 0
          : interpolate(scrollX.value, inputRange, indiWidth.value);
      return {
        transform: [{ translateX }],
        width,
      };
    });

    return <Animated.View style={[styles.indicator, animatedStyle]} />;
  });

  return (
    <View style={styles.bottembar_container}>
      {beatsData.map((item, index) => {
        return (
          <>
            <View key={`${index}iskey`} onLayout={measure}>
              {item.icon === "user-graduate" ? (
                <TouchableOpacity
                  onPress={() => {
                    scrollOffset.value = withTiming(index * width, {
                      duration: 700,
                    });
                    setcurrentIndex(index);
                  }}
                >
                  <FontAwesome5
                    style={{
                      ...styles.icon,
                      color: currentIndex === index ? "black" : "grey",
                    }}
                    name={item.icon}
                    size={30}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    scrollOffset.value = withTiming(index * width, {
                      duration: 700,
                    });
                    setcurrentIndex(index);
                  }}
                >
                  <MaterialCommunityIcons
                    style={{
                      ...styles.icon,
                      color: currentIndex === index ? "black" : "grey",
                    }}
                    name={item.icon}
                    size={30}
                  />
                </TouchableOpacity>
              )}
            </View>
          </>
        );
      })}
      <View style={styles.indicator_container}>
        <Indicators />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: "100%",
    width: "100%",
    padding: "3%",
  },
  bottembar_container: {
    width,
    height: 65,
    borderTopColor: "black",
    borderTopWidth: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  indicator_container: {
    position: "absolute",
    bottom: 1,
    height: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  indicator: {
    width: "20%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "black",
  },
});

export default memo(BottomBar);
