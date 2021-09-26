import * as Yup from 'yup';

export const signUpSchemaLogin = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Enter your email'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Enter your password')
});
export const inputForFromikValidation = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('is required'),
  price: Yup.number().required('is required'),
  count: Yup.number().required('is required'),
  rate: Yup.number()
    .min(0.1, 'Must be greater than or equal 0.1')
    .max(5, 'Must be less than or equal to 5')
    .required('is required'),
  description: Yup.string()
    .min(5, 'Too Short!')
    .max(5000, 'Too Long!')
    .required('is required'),
  image: Yup.string().required('Please enter URL image'),
  category: Yup.string().required('Please select category')
});
