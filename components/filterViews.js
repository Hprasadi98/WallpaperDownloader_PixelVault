import { Pressable, StyleSheet, Text, View } from "react-native"
import { theme } from "../constants/theme"
import { capitalize, hp } from "../helpers/common"

export const SelctionView = ({title, content}) =>{
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View>
            {content}
        </View>
      </View>
    )
  }

export  const CommonFilterRow = ({data, filterName, filters, setFilters}) => {
    const onSelect = (item) => {
      console.log(`Selected item: ${item}`);
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: item,
    }));
    }
    return(
      <View style={styles.flexRowWrap}>
        {data && data.map((item, index) => {
                let isActive = filters && filters[filterName] === item;
                return (
                    <Pressable
                        onPress={() => onSelect(item)}
                        key={item}
                        style={[styles.outlinedButton, {backgroundColor: isActive? theme.colors.neutral(0.7) : 'white'}]}
                    >
                        <Text style={[styles.outlinedButtonText, {color: isActive? 'white' : theme.colors.neutral(0.7)}]}>{capitalize(item)}</Text>
                    </Pressable>
                );
            })}
      </View>
    )
  }

const styles = StyleSheet.create({
    sectionContainer:{
        gap:8,
    },
    sectionTitle:{
        fontSize:hp(2.4),
        fontWeight:theme.fontweights.medium,
        color:theme.colors.neutral(0.8)
    },
    flexRowWrap:{
        gap:10,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    outlinedButton:{
        padding:8,
        paddingHorizontal:14,
        borderWidth:1,
        borderColor:theme.colors.grayBG,
        borderRadius:theme.radius.xs,
        borderCurve:'continuous',
    }
})