import * as yup from 'yup'
import valid from "card-validator";
import { phonePattern } from './../../../../utils/regex';

export const bookingValidation = yup.object().shape({
  cardNo: yup.string().test(
    "test-number",
    "Credit Card number is invalid",
    value => valid.number(value).isValid
  ),
  cardMonth: yup.string().required('Please enter a valid expiration date.'),
  cardYear: yup.string().required('Please enter a valid expiration date.'),
  firstName: yup.string().required('Please enter a first name'),
  lastName: yup.string().required('Please enter a first name'),
  email: yup
    .string()
    .required('please Enter your email')
    .email('please enter a valid email'),
  phone: yup
    .string()
    .required('please Enter your phone number')
    .matches(phonePattern, {
      message: 'Invalid phone number',
      excludeEmptyString: true,
    }),
  country: yup.string().required('Please choose a country'),
  address: yup.string().required('Please enter a valid address'),
  zip: yup.number().required('Please enter a valid ZIP code'),
  city: yup.string().required('Please enter a city'),


})