import React, { memo } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View,TouchableOpacity } from 'react-native'
import beatsData from '../../data/BeatsData';

const PlayButton = ({ navigation,currentIndex }) => {
    return (

        <View style={styles.btn_container}>
        <TouchableOpacity onPress={()=>navigation.push('player',beatsData[currentIndex])}>
                <View style={[styles.btn,{backgroundColor:beatsData[currentIndex].color}]}>
                  <FontAwesome5 style={{ color: 'white' }} name="play" size={20} />
                  
                </View>
              </TouchableOpacity>
              </View>
    )
}
const styles = StyleSheet.create({
    btn_container: {
        width: 130,
        height: 55,
        justifyContent:'center',
        alignContent:'center',
        // backgroundColor: 'cyan',
        position: 'absolute',
        bottom: 80,
        flexDirection: 'row',
        overflow: 'hidden',
      },
      btn: {
        width: 100,
        height: 45,
        borderRadius: 17,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
       
      },
})

export default memo(PlayButton)

