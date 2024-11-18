import { Formik } from 'formik';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import * as Yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  errorInput: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#0366d6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const SignInContainer = ({ onSubmit }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleChange, handleSubmit, values, errors, touched }) => (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, touched.username && errors.username && styles.errorInput]}
          placeholder="Username"
          onChangeText={handleChange('username')}
          value={values.username}
          testID="usernameInput"
        />
        {touched.username && errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}

        <TextInput
          style={[styles.input, touched.password && errors.password && styles.errorInput]}
          placeholder="Password"
          onChangeText={handleChange('password')}
          value={values.password}
          secureTextEntry
          testID="passwordInput"
        />
        {touched.password && errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <Pressable style={styles.button} onPress={handleSubmit} testID="submitButton">
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.error('Authentication failed:', e);
    }
  };

  return <SignInContainer onSubmit={handleSubmit} />;
};

export default SignIn;
