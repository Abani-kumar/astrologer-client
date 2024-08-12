import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { expertiseAreas, indianLanguages, sortby } from "../constants";
import Checkbox from "./Checkbox";
import { filterData, Item } from "..";

const ModalComponent = ({
  getAstrologer,
  modalVisible,
  setModalVisible,
  filter,
  setFilter,
}: {
  getAstrologer: () => void;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  filter: filterData;
  setFilter: React.Dispatch<React.SetStateAction<filterData>>;
}) => {
  const slideAnim = useState(new Animated.Value(800))[0];
  const [currentTab, setCurrentTab] = useState<
    "language" | "expertise" | "sort"
  >("sort");
  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };
  return (
    <View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPressOut={closeModal}
          />
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Sort & Filter</Text>
              <Icon name="cross" size={30} color="black" onPress={closeModal} />
            </View>
            <View style={styles.divider} />
            <View style={styles.tabs}>
              <Pressable onPress={() => setCurrentTab("sort")}>
                <View
                  style={
                    currentTab === "sort"
                      ? styles.active_tab
                      : styles.inactive_tab
                  }
                >
                  <Text
                    style={
                      currentTab === "sort" ? styles.active : styles.inactive
                    }
                  >
                    Sort by
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setCurrentTab("expertise")}>
                <View
                  style={
                    currentTab === "expertise"
                      ? styles.active_tab
                      : styles.inactive_tab
                  }
                >
                  <Text
                    style={
                      currentTab === "expertise"
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    Skill
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setCurrentTab("language")}>
                <View
                  style={
                    currentTab === "language"
                      ? styles.active_tab
                      : styles.inactive_tab
                  }
                >
                  <Text
                    style={
                      currentTab === "language"
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    Language
                  </Text>
                </View>
              </Pressable>
            </View>
            {currentTab === "sort" && (
              <FlatList
                data={sortby}
                renderItem={({ item }) => (
                  <View style={styles.tabContent_child}>
                    <Checkbox
                      text={item}
                      filter={filter}
                      setFilter={setFilter}
                      tab={currentTab}
                    />
                  </View>
                )}
                keyExtractor={(item) => item}
                style={styles.tabContent}
              />
            )}
            {currentTab === "expertise" && (
              <FlatList
                data={expertiseAreas}
                renderItem={({ item }: { item: Item }) => (
                  <View style={styles.tabContent_child}>
                    <Checkbox
                      text={item.label}
                      filter={filter}
                      setFilter={setFilter}
                      tab={currentTab}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.label}
                style={styles.tabContent}
              />
            )}
            {currentTab === "language" && (
              <FlatList
                data={indianLanguages}
                renderItem={({ item }) => (
                  <View style={styles.tabContent_child}>
                    <Checkbox
                      text={item.label}
                      filter={filter}
                      setFilter={setFilter}
                      tab={currentTab}
                    />
                  </View>
                )}
                keyExtractor={(item) => item.label}
                style={styles.tabContent}
              />
            )}
          </View>
          <Pressable style={styles.buttonClose} onPress={() => getAstrologer()}>
            <Text style={styles.textStyle}>Apply Filter</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  animatedView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    maxHeight: "80%",
  },
  modalContent: {
    backgroundColor: "white",
    flex: 1,
    zIndex: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
  },
  active_tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  inactive_tab: {
    padding: 10,
  },
  active: {
    color: "blue",
  },
  inactive: {
    color: "gray",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    flexGrow: 1,
  },
  tabContent_child: {
    padding: 10,
  },
  buttonClose: {
    padding: 15,
    backgroundColor: "green",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ModalComponent;
