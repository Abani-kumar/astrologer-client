import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { astrologerData } from "..";

const Astrologer = ({ astrologer }: { astrologer: astrologerData }) => {
  const [expertise, setExpertise] = useState<string>("");
  const [languages, setLanguages] = useState<string>("");
  const expertiseData = () => {
    let expertiseString = "";
    if (astrologer.expertise.length > 3) {
      expertiseString = `${astrologer.expertise.slice(0, 2).join(",")}...`;
    } else {
      expertiseString = astrologer.expertise.join(",");
    }
    setExpertise(expertiseString);
  };

  const languageData = () => {
    let languageString = "";
    if (astrologer.language.length > 3) {
      languageString = `${astrologer.language.slice(0, 2).join(",")}...`;
    } else {
      languageString = astrologer.language.join(",");
    }
    setLanguages(languageString);
  };
  useEffect(() => {
    expertiseData();
    languageData();
  }, []);

  let arr = [1, 2, 3, 4, 5];
  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <View style={styles.image_container}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: astrologer.profilePic,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.star_container}>
            {arr.map((item) => (
              <Icon key={item} name="star" size={20} color="#757575" />
            ))}
          </View>
        </View>
        <View style={styles.details_container}>
          <Text style={styles.name}>{astrologer.username}</Text>
          <Text style={styles.astrologer_type}>{expertise}</Text>
          <Text style={styles.astrologer_type}>{languages}</Text>
          <View style={styles.exp_container}>
            <Text style={styles.exp}>Exp :</Text>
            <Text
              style={styles.exp_text}
            >{`${astrologer.experience} years`}</Text>
          </View>
          <View style={styles.rupee_container}>
            <Text style={styles.rupee}>₹</Text>
            <Text style={styles.rupee_cut_text}>28</Text>
            <Text style={styles.rupee_text}>{astrologer.price}</Text>
            <Text style={styles.min_text}>/min</Text>
          </View>
        </View>
        <View style={styles.button_container}>
          <Image
            source={require("../assets/blue_tick.png")}
            style={styles.tick}
          />
          <Pressable style={styles.chat_container}>
            <Text style={styles.chat_text}>Chat</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Astrologer;

const styles = StyleSheet.create({
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "97%",
    marginTop: 6,

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
  },
  sub_container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  },
  image_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  imageWrapper: {
    width: 86,
    height: 86,
    backgroundColor: "#F0DF20",
    borderRadius: 43,
    borderWidth: 1,
    borderColor: "#F0DF20",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  star_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  details_container: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  name: {
    fontSize: 27,
    fontWeight: "700",
    color: "black",
  },
  astrologer_type: {
    fontSize: 12,
    fontWeight: "600",
    color: "black",
  },
  exp_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  exp: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
  exp_text: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
  rupee_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rupee: {
    fontSize: 18,
    fontWeight: "500",
    color: "#737373",
  },
  rupee_cut_text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#737373",
    textDecorationLine: "line-through",
  },
  rupee_text: {
    fontSize: 20,
    fontWeight: "700",
    color: "red",
  },
  min_text: {
    fontSize: 15,
    fontWeight: "500",
    color: "red",
  },
  chat_container: {
    display: "flex",
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#75A693",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  chat_text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#75A693",
  },
  button_container: {
    marginRight: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 40,
  },
  tick: {
    width: 30,
    height: 30,
  },
});
