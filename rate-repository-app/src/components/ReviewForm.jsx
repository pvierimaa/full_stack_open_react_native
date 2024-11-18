import { Formik } from 'formik';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import Text from './Text';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    ownerName: Yup.string().required('Repository owner’s username is required'),
    repositoryName: Yup.string().required('Repository name is required'),
    rating: Yup.number()
      .required('Rating is required')
      .min(0, 'Rating must be between 0 and 100')
      .max(100, 'Rating must be between 0 and 100'),
    text: Yup.string().optional(),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: Number(values.rating),
            text: values.text,
          },
        },
      });
      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Repository owner’s username"
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Repository name"
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Rating between 0 and 100)"
            keyboardType="numeric"
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
          />
          {touched.rating && errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Review"
            multiline
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
          />
          <Pressable
            onPress={handleSubmit}
            style={{ padding: 10, backgroundColor: '#0366d6', borderRadius: 5, marginTop: 15 }}
          >
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
