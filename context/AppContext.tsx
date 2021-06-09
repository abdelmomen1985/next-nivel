import {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useState,
} from "react";
import { AppReducer } from "./AppReducer";
import { ACTION_TYPES, StateType } from "./ContextUtils";
import { useRouter } from "next/router";
import useTranslation from "./../hooks/useTranslation";
import useWindowSize from "./../hooks/useWindowSize";

const initialState = {

} as StateType

export const AppContext = createContext<StateType>(initialState);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const deviceSize = useWindowSize();

  const [state, dispatch] = useReducer(AppReducer, initialState);
  const router = useRouter();
  const { locale } = useTranslation();


  const contextValues: StateType = {
    ...state,
    isMobile: deviceSize?.width! < 768,
    isTablet: 767 < deviceSize?.width! && deviceSize?.width! < 1023,

  }

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
export default AppContextProvider;