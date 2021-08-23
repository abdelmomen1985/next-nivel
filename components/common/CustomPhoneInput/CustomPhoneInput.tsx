import { useState } from 'react';
import styles from './styles.module.scss';
import Flags from 'country-flag-icons/react/3x2';
import { allCountries, Country } from 'country-telephone-data';
import InternationalIcon from './InternationalIcon';
const CustomPhoneInput = ({
	name,
	register,
}: {
	name: string;
	register: any;
}) => {
	const [selectedCountryState, setSelectedCountryState] =
		useState<Country | null>(null);
	const selectCountryHandler = (selectedCountryIndex: number) => {
		console.log(selectedCountryIndex);
		let selectedCountry = allCountries[selectedCountryIndex];
		console.log(selectedCountry);
		setSelectedCountryState(selectedCountry);
	};
	return (
		<div className={styles.inputContainer}>
			{selectedCountryState ? (
				<img
					alt={selectedCountryState?.name}
					src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountryState?.iso2?.toUpperCase()}.svg`}
				/>
			) : (
				<InternationalIcon />
			)}
			<select onChange={(e) => selectCountryHandler(+e.target.value)}>
				{allCountries.map((country, index: number) => (
					<option id={country?.name} value={index}>
						{country?.name} +{country?.dialCode}
					</option>
				))}
			</select>
			<div className={styles.numberInput}>
				{selectedCountryState && <span>+{selectedCountryState?.dialCode}</span>}
				<input
					type="tel"
					name={name}
					ref={register({
						setValueAs: (value: string) =>
							`+${selectedCountryState?.dialCode}${value}`,
					})}
				/>
			</div>
		</div>
	);
};

export default CustomPhoneInput;
