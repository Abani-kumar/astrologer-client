import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { Button, TextInput } from "react-native-paper";
import { expertiseAreas, indianLanguages } from "../constants";
import ImageInput from "./ImageInput";
import CheckBoxComponent from "./CheckBoxComponent";
import { astrologerData, ImageFile } from "..";
import validationSchema from "../utils/yupValidation";
import { addAstrologerData } from "../services/service";

const AddAstrologerForm = ({
  addAstrologer,
  astrologer,
}: {
  addAstrologer: boolean;
  astrologer?: astrologerData;
}) => {
  const [loading, setLoading] = useState(false);
  
  let resetHandler: ((e?: React.SyntheticEvent<any>) => void) | null = null;

  const addAstrologerHandler = async (values: astrologerData) => {
    try {
      setLoading(true);
      let response = await addAstrologerData(values);
      if (resetHandler) {
        resetHandler();
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };
  const updateAstrologerHandler = async () => {
    try {
    } catch (error) {}
  };
  const formHandle = (values: any) => {
    addAstrologerHandler(values);
  };

  const initialValues: astrologerData = {
    username: addAstrologer ? "" : astrologer?.username || "",
    experience: addAstrologer ? 0 : astrologer?.experience || 0,
    language: addAstrologer ? [] : astrologer?.language || [],
    expertise: addAstrologer ? [] : astrologer?.expertise || [],
    price: addAstrologer ? 0 : astrologer?.price || 0,
    profilePic: addAstrologer ? "" : astrologer?.profilePic || "",
    description: addAstrologer ? "" : astrologer?.description || "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        formHandle(values);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        handleReset,
      }) => {
        resetHandler = handleReset;
        return (
          <ScrollView style={styles.form}>
            <View style={styles.container}>
              <TextInput
                placeholder="Astrologer Name"
                onChangeText={handleChange("username")}
                value={values.username}
              />
              {errors.username && touched.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
            </View>
            <View style={styles.container}>
              <View style={styles.inputConrainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Experience"
                  onChangeText={handleChange("experience")}
                  value={values.experience.toString()}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  onChangeText={handleChange("price")}
                  value={values.price.toString()}
                  keyboardType="numeric"
                />
              </View>
              {((errors.experience && touched.experience) ||
                (errors.price && touched.price)) && (
                <Text style={styles.errorText}>
                  {errors.experience ? errors.experience : errors.price}
                </Text>
              )}
            </View>
            <View style={styles.container}>
              <CheckBoxComponent
                options={indianLanguages}
                selectedValues={values.language}
                onAdd={(label: string) =>
                  setFieldValue("language", [...values.language, label])
                }
                onRemove={(label: string) =>
                  setFieldValue(
                    "language",
                    values.language.filter((item) => item !== label)
                  )
                }
                title="Select Languages"
              />
              {errors.language && touched.language && (
                <Text style={styles.errorText}>{errors.language}</Text>
              )}
            </View>
            <View style={styles.container}>
              <CheckBoxComponent
                options={expertiseAreas}
                selectedValues={values.expertise}
                onAdd={(label: string) =>
                  setFieldValue("expertise", [...values.expertise, label])
                }
                onRemove={(label: string) =>
                  setFieldValue(
                    "expertise",
                    values.expertise.filter((item) => item !== label)
                  )
                }
                title="Select Expertise Area(s)"
              />
              {errors.expertise && touched.expertise && (
                <Text style={styles.errorText}>{errors.expertise}</Text>
              )}
            </View>
            <View style={styles.container}>
              <ImageInput
                onChange={(uri: string) => setFieldValue("profilePic", uri)}
                imgurl={values.profilePic}
              />

              {errors.profilePic && touched.profilePic && (
                <Text style={styles.errorText}>{errors.profilePic}</Text>
              )}
            </View>
            <View style={[styles.container]}>
              <TextInput
                style={{ paddingTop: 10 }}
                multiline={true}
                textAlignVertical="top"
                mode="outlined"
                numberOfLines={6}
                placeholder="write your description"
                onChangeText={handleChange("description")}
                value={values.description}
              />
              {errors.description && touched.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>
            <View style={styles.container}>
              <Button
                buttonColor="#00A86B"
                disabled={loading}
                style={styles.submitContainer}
                mode="contained"
                onPress={() => {
                  handleSubmit();
                }}
              >
                {!loading ? (
                  <Text style={styles.submit}>Submit</Text>
                ) : (
                  <ActivityIndicator />
                )}
              </Button>
            </View>
            <View style={{ height: 70 }}></View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

export default AddAstrologerForm;

const styles = StyleSheet.create({
  formContainer: {
    padding: 5,
  },
  form: {
    marginTop: 30,
    flexDirection: "column",
    gap: 10,
  },
  errorText: {
    color: "red",
  },
  inputConrainer: {
    flexDirection: "row",
    gap: 5,
  },
  input: {
    flex: 1,
  },
  container: {
    flexDirection: "column",
    gap: 5,
    marginBottom: 10,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  submit: {
    color: "white",
    textAlign: "center",
    borderRadius: 10,
  },
  submitContainer: {
    marginTop: 18,
    width: 220,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
