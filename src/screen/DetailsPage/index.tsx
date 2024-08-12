import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableNativeFeedback,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { AppStackNavigatorType } from "../../navigation/types"; // Adjust the import path
import { deleteAstrologer, getAstrologerDetails } from "../../services/service";
import Astrologer from "../../components/Astrologer";
import Icon from "react-native-vector-icons/Entypo";
import { astrologerData } from "../..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from '@react-navigation/native';


type DetailsScreenRouteProp = RouteProp<AppStackNavigatorType, "Details">;
type AddAstrologerScreenProp = NativeStackScreenProps<
  AppStackNavigatorType,
  "AddAstrologer"
>;

const DetailsPage = ({ route, navigation }:AddAstrologerScreenProp) => {
  const [astrologers, setAstrologers] = useState<astrologerData>();
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { id } = route.params;
  // const navigation = useNavigation<AddAstrologerScreenProp>();

  const getDetailsAstrologer = async () => {
    try {
      setLoading(true);
      let result = await getAstrologerDetails(id);
      console.log("result :", result);
      setLoading(false);
      setAstrologers(result.astrologer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailsAstrologer();
  }, []);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const result = await deleteAstrologer(id);
      setDeleteLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setDeleteLoading(false);
    }
  }
  return (
    <View style={styles.mainContainer}>
      <View />
      {loading ? (
        <View style={styles.loadingcontainer}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          {astrologers && <Astrologer astrologer={astrologers} />}
          <ScrollView style={styles.bioContainer}>
            {astrologers?.description && (
              <Text style={styles.bio}>{astrologers?.description}</Text>
            )}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              gap: 15,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            {deleteLoading ? (
              <ActivityIndicator animating={true} size="small" />
            ) : (
              <>
                <TouchableNativeFeedback
                  onPress={() => {
                    navigation.push('AddAstrologer',{
                      addAstrologer: false,astrologer:astrologers
                    });
                  }}
                >
                  <Icon name="edit" size={30} color="black" />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => {
                    Alert.alert(
                      "Account delete",
                      "Do you want to delete account ?",
                      [
                        {
                          text: "Cancel",
                          onPress: () => {},
                          style: "cancel",
                        },
                        { text: "OK", onPress: () => handleDelete() },
                      ]
                    );
                  }}
                >
                  <Icon1 name="delete" size={30} color="black" />
                </TouchableNativeFeedback>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  bioContainer: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    margin: 10,
    padding: 5,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
  },
  bio: {
    fontSize: 16,
    color:"black"
  },
});
