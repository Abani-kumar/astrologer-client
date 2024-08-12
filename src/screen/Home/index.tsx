import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/AntDesign";
import Astrologer from "../../components/Astrologer";
import { getAllAstrologer } from "../../services/service";
import { expertiseAreas, indianLanguages, sortby } from "../../constants";
import Checkbox from "../../components/Checkbox";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackNavigatorType } from "../../navigation/types";
import { FAB } from "react-native-paper";
import { astrologerData, filterData, Item } from "../..";
import ModalComponent from "../../components/Modal";

type DetailsScreenProp = StackNavigationProp<AppStackNavigatorType, "Details">;
type AddAstrologerScreenProp = StackNavigationProp<
  AppStackNavigatorType,
  "AddAstrologer"
>;

const Home = () => {
  const navigation = useNavigation<DetailsScreenProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [astrologers, setAstrologers] = useState<astrologerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortFilter, setSortFilter] = useState<string>("");
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [expertiseFilter, setExpertiseFilter] = useState<string>("");
  const [isDataAvailable, setDataAvailable] = useState<boolean>(true);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [filter, setFilter] = useState<filterData>({
    language: [],
    expertise: [],
    sort: "",
  });
  const [count, setCount] = useState(0);
  function sortFilteration() {
    const sortMapping: { [key: string]: string } = {
      "Experience: High to Low": "experienceSort=-1",
      "Experience: Low to High": "experienceSort=1",
      "Price: High to Low": "priceSort=-1",
      "Price: Low to High": "priceSort=1",
    };

    return sortMapping[filter.sort] || "";
  }

  function languageFilteration() {
    const stringApi = filter.language.join("+");
    return stringApi ? `language=${stringApi}` : "";
  }

  function expertiseFilteration() {
    const stringApi = filter.expertise.join("+");
    return stringApi ? `expertise=${stringApi}` : "";
  }

  const apiFiltration = () => {
    const apiFilterSort = sortFilteration();
    const apiFilterLanguage = languageFilteration();
    const apiFilterExpertise = expertiseFilteration();
    setSortFilter(apiFilterSort);
    setLanguageFilter(apiFilterLanguage);
    setExpertiseFilter(apiFilterExpertise);
    let apiFilter = [
      apiFilterSort,
      apiFilterLanguage !== "language=" ? apiFilterLanguage : "",
      apiFilterExpertise !== "expertise=" ? apiFilterExpertise : "",
    ]
      .filter(Boolean)
      .join("&");

    return apiFilter;
  };
  const getAstrologer = async () => {
    setModalVisible(false);
    try {
      setLoading(true);
      let result;
      setCurrentPage(1);
      if (filter.sort !== "") {
        let apiFilter = apiFiltration();
        result = await getAllAstrologer(1, 20, apiFilter);
      } else if (
        filter.language.length > 0 ||
        filter.expertise.length > 0 ||
        filter.sort !== ""
      ) {
        let apiFilter = apiFiltration();
        result = await getAllAstrologer(1, 100, apiFilter);
      } else {
        result = await getAllAstrologer(1, 5);
      }
      setAstrologers(result.astrologers);
      setCount(result.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAstrologer = async () => {
    try {
      if (fetching) return;
      if (astrologers.length >= count) {
        setDataAvailable(false);
        console.log("no more data");
        return;
      }
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      console.log("fetching more data", currentPage);
      let result = await getAllAstrologer(newPage, 5);

      if (result && Array.isArray(result.astrologers)) {
        setAstrologers((prevAstrologers) => [
          ...prevAstrologers,
          ...result.astrologers,
        ]);
      }
      setFetching(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAstrologer();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.nav_container}>
        <View style={styles.nav_sub_container}>
          <View style={styles.nav_flex_container}>
            <View style={styles.header_title_section}>
              <Pressable onPress={() => setDrawer(!drawer)}>
                <Icon name="menu" size={40} color="black" />
              </Pressable>
              <Text style={styles.header_title}>Chat with Astrologer</Text>
            </View>
            <View style={styles.header_title_section}>
              <View style={styles.nav_rupee}>
                <Text style={styles.nav_rupee_text}>₹</Text>
                <Text style={styles.nav_rupee_text}>100</Text>
              </View>
              <Pressable onPress={() => navigation.navigate("SearchPage")}>
                <Icon2 name="search1" size={30} color="black" />
              </Pressable>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Icon2 name="filter" size={30} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={"black"} />
        </View>
      ) : (
        astrologers?.length > 0 && (
          <FlatList
            data={astrologers}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  navigation.push("Details", { id: item._id ?? "" })
                }
              >
                <Astrologer astrologer={item} />
              </Pressable>
            )}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            onEndReached={() => fetchAstrologer()}
            onEndReachedThreshold={0.2}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    width: "90%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {fetching && <ActivityIndicator size="large" />}
                  {!fetching && !isDataAvailable && (
                    <View style={styles.noDataContainer}>
                      <Text style={styles.noData}>No more data available</Text>
                    </View>
                  )}
                </View>
              );
            }}
          />
        )
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate("AddAstrologer", { addAstrologer: true })
        }
      />
      <ModalComponent
        getAstrologer={getAstrologer}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        filter={filter}
        setFilter={setFilter}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  nav_container: {
    width: "100%",
    backgroundColor: "#F0DF20",
  },
  nav_sub_container: {
    marginTop: 5,
    marginBottom: 5,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  nav_flex_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header_title_section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  header_title: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "black",
  },
  nav_rupee: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    padding: 2,
  },
  nav_rupee_text: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "black",
  },
  fab: {
    backgroundColor: "#007BFF",
    color: "white",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  noData: {
    zIndex: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "semibold",
    color: "black",
  },
  noDataContainer: {
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
function elseif(p0: boolean) {
  throw new Error("Function not implemented.");
}
