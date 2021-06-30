import { gql } from '@apollo/client';
import { withIronSession } from 'next-iron-session';
import { initializeApollo } from '../../lib/apolloClient';

const LOGIN_QUERY = gql`
	query login($email: String!, $passwired: String!) {
		visitors(
			where: { email: { _eq: $email }, passwired: { _eq: $passwired } }
		) {
			id
			email
		}
	}
`;
// agent@test.com W~JA5Tt`e&li
export default withIronSession(
	async (req, res) => {
		console.log(req.body);
		try {
			if (req.method === 'POST') {
				const { email, password } = req.body;
				const apolloClient = initializeApollo();
				const { data } = await apolloClient.query({
					query: LOGIN_QUERY,
					variables: { email: email, passwired: password },
				});
				console.log(data);
				const [foundUser] = data.visitors;
				if (!foundUser) {
					return res.status(204).json({
						message: 'no such user ... please sign up',
					});
				}
				if (foundUser.id) {
					req.session.set('user', { id: foundUser.id });
					await req.session.save();
					return res.status(201).send('');
				}

				return res.status(403).send('');
			} else if (req.method === 'DELETE') {
				req.session.set('user', null);
				await req.session.save();
				return res.status(204).send('');
			}
		} catch (error) {
			console.log('error', error);
		}

		return res.status(404).send('');
	},
	{
		cookieName: 'REALESTATEPLATFORMCOOKIE',
		cookieOptions: {
			secure: process.env.NODE_ENV === 'production' ? true : false,
		},
		password: '' + process.env.F0APP_SECRET,
	}
);
