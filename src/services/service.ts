import { astrologerData } from "..";
import { endpoint } from "./apiendpoint";
import axios from "axios";
import Snackbar from "react-native-snackbar";

export const addAstrologerData = async (data: any) => {
  try {
    let result;
    console.log("before response", data);
    const response = await axios.post(endpoint.ADD_ASTROLOGER_API, data);
    console.log("add astrologer api ....", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    Snackbar.show({
      text: "Astrologer added successfully",
      duration: Snackbar.LENGTH_SHORT,
    })
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAstrologer = async (
  page: number,
  limit: number,
  apiFilter?: string
) => {
  let result = [];
  try {
    console.log(`${endpoint.GET_ALL_ASTROLOGERS}?page=${page}&limit=${limit}&${apiFilter}`)
    const response = await axios.get(
      `${endpoint.GET_ALL_ASTROLOGERS}?page=${page}&limit=${limit}&${apiFilter}`
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const updateAstrologer = async (data: any) => {
  try {
    const response = await axios.put(endpoint.UPDATE_ASTROLOGER, data);
    console.log("update astrologer api ....", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    Snackbar.show({
      text: "Astrologer updated successfully",
      duration: Snackbar.LENGTH_SHORT,
    })
  } catch (error) {
    console.log(error);
  }
};

export const deleteAstrologer = async (id: string) => {
  try {
    const response = await axios.delete(`${endpoint.DELETE_ASTROLOGER}/${id}`);
    console.log("delete astrologer api ....", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    Snackbar.show({
      text: "Astrologer deleted successfully",
      duration: Snackbar.LENGTH_SHORT,
    })
  } catch (error) {
    console.log(error);
  }
};

export const searchApi = async (searchvalue: string) => {
  let result = [];
  try {
    const response = await axios.get(`${endpoint.SEARCH}/${searchvalue}`);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const getAstrologerDetails = async (id: string) => {
  let result = [];
  try {
    console.log(`${endpoint.ASTROLOGER_DETAILS}/${id}`);
    const response = await axios.get(`${endpoint.ASTROLOGER_DETAILS}/${id}`);
    console.log("get astrologer details api ....", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const imageUpload=async(formData:FormData)=>{
  let result;
  try {
    const response = await axios.post(endpoint.UPLOAD_IMAGE,formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("image upload api ....", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
}
