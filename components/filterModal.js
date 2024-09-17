import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

const FiltersModal = ({modalRef}) => {
    const snapPoints = useMemo(()=>['75%'],[]);

  return (
    <BottomSheetModal
        ref={modalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
    >
        <BottomSheetView style={styles.contentContainer}>
            <Text>Awesom 😍</Text>
        </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({

})

export default FiltersModal