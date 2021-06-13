import { Action, StateType } from "./ContextUtils";
import { useRouter } from "next/router";

export const AppReducer = (state: StateType, action: Action) => {
  const router = useRouter();
  // const { t, locale } = useTranslation();
  switch (action.type) {
    case "value":
      return state;

    default:
      return state;
  }
};
