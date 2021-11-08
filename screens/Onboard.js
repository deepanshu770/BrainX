import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import beatsData from "../data/BeatsData";

const { height, width } = Dimensions.get("window");

export default function Onboard({ navigation }) {
  const [currentSlideIndex, setcurrentSlideIndex] = React.useState(0);
  const ref = useAnimatedRef();
  const scrollIndex = useSharedValue(0);
  const onBoardContent = [
    {
      title: "Welcome to Binaural Beats",
      desc: "Beats that can improve your brain thinking power and ability to learn",
      image: require("../img/onboard-img-1.png"),
    },
    {
      title: "Use Good Quality Earphones",
      desc: "To get the best benefits of binaural beats",
      image: require("../img/onboard-img-2.png"),
    },
    {
      title: "Mental Peace",
      desc: "Listening only 10 minutes can relax your mind and enhance you mood",
      image: require("../img/onboard-img-3.png"),
    },
  ];
  const scrollX = useSharedValue(0);

   useDerivedValue(()=>{
    scrollTo(ref,scrollIndex.value*width,0,true);
   },[])

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  const updateSlideIndex = (e) => {
    const currentIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setcurrentSlideIndex(currentIndex);
  };
  const goToNext = () => {
    scrollIndex.value = currentSlideIndex+1;

    setcurrentSlideIndex(currentSlideIndex+1);
  };
  const goToPrevious = () => {
    scrollIndex.value = currentSlideIndex-1;

    setcurrentSlideIndex(currentSlideIndex-1);
  };
  const goTOEnd = () => {
    scrollIndex.value = currentSlideIndex+(beatsData.length-1);

    setcurrentSlideIndex(currentSlideIndex+(beatsData.length-1));
  };

  const Indicators = () => {
    return (
      <>
        <View style={styles.indicator_container}>
          {onBoardContent.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const aStyle = useAnimatedStyle(() => {
              const backgroundColor = interpolateColor(
                scrollX.value,
                inputRange,
                ["grey", "black", "grey"]
              );
              const width = interpolate(
                scrollX.value,
                inputRange,
                [10, 20, 10],
                Extrapolate.CLAMP
              );
              return {
                width,
                backgroundColor,
              };
            });
            return (
              <Animated.View key={index} style={[styles.indicator, aStyle]} />
            );
          })}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        ref={ref}
        scrollEventThrottle={16}
        onMomentumScrollEnd={updateSlideIndex}
        pagingEnabled
        onScroll={scrollHandler}
        contentContainerStyle={{ height: height * 0.75 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {onBoardContent.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const aStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              scrollX.value,
              inputRange,
              [0.5, 0.95, 0.5]
            );
            return {
              transform: [{ scale }],
            };
          });
          const titleAnimation = useAnimatedStyle(() => {
            const translateX = interpolate(
              scrollX.value,
              inputRange,
              [width*.70, 0, -width*.70]
            );
            return {
              transform: [{ translateX }],
            };
          });
          const descAnimation = useAnimatedStyle(() => {
            const translateX = interpolate(
              scrollX.value,
              inputRange,
              [width*.90, 0, -width*.90]
            );
            return {
              transform: [{ translateX }],
            };
          });
          return (
            <View
              key={index}
              style={{ alignItems: "center", width: width, height: "75%" }}
            >
              <Animated.Image
                source={item.image}
                style={[styles.image, aStyle]}
              />
              <Animated.Text style={[styles.title, titleAnimation]}>
                {item.title}
              </Animated.Text>
              <Animated.Text style={[styles.desc,descAnimation]}>{item.desc}</Animated.Text>
            </View>
          );
        })}
      </Animated.ScrollView>

      <View style={styles.footer}>
        <Indicators />

        {currentSlideIndex < onBoardContent.length - 1 ? (
          <View style={styles.btn_container}>
            {currentSlideIndex === 0 ? (
              <>
                <TouchableOpacity
                  onPress={goTOEnd}
                  style={{ ...styles.btn, backgroundColor: "#6c22e4" }}
                >
                  <Text style={{ ...styles.btn_text, color: "white" }}>
                    Skip
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity onPress={goToPrevious} style={styles.btn}>
                  <Text style={styles.btn_text}>Previous</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={goToNext} style={styles.btn}>
              <Text style={styles.btn_text}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.btn_container}>
            <TouchableOpacity style={styles.btn}>
              <Text onPress={goToPrevious} style={styles.btn_text}>
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.btn, backgroundColor: "#6c22e4" }}
            >
              <Text
                style={{ ...styles.btn_text, color: "white" }}
                onPress={() => navigation.replace("Main")}
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 29,
    fontFamily: "BebasNeue-Regular",
    color: "black",
    marginTop: 30,
  },
  image: {
    height: "75%",
    width,
    resizeMode: "cover",
    top: 20,
    transform: [{ scale: 1.2 }],
  },
  desc: {
    color:'black',
    fontSize: 17,
    textAlign: "center",
    fontFamily: "NunitoSans-Regular",
    maxWidth: "70%",
    marginTop: 25,
  },
  footer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: height * 0.25,
  },
  indicator: {
    height: 3.7,
    backgroundColor: "grey",
  },
  indicator_container: {
    width: 45,
    top: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 40,
    width: width,
  },
  btn: {
    borderWidth: 1,
    borderColor: "#6c22e4",
    justifyContent: "center",
    borderRadius: 6,
    alignItems: "center",
    width: 130,
    height: 50,
  },
  btn_text: {
    fontSize: 20,
    color: "#6c22e4",
    fontWeight: "bold",
  },
});
