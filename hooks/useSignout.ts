import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
export function useSignout() {
	const { setUser } = useContext(AppContext);

	const signOutHandler = async () => {
		const response = await fetch('/api/sessions', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.status === 204) setUser(undefined);
	};

	return { signOutHandler };
}
