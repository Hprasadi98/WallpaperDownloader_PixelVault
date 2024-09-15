import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react'
import { View, Text, Pressable,StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';

function HomeScreen() {
    const {top} = useSafeAreaInsets();
    const paddingTop = top>0 ? top+10 : 30;
  return (
    <View style={[styles.container, {paddingTop}]}>
        <View style={styles.header}>
            <Pressable>
                <Text style={styles.title}>PixelVault</Text>
            </Pressable>
            <Pressable>
                <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)}/>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        gap:15
    },
    header:{
        marginHorizontal: wp(4),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    title:{
        fontSize: hp(4),
        fontWeight:theme.fontweights.semibold,
        color:theme.colors.neutral(0.9),
    }
})

export default HomeScreen