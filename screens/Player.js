import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import Sound from "react-native-sound";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
// import Artwork from './components of Player/ArtWork'
import * as Animatable from "react-native-animatable";

import Title from "./components of Player/Title";
// import Artwork from "./components of Player/ArtWork";

import { SharedElement } from "react-navigation-shared-element";


const { width, height } = Dimensions.get("window");
Sound.setCategory("Playback");
const Player = ({ navigation, route }) => {
  const ref = useRef(false);
  const [playback, setplayback] = useState(false);
  const item = route.params;
  const iconAnimaton = {
    0: { opacity: 0, transform: [{ scale: 0 }] },
    1: { opacity: 1, transform: [{ scale: 1 }] },
  };
  const sliderBarAnimation = {
    0: { width: 0 },
    1: { width: width },
  };
  const song = new Sound(item.uri, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log("failed to load the sound", error);
      return;
    }
    // loaded successfully
    console.log(
      "duration in seconds: " +
        song.getDuration() +
        "number of channels: " +
        song.getNumberOfChannels()
    );
  });

  const playpauseSound = () => {
    if (!ref.current) {
      console.log("play");
      song.play();

      ref.current = true;
    } else {
      console.log("pause");
      song.pause();
      ref.current = false;
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: item.bgColor }}>
      <StatusBar hidden />
      <TouchableOpacity onPress={() => {navigation.goBack();
      song.pause();}}>
        <Ionicons style={styles.icon} name="close" size={35} />
      </TouchableOpacity>
      <View>
        <Title
          title={item.title}
          id={item.id}
          frequency_gap={item.frequency_gap}
          color={item.color}
        />
      </View>

      <View style={styles.main_container}>
        <View style={styles.image_container}>
          <SharedElement id={item.id}>
            <Image style={styles.image} source={item.image} />
          </SharedElement>
        </View>
      </View>
      <Animatable.View
        animation={sliderBarAnimation}
        delay={500}
        duration={700}
        style={{
          marginTop: 35,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          
        }}
      >
        <Slider
          style={{
            width: "93%",
          }}
          value={0}
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor={item.color}
          maximumTrackTintColor="black"
          onValueChange={(value) => console.log(value)}
          onSlidingComplete={() => console.log("complete")}
        />
      </Animatable.View>
      <Animatable.View
        animation={iconAnimaton}
        delay={300}
        useNativeDriver
        duration={700}
        style={{
          justifyContent: "center",
          alignItems: "center",
          

          marginTop: 30,
        }}
      >
        <Pressable onPress={()=>{playpauseSound()
        }}>
          <Ionicons
            color="black"
            size={45}
            name={playback ? "pause" : "play"}
          />
        </Pressable>
        <Animatable.View
          animation={iconAnimaton}
          delay={300}
          useNativeDriver
          duration={700}
          style={{ alignItems: "center", position: "absolute", right: 30 }}
        >
          <TouchableOpacity>
            <Ionicons color="black" size={35} name="repeat" />
            <Text>Repeat</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 9,
    top: StatusBar.currentHeight + 10,
    zIndex: 34,
  },
  main_container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'blue',
    marginTop: 40,
  },
  image_container: {
    width: width,
    height: height * 0.5,

    overflow: "hidden",
    // backgroundColor:'red'
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default Player;
