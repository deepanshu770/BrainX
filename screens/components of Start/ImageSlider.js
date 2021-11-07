import React, { memo } from 'react'
import { View,Text, StyleSheet,FlatList, Dimensions, ScrollView, Pressable } from 'react-native'
import Animated,{ useAnimatedScrollHandler } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');


const ImageSlider = ({beatsData,scrollHandler,updateSlideIndex}) => {
    

    return (
        <View>
        <Animated.ScrollView
        
        horizontal
        onMomentumScrollEnd={updateSlideIndex}
        style={{flexGrow: 0,
          width,
          height: height * 0.5}}
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        >
          {beatsData.map((item,index)=>{
            return(
              <View style={[styles.main_image_container]} key={index}>
            <Animated.View
              style={{ ...styles.image_container}}>
              
            
              <Animated.Image
                style={{ ...styles.image,}}
                source={item.image}
              />
        
            
            
            </Animated.View>
          </View>
            )

          })}
        </Animated.ScrollView>
      </View>
    )
}

const styles=StyleSheet.create({
    main_image_container: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.5,
        flex: 1,
      },
      image_container: {
        
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        height: 350,
        width: 350,
        resizeMode: 'contain',
      },
})

export default memo(ImageSlider)
