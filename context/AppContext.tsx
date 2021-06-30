import {
	createContext,
	ReactNode,
	useReducer,
	useEffect,
	useState,
} from 'react';
import { AppReducer } from './AppReducer';
import { ACTION_TYPES, StateType } from './ContextUtils';
import { useRouter } from 'next/router';
import useTranslation from '../hooks/useTranslation';
import useWindowSize from '../hooks/useWindowSize';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_ID } from './../query/user';
import { UserType } from '../types/User';

const initialState = {
	user: undefined,
} as StateType;

export const AppContext = createContext<StateType>(initialState);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const deviceSize = useWindowSize();
	const router = useRouter();
	const { locale } = useTranslation();
	const [state, dispatch] = useReducer(AppReducer, initialState);
	const [fetchUserData, { data: userData }] = useLazyQuery(GET_USER_BY_ID, {
		onCompleted() {
			console.log('onCompleted setUser', { ...userData.visitors_by_pk });
			setUser({ ...userData.visitors_by_pk });
		},
		onError(error: any) {
			console.log(error);
		},
		fetchPolicy: 'no-cache',
	});
	useEffect(() => {
		const getUserSession = async () => {
			const response = await fetch('/api/getUserSession', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.status === 200) {
				let currentUser = await response.json();
				let currentUserId = currentUser.id;
				fetchUserData({
					variables: {
						id: currentUserId,
					},
				});
			}
		};
		getUserSession();
	}, []);

	const updateUser = async () => {
		console.log('will updateUser');
		const response = await fetch('/api/getUserSession', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.status === 200) {
			let currentUser = await response.json();
			let currentUserId = currentUser.id;
			fetchUserData({
				variables: {
					id: currentUserId,
				},
			});
		}
	};

	const setUser = (user: UserType | undefined) => {
		dispatch({
			type: ACTION_TYPES.SET_USER,
			payload: user,
		});
	};

	const [loginModal, setLoginModal] = useState(false);

	const contextValues: StateType = {
		...state,
		isMobile: deviceSize?.width! < 768,
		isTablet: 767 < deviceSize?.width! && deviceSize?.width! < 1023,
		loginModal,
		setLoginModal,
		updateUser,
		setUser,
	};

	return (
		<AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
	);
};
export default AppContextProvider;
