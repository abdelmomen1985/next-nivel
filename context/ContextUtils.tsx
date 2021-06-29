import { UserType } from '../types/User';

export type StateType = {
	isMobile?: boolean;
	isTablet?: boolean;
	loginModal: boolean;
	setLoginModal: (val: boolean) => void;
	user: UserType | undefined;
	setUser: (user: UserType | undefined) => void;
	updateUser: () => void;
};

export const setStorageItems = (name: string, items: any[]) => {
	localStorage.setItem(name, JSON.stringify(items.length > 0 ? items : []));
};

export const setStorageSingleItem = (name: string, item: object) => {
	localStorage.setItem(name, JSON.stringify(item));
};

export const getStorageSingleItem = (name: string): object | undefined => {
	if (localStorage.getItem(name))
		return JSON.parse(localStorage.getItem(name)!);
};

export const ACTION_TYPES = {
	SET_USER: 'SET_USER',
	UPDATE_USER: 'UPDATE_USER',
};

export type Action = {
	type: string;
	payload: any;
};
