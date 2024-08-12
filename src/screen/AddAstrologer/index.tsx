import { View, Text } from "react-native";
import React from "react";
import AddAstrologerForm from "../../components/AddAstrologerForm";
import { astrologerData } from "../..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackNavigatorType } from "../../navigation/types";
type AddAstrologerScreenProp = NativeStackScreenProps<
  AppStackNavigatorType,
  "AddAstrologer"
>;

const AddAstrologer = ({ route, navigation }:AddAstrologerScreenProp) => {
  console.log(route.params);
  return (
    <View>
      <AddAstrologerForm addAstrologer={route.params.addAstrologer} astrologer={route.params.astrologer} />
    </View>
  );
};

export default AddAstrologer;
