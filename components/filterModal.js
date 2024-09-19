import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useMemo } from 'react'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { BlurView } from 'expo-blur'
import Animated, { Extrapolation, FadeInDown, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import {wp, hp, capitalize} from '../helpers/common'
import {theme} from '../constants/theme'
import { ColorFilter, CommonFilterRow, SelctionView } from './filterViews'
import { data } from '../constants/data'

const FiltersModal = ({
  modalRef,
  onClose,
  onApply,
  onReset,
  filters,
  setFilters
}) => {
    const snapPoints = useMemo(()=>['75%'],[]);

  return (
    <BottomSheetModal
        ref={modalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={customBackdrop}
    >
        <BottomSheetView style={styles.contentContainer}>
            <View style={styles.content}>
              <Text style={styles.filterText}>Filters</Text>
              {
                Object.keys(sections).map((sectionName, index)=>{
                  let sectionView = sections[sectionName];
                  let sectionData = data.filters[sectionName];
                  let title = capitalize(sectionName);
                  return (
                    <Animated.View
                      entering={FadeInDown.delay((index*100)+100).springify().damping(11)}
                      key={sectionName}>
                      <SelctionView
                        title={title}
                        content={sectionView({
                          data: sectionData,
                          filters,
                          setFilters,
                          filterName: sectionName
                        })}
                      />
                    </Animated.View>
                  )
                })
              } 
                 <Animated.View
                  entering={FadeInDown.delay(500).springify().damping(11)}
                  style={styles.buttons}>
                  <Pressable style={styles.resetButton} onPress={onReset}>
                    <Text style={[styles.buttonText, {color:theme.colors.neutral(0.9)}]}>Reset</Text>
                  </Pressable>
                  <Pressable style={styles.applyButton} onPress={onApply}>
                    <Text style={[styles.buttonText, {color:theme.colors.white}]}>Apply</Text>
                  </Pressable>
                  </Animated.View>          
            </View>
        </BottomSheetView>
    </BottomSheetModal>
  )
}

const sections = {
  "order": (props) => <CommonFilterRow {...props} />,
  "orientation": (props) => <CommonFilterRow {...props} />,
  "type": (props) => <CommonFilterRow {...props} />,
  "colors": (props) => <ColorFilter {...props} />
}

const customBackdrop =({animatedIndex, style})=>{
  const containerAnimatedStyle = useAnimatedStyle(()=>{
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0], [0, 1],
      Extrapolation.CLAMP
    )
    return {opacity}
  })
  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle
  ]
  return(
    <Animated.View style={containerStyle}>
      <BlurView
        style={StyleSheet.absoluteFill}
        tint='dark'
        intensity={50}
        />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  contentContainer:{
    flex:1,
    alignItems:'center',
  },
  overlay:{
    backgroundColor: 'rgba(0,0,0,0.5'
  },
  content:{
    flex:1,
    gap:15,
    paddingVertical:10,
    paddingHorizontal:20
  },
  filterText:{
    fontSize: hp(4),
    fontWeight: theme.fontweights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom:5
  },
  buttons:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  applyButton:{
    flex:1,
    backgroundColor:theme.colors.neutral(0.8),
    padding:12,
    borderRadius:theme.radius.md,
    justifyContent:'center',
    alignItems:'center',
    borderCurve:'continuous'
  },
  resetButton:{
    flex:1,
    backgroundColor:theme.colors.neutral(0.03),
    padding:12,
    borderRadius:theme.radius.md,
    justifyContent:'center',
    alignItems:'center',
    borderCurve:'continuous',
    borderWidth:2,
    borderColor:theme.colors.grayBG
  },
  buttonText:{
    fontSize:hp(2.2)
  }
})

export default FiltersModal