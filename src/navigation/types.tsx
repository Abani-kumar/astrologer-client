import { astrologerData } from "..";

export type AppStackNavigatorType = {
  Home: undefined;
  Details: {
    id: string;
  };
  SearchPage: undefined;
  AddAstrologer: {
    addAstrologer: boolean;
    astrologer?: astrologerData;
  };
};
