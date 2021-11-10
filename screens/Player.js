import React, { memo, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import * as Animatable from "react-native-animatable";

import Title from "./components of Player/Title";


import { SharedElement } from "react-navigation-shared-element";

import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { useSharedValue } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const Player = ({ navigation, route }) => {
  const slideValue = useSharedValue();
  const [repeat, setRepeat] = useState(false);
  const [playBack, setplayBack] = useState(true)
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const item = route.params;
  useEffect(() => {
    setUpPlayer();
  }, []);
  const setUpPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer({
        waitForBuffer: true,
      });
      await TrackPlayer.updateOptions({
        capabilities: [Capability.Pause, Capability.Play],
      });
      await TrackPlayer.add(item);
      TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  const togglePlayBack = async () => {
    const currentTrack = TrackPlayer.getCurrentTrack();

    if (currentTrack) {
      if (playBackState == State.Paused) {
        TrackPlayer.play();
        setplayBack(true);
      } else {
        TrackPlayer.pause();
        setplayBack(false);
      }
    }
  };

  const iconAnimaton = {
    0: { opacity: 0, transform: [{ scale: 0 }] },
    1: { opacity: 1, transform: [{ scale: 1 }] },
  };
  const sliderBarAnimation = {
    0: { width: 0 },
    1: { width: width },
  };
  const timeAnimation = {
    0: { opacity: 0 },
    1: { opacity: 1 },
  };
  const changeHandler =(value) => {
    TrackPlayer.seekTo(value);
    console.log(playBackState);
  };
  const toggleRepeat = async () => {
    if (repeat) {
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeat(false);
      const mode =TrackPlayer.getRepeatMode();
      console.log(mode);
    } else {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeat(true);
      const mode =TrackPlayer.getRepeatMode();
      console.log(mode);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: item.bgColor }}>
    <StatusBar backgroundColor={item.bgColor}/>
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
      <View style>
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
          value={progress.position}
          maximumValue={progress.duration}
          minimumValue={0}
          minimumTrackTintColor={item.color}
          maximumTrackTintColor="black"
          thumbTintColor={item.color363}
          // onValueChange={(value) => console.log(value)}
          onSlidingComplete={changeHandler}
        />
      </Animatable.View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animatable.View
          animation={timeAnimation}
          duration={2000}
          delay={800}
          useNativeDriver
          style={{
            height: 30,
            marginTop: 12,
            width: width * 0.9,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: item.color,
            }}
          >
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: item.color,
            }}
          >
            {new Date(progress.duration * 1000).toISOString().substr(14, 5)}
          </Text>
        </Animatable.View>
      </View>
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
        <TouchableOpacity onPress={() => togglePlayBack()}>
          <Ionicons
            color="black"
            size={45}
            name={playBack?"pause":
              "play"
               
            }
          />
        </TouchableOpacity>
        <Animatable.View
          animation={iconAnimaton}
          delay={300}
          useNativeDriver
          duration={700}
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              toggleRepeat();
            }}
          >
            <MaterialCommunityIcons
              style={{
                left: 17,
              }}
              color={repeat?item.color:"grey"}
              size={25}
              name={repeat?"repeat-once":"repeat"}
            />
            <Text style={{
              color:'black'
            }}>{repeat?'Repeat On':'Repeat Off'}</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 15,
    top: StatusBar.currentHeight + 3,
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

export default memo(Player);
