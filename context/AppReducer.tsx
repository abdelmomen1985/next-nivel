import { Action, ACTION_TYPES, StateType } from './ContextUtils';
import { useRouter } from "next/router";
import useTranslation from './../hooks/useTranslation';


export const AppReducer = (state: StateType, action: Action) => {
  const router = useRouter();
  const { t, locale } = useTranslation();
  switch (action.type) {
    case 'value':

      return state;

    default:
      return state;
  }

}