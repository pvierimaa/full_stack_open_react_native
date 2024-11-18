import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#0366d6',
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const SignUpForm = () => {
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(5, 'Username must be between 5 and 30 characters')
      .max(30, 'Username must be between 5 and 30 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password must be between 5 and 50 characters')
      .max(50, 'Password must be between 5 and 50 characters'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await createUser({
        variables: {
          user: {
            username: values.username,
            password: values.password,
          },
        },
      });

      if (data.createUser) {
        navigate('/repositories');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
            value={values.passwordConfirmation}
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
          )}

          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
