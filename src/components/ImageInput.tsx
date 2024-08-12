import React, { useState } from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from "react-native-image-picker";
import { ActivityIndicator } from "react-native-paper";
import { imageUpload } from "../services/service";

type ImageInputProps = {
  onChange: (uri: string) => void;
  imgurl?: string;
};

const ImageInput: React.FC<ImageInputProps> = ({ onChange, imgurl }) => {
  const [loading, setLoading] = useState(false);

  const selectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        console.log("uri :",uri);
        if (uri) {
          uploadImage(uri);
        }
      }
    });
  };

  const uploadImage = async (uri: string) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("profilePic", {
      uri: uri,
      type: "image/jpeg",
      name: "image.jpg",
    });
    try {
      let response = await imageUpload(formData);
      onChange(response.profilePic_url.secure_url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={selectImage} style={styles.container_image}>
        {loading ? (
          <ActivityIndicator animating={true} color="blue" />
        ) : imgurl ? (
          <Image source={{ uri: imgurl }} style={styles.image} />
        ) : (
          <Icon name="upload" size={40} color={"black"} />
        )}
      </Pressable>
    </View>
  );
};

export default ImageInput;

const styles = StyleSheet.create({
  container_image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
