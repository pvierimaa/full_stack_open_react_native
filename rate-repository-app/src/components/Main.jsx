import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import SignIn from './SignIn';
import SignUpForm from './SignUpForm';
import ReviewForm from './ReviewForm';
import AppBar from './AppBar';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const { data } = useQuery(ME);
  const isAuthenticated = !!data?.me;

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/signin" element={<SignIn />} />
        {isAuthenticated && <Route path="/create-review" element={<ReviewForm />} />}
        {isAuthenticated && <Route path="/my-reviews" element={<MyReviews />} />}
        {!isAuthenticated && <Route path="/signup" element={<SignUpForm />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
