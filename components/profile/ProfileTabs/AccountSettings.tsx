import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import styles from '../profile.module.scss';
import { cleanObjects } from '../../../utils/cleanObjects';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './../../../query/user';
import { AppContext } from './../../../context/AppContext';
import { UserType } from '../../../types/User';
import { toast } from 'react-toastify';
import useTranslation from './../../../hooks/useTranslation';
import { useSpeech } from './../../../hooks/useSpeech';

const AccountSettings = () => {
	const { t, locale } = useTranslation();
	const [showPass, setShowPass] = useState<boolean>(false);
	const { speechHandler } = useSpeech();
	const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
	const [updateUserHandler] = useMutation(UPDATE_USER);
	const { setUser, user } = useContext(AppContext);
	const { register, handleSubmit, setValue } = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
	});
	useEffect(() => {
		setValue('email', user?.email);
	}, [user]);
	const editUserHandler = async (data: any) => {
		console.log('data', data);
		// let hashedPass = await hashIt(cleanData?.password);
		let newData = {
			email: data?.email,
			password: data?.password,
		};
		let cleanData = cleanObjects(newData);
		console.log('cleanData', cleanData);
		updateUserHandler({
			variables: {
				...cleanData,
				id: user?.id,
			},
		})
			.then((res) => {
				const successMessage = {
					en: 'Your profile was updated successfully',
					ar: 'تم تحديث بيانات حسابك بنجاح',
				};
				toast.success(successMessage[locale], {
					rtl: locale === 'ar' ? true : false,
				});
				setUser({ ...res.data.update_visitors_by_pk });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<section className="w-2/4 mx-auto">
			<h3
				onMouseEnter={() => speechHandler(t('accInfo'))}
				className="py-4 text-2xl font-semibold text-black"
			>
				{t('accInfo')}
			</h3>
			<form className="my-5" onSubmit={handleSubmit(editUserHandler)}>
				<div className="my-5 relative">
					<input
						className={styles.textInput}
						name="email"
						type="text"
						ref={register}
					/>
					<small
						onMouseEnter={() => speechHandler(t('email'))}
						className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25"
					>
						{t('email')}
					</small>
				</div>
				<div className="my-5 relative">
					<input
						className={styles.textInput}
						name="password"
						type={showPass ? 'text' : 'password'}
						ref={register}
					/>
					{showPass ? (
						<FontAwesomeIcon
							className={styles.passIcon}
							onClick={() => setShowPass(false)}
							icon={faEyeSlash}
						/>
					) : (
						<FontAwesomeIcon
							className={styles.passIcon}
							onClick={() => setShowPass(true)}
							icon={faEye}
						/>
					)}
					<small
						onMouseEnter={() => speechHandler(t('password'))}
						className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25"
					>
						{t('password')}
					</small>
				</div>
				<div className="my-5 relative">
					<input
						className={styles.textInput}
						name="confirmPassword"
						type={showConfirmPass ? 'text' : 'password'}
						ref={register}
					/>
					{showConfirmPass ? (
						<FontAwesomeIcon
							className={styles.passIcon}
							onClick={() => setShowConfirmPass(false)}
							icon={faEyeSlash}
						/>
					) : (
						<FontAwesomeIcon
							className={styles.passIcon}
							onClick={() => setShowConfirmPass(true)}
							icon={faEye}
						/>
					)}
					<small
						onMouseEnter={() => speechHandler(t('confirmPassword'))}
						className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25"
					>
						{t('confirmPassword')}
					</small>
				</div>

				<div className="my-8 relative flex justify-end items-start">
					<button
						onMouseEnter={() => speechHandler(t('save'))}
						className="btn-primary-light m-0 py-2 px-16 font-medium text-xl"
						type="submit"
					>
						{t('save')}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AccountSettings;
