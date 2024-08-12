import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { filterData } from "..";

const Checkbox = ({
  text,
  filter,
  setFilter,
  tab,
}: {
  text: string;
  filter: filterData;
  setFilter: (props: filterData) => void;
  tab: string;
}) => {
  const handlePress = () => {
    if (tab === "sort") {
      setFilter({ ...filter, [tab]: filter[tab]=== text ? "" : text });
    } else if (tab === "language") {
      setFilter({
        ...filter,
        [tab]: filter[tab].includes(text)
          ? filter[tab].filter((item) => item !== text)
          : [...filter[tab], text],
      });
    } else if (tab === "expertise") {
      setFilter({
        ...filter,
        [tab]: filter[tab].includes(text)
          ? filter[tab].filter((item) => item !== text)
          : [...filter[tab], text],
      });
    } else {
      console.error("Invalid tab value");
    }
  };
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unFillColor="#FFFFFF"
        text={text}
        iconStyle={{ borderColor: "red", marginRight: 10 }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{
          fontFamily: "JosefinSans-Regular",
          color: "black",
          textDecorationLine: "none",
        }}
        isChecked={
          filter.expertise.includes(text) ||
          filter.language.includes(text) ||
          filter.sort === text
        }
        onPress={(isChecked: boolean) => {
          handlePress();
        }}
      />
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
});
