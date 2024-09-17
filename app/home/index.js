import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import Categories from "../../components/categories";
import { apiCall } from "../../api";
import ImageGrid from "../../components/imageGrid";
import {debounce} from 'lodash'
import FiltersModal from "../../components/filterModal";

var page=1;

function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(()=> {
    fetchImages();
  },[]);

  const fetchImages = async (params={page:1}, append=false) => {
    let res = await apiCall(params);
    console.log('Success');
    if(res.success && res?.data?.hits){
      if(append){
        setImages([...images,...res.data.hits]);
      }else{
        setImages([...res.data.hits]);
      }
    }
  }

  const handlechangecategory = (cat)=>{
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page=1;
    let params ={
      page,
    }
    if(cat) params.category=cat;
    fetchImages(params, false);
  }

  const handleSearch =(text)=>{
    setSearch(text);
    if(text.length>2){
      page=1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({page, q:text}, false);
    }
    if(text==""){
      page=1;
      setImages([]);
      setActiveCategory(null);
      searchInputRef.current.clear();
      fetchImages({page},false);
    }
  }

  const handleTextDebounce =useCallback(debounce(handleSearch, 400), []);

  const clearSearch =()=>{
    setSearch("");
    searchInputRef.current.clear();
  }

  const openFilterModal = ()=>{
    modalRef?.current?.present();
  }

  const closeFilterModal = ()=>{
    modalRef?.current?.close();
  }

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>PixelVault</Text>
        </Pressable>
        <Pressable onPress={openFilterModal}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            ref={searchInputRef}
            onChangeText={handleTextDebounce}
            style={styles.searchInput}
          />
          {search && (
            <Pressable onPress={()=>handleSearch("")} style={styles.closeIcon}>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.categories}>
          <Categories activeCategory={activeCategory} handlechangecategory={handlechangecategory}/>
        </View>
        <View>
          {
            images.length > 0 && <ImageGrid images={images}/>
          }
        </View>
      </ScrollView>
      <FiltersModal modalRef={modalRef}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontweights.semibold,
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
});

export default HomeScreen;
