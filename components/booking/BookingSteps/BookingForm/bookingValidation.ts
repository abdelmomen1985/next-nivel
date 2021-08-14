import valid from "card-validator";
import * as yup from "yup";
import { phonePattern } from "./../../../../utils/regex";

export const bookingValidation = yup.object().shape({
  cardNo: yup
    .string()
    .required({
      en: "Please Enter a valid Credit Card number",
      ar: "الرجاء ادخل رقم بطاقة صالح",
    })
    .test(
      "test-number",
      { en: "Credit Card number is invalid", ar: "رقم البطاقة غير صالح" },
      (value) => valid.number(value).isValid
    ),
  cardMonth: yup.string().required({
    en: "Please enter a valid expiration date.",
    ar: "الرجاء ادخال تاريخ صالح",
  }),
  cardYear: yup.string().required("Please enter a valid expiration date."),
  firstName: yup.string().required({
    en: "Please enter your first name",
    ar: "الرجاء ادخال الاسم الأول",
  }),
  lastName: yup.string().required({
    en: "Please enter your last name",
    ar: "الرجاء ادخال الاسم الأخير",
  }),
  email: yup
    .string()
    .required({
      en: "Please enter an email",
      ar: "الرجاء ادخال البريد الإلكتروني",
    })
    .email({ en: "Please enter a valid email ", ar: "بريد إلكتروني غير صالح" }),
  tos: yup.boolean().oneOf([true], {
    en: "Please accept terms of services",
    ar: "الرجاء الموافقة علي الشروط والاحكام",
  }),
  phone: yup
    .string()
    .required({
      en: "please Enter your phone number",
      ar: "الرجاء ادخال رقم هاتفك",
    })
    .matches(phonePattern, {
      message: { en: "Invalid phone number", ar: "رقم الهاتف غير صحيح" },
      excludeEmptyString: true,
    }),
  country: yup
    .string()
    .required({ en: "Please choose a country", ar: "يرجى اختيار دولة" }),
  address: yup.string().required({
    en: "Please enter a valid address",
    ar: "الرجاء ادخال عنوان صحيح",
  }),
  /*
	zip: yup.number().required({
		en: 'Please enter a valid ZIP code',
		ar: 'الرجاء ادخال رمز البريد',
	}),
  */
  city: yup
    .string()
    .required({ en: "Please enter a city", ar: "الرجاء ادخال المدينة" }),
});
