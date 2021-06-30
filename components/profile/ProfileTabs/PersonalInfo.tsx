import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../profile.module.scss';
import { cleanObjects } from './../../../utils/cleanObjects';
import { UPDATE_USER_DATA } from './../../../query/user';
import { useMutation } from '@apollo/client';
import { uploadImageMultiple } from '../../../utils/uploadImageMultiple';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import { toast } from 'react-toastify';
import useTranslation from './../../../hooks/useTranslation';

const PersonalInfo = () => {
	const { register, handleSubmit } = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
	});
	const { t, locale } = useTranslation();
	const [updateUserHandler] = useMutation(UPDATE_USER_DATA);
	const { updateUser, user } = useContext(AppContext);
	const [profileImg, setProfileImg] = useState<undefined | string>(
		user?.media?.profile_img?.url
	);
	const [userMedia, setUserMedia] = useState<any>(user?.media);
	const [name, setName] = useState<undefined | string>(user?.name);
	const [maritalStatus, setMaritalStatus] = useState<undefined | string>(
		user?.ext_data?.marital_status
	);
	const [gender, setGender] = useState<undefined | string>(
		user?.ext_data?.gender
	);
	const editUserInfoHandler = (data: any) => {
		let cleanData = cleanObjects(data);
		console.log(userMedia);
		updateUserHandler({
			variables: {
				ext_data: { ...cleanData },
				media: userMedia,
				id: user?.id,
				name: cleanData.name,
			},
		})
			.then((res) => {
				updateUser();
				const successMessage = {
					en: 'Your profile was updated successfully',
					ar: 'تم تحديث بيانات حسابك بنجاح',
				};
				toast.success(successMessage[locale], {
					rtl: locale === 'ar' ? true : false,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const uploadProfileHandler = async (files: FileList | null) => {
		if (files?.[0]) {
			console.log('will upload image');
			var data = new FormData();
			data.append('single', files?.[0]);
			// optimistic set img
			let blobs = await uploadImageMultiple([data.get('single')]);
			let imageBlob = blobs[0];
			let url = URL.createObjectURL(imageBlob);
			setProfileImg(url);

			const response = await fetch('https://hubgraph.herokuapp.com/upload', {
				method: 'POST',
				body: data,
			});
			const respData = await response.json();
			if (respData.url) {
				console.log('will setProfileImg ', respData.url);
				setProfileImg(respData.url);
				setUserMedia({ ...userMedia, profile_img: respData });
			}
		}
	};
	return (
		<section className="w-2/4 mx-auto">
			<h3 className="py-4 text-2xl font-semibold text-black">
				Personal Information
			</h3>
			<form className="my-5" onSubmit={handleSubmit(editUserInfoHandler)}>
				<div className="my-5 relative">
					<input
						className={styles.textInput}
						name="name"
						type="text"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						ref={register}
					/>
					<small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">
						User Full Name
					</small>
				</div>
				<div className="my-5 relative flex justify-between flex-start">
					{!profileImg ? (
						<svg
							className="text-gray-300"
							style={{ width: '70px', height: '70px' }}
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					) : (
						<img
							src={profileImg}
							className={styles.profileImg}
							alt="user avatar"
						/>
					)}
					<div>
						<input
							type="file"
							accept="image/*,capture=camera"
							name="photo"
							id="photo"
							onChange={(e) => uploadProfileHandler(e?.target?.files)}
							value=""
							multiple={false}
							className={styles.customFileInput}
						/>
						<label htmlFor="photo" className={styles.customFileLabel}>
							<div>Choose File</div>
							<span>Profile Picture</span>
						</label>
					</div>
				</div>

				<div className="my-5 relative">
					<select
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						className={styles.textInput}
						name="gender"
						ref={register}
					>
						<option value=""></option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
					<small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">
						User's Gender
					</small>
				</div>
				<div className="my-5 relative">
					<select
						className={styles.textInput}
						name="marital_status"
						value={maritalStatus}
						onChange={(e) => {
							setMaritalStatus(e.target.value);
						}}
						ref={register}
					>
						<option value="single">Single</option>
						<option value="engaged">Engaged</option>
						<option value="married">Married</option>
						<option value="other">Other / Rather not say</option>
					</select>
					<small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">
						User's marital status
					</small>
				</div>
				<div className="my-8 relative flex justify-end items-start">
					<button
						className="btn-primary-light m-0 py-2 px-16 font-medium text-xl"
						type="submit"
					>
						Save
					</button>
				</div>
			</form>
		</section>
	);
};

export default PersonalInfo;
