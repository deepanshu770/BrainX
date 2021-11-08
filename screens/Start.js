import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
  View,
  Text,
  Image,
  StatusBar,
} from "react-native";
import beatsData from "../data/BeatsData";
// import ImageSlider from "./components of Start/ImageSlider";
import Title from "./components of Start/Title";
import BottomBar from "./components of Start/BottomBar";
import PlayButton from "./components of Start/PlayButton";
import { SharedElement } from "react-navigation-shared-element";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  scrollTo,
  useDerivedValue
} from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

const Start = ({ navigation }) => {
  // const delay = ms =>new Promise(resolve=>setTimeout(resolve,ms));
  const [currentIndex, setcurrentIndex] = useState(0);

  const viewTranslateY = useSharedValue(-200);
  const scrollOffset = useSharedValue(0);
  const scrollRef = useAnimatedRef()

  useDerivedValue(()=>{
    scrollTo(scrollRef,scrollOffset.value,0,true);
    
  },[])

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: viewTranslateY.value }],
    };
  }, []);

  useEffect(() => {
    viewTranslateY.value = withTiming(0, {
      duration: 1000,
    });
  }, []);
  const updateSlideIndex = (e) => {
    const currentIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setcurrentIndex(currentIndex);
    viewTranslateY.value = withTiming(0, {
      duration: 800,
    });
  };

  

  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  
  });

  return (
    <SafeAreaView style={styles.container}>
    
      <Animated.ScrollView
        horizontal
        ref={scrollRef}
        onMomentumScrollEnd={updateSlideIndex}
        style={{ flexGrow: 0, width, height: height * 0.5 }}
        pagingEnabled
        onScrollBeginDrag={() => {
          viewTranslateY.value = withTiming(-250, {
            duration: 500,
          });
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {beatsData.map((item, index) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("player", item)
              }
            >
              <View style={[styles.main_image_container]} key={index}>
                <View>
                  <SharedElement id={item.id}>
                    <Image style={{ ...styles.image }} source={item.image} />
                  </SharedElement>
                </View>
              </View>
            </Pressable>
          );
        })}
      </Animated.ScrollView>

      {/* <ImageSlider
        scrollX={scrollX}
        beatsData={beatsData}
        updateSlideIndex={updateSlideIndex}
        scrollHandler={scrollHandler}
      /> */}
      <Title scrollX={scrollX} beatsData={beatsData} />
      <View style={{ overflow: "hidden" }}>
        <Animated.View
          style={[
            {
              marginTop: 30,
              overflow: "hidden",
              alignItems: "center",
              height: height * 0.2,
              width,
            },
            rStyle,
          ]}
        >
          {beatsData[currentIndex].benefits.map((item, index) => {
            return (
              <Animatable.View
                style={[
                  {
                    backgroundColor: "white",
                    borderRadius: 9,
                    marginBottom: 6,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    letterSpacing: 2.5,
                    padding: 6,
                    color: "black",
                    fontFamily: "Ubuntu-Regular",
                  }}
                >
                  {item.heading}
                </Text>
              </Animatable.View>
            );
          })}
        </Animated.View>
      </View>
      <PlayButton navigation={navigation} currentIndex={currentIndex} />
      <BottomBar
      currentIndex={currentIndex}
      setcurrentIndex={setcurrentIndex}
        scrollOffset={scrollOffset}
        beatsData={beatsData}
        scrollX={scrollX}
      />
    </SafeAreaView>
  );
};


export default Start;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(240, 240, 240)",
  },
  main_image_container: {
    width,
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.5,
    flex: 1,
  },
  image_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 350,
    width: 350,
    resizeMode: "contain",
    borderRadius: 6,
  },
});
