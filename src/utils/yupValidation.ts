import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Astrologer name is required")
    .min(3, "Name must be at least 3 characters long"),
  experience: Yup.number()
    .required("Experience is required")
    .positive("Experience must be a positive number")
    .integer("Experience must be an integer")
    .min(1, "Experience must be at least 1 year"),
  language: Yup.array()
    .of(Yup.string().required("Language is required"))
    .min(1, "At least one language must be selected"),
  expertise: Yup.array()
    .of(Yup.string().required("Expertise area is required"))
    .min(1, "At least one expertise area must be selected"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  profilePic: Yup.string(),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
});

export default validationSchema;
