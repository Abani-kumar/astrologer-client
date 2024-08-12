import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import Icon1 from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Astrologer from "../../components/Astrologer";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackNavigatorType } from "../../navigation/types";
import Icon3 from "react-native-vector-icons/Ionicons";
import { searchApi } from "../../services/service";
import { astrologerData } from "../..";

type DetailsScreenProp = StackNavigationProp<AppStackNavigatorType, "Details">;

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [astrologers, setAstrologers] = useState<astrologerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState<boolean>(true);
  const navigation1 = useNavigation();
  const navigation = useNavigation<DetailsScreenProp>();

  const getAstrologer = async () => {
    try {
      setLoadingText(false);
      setLoading(true);
      let result = await searchApi(search);
      setAstrologers(result.astrologers);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <Pressable
          onPress={() => {
            navigation1.goBack();
          }}
        >
          <Icon1
            name="arrowleft"
            size={25}
            color="black"
            adjustsFontSizeToFit
          />
        </Pressable>
        <TextInput
          value={search}
          onChangeText={(value) => setSearch(value)}
          placeholder="Find Astrologer"
          style={styles.search_container}
          placeholderTextColor={"black"}
          returnKeyType="search" // Changes the return key to "Search"
          onSubmitEditing={() => getAstrologer()} // Triggered when the search button is pressed
        />
      </View>
      {loadingText && (
        <View style={styles.text_container}>
          <Text style={styles.text}>Search our top astrologers</Text>
          <View style={styles.icon_container}>
            <Icon3 name="call" size={20} color="black" />
            <Text style={styles.text}>
              Get a free call from astrologer today
            </Text>
          </View>
        </View>
      )}
      {loading ? (
        <View style={styles.loading_container}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <FlatList
          data={astrologers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate("Details", { id: item._id });
              }}
            >
              <Astrologer astrologer={item} />
            </Pressable>
          )}
        />
      )}
      {!loading && astrologers.length === 0 && search.trim().length > 2 && (
        <View style={styles.no_found_container}>
          <Text style={styles.no_found_container_text}>
            No astrologers found
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  inputcontainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 5,
    borderBottomColor: "#666600",
    borderBottomWidth: 1,
  },
  search_container: {
    flex: 1,
    color: "black",
    fontSize: 20,
  },
  no_found_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  no_found_container_text: {
    color: "black",
    fontWeight: "900",
    fontSize: 20,
  },
  loading_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_container: {
    flexDirection: "column",
    gap: 20,
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  icon_container: {
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
