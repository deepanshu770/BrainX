import React, { memo } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Animated,{ interpolate, useAnimatedStyle } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
const titleContainerHeight = 40;
const Title = ({scrollX,beatsData}) => {
    // const titleAnimation = scrollX.interpolate({
    //     inputRange: [-width, 0, width],
    //     outputRange: [titleContainerHeight, 0, -titleContainerHeight],
    //   });
    const animatedStyle = useAnimatedStyle(()=>{
      const translateY=interpolate(scrollX.value,[
        -width, 0, width
      ],
      [
        titleContainerHeight, 0, -titleContainerHeight
      ]);
      return{
        transform: [{ translateY }]
      };
    })
      return (
        <View style={[styles.title_container]}>
          {beatsData.map((item, index) => {
            return (
              <Animated.View
                key={index}
                style={[{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  height: titleContainerHeight,
                },animatedStyle]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={[styles.frequency,{color:item.color}]}>{item.frequency_gap}</Text>
              </Animated.View>
            );
          })}
        </View>
      );
}

const styles = StyleSheet.create({
    title_main_container: {
        height: height * 0.09,
        width,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
      },
      title_container: {
        width: '70%',
        height: titleContainerHeight,
        overflow: 'hidden',
      },
      title: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: 2,
        color: 'black',
        textTransform: 'uppercase',
      },
      frequency: {
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: '300',
      },
})

export default memo(Title)
