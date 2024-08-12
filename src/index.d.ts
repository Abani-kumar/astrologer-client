import { number } from "yup";

interface astrologerData {
  _id?: string;
  username: string;
  language: [];
  expertise: [];
  experience: number;
  price: number;
  profilePic: string;
  description?: string;
}

interface filterData {
  language: string[];
  expertise: string[];
  sort: string;
}

interface Item{
  id:number,
  label:string
}

interface ImageFile {
  uri: string;
  name: string;
  type: string;
  size: number;
};
