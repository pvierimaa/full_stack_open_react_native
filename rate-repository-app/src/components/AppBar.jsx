import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';
import Text from './Text';
import useAuthStorage from '../hooks/useAuthStorage';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

const AppBarTab = ({ title, to, onPress }) => {
  if (to) {
    return (
      <Link to={to}>
        <Text style={styles.tabText}>{title}</Text>
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <Text style={styles.tabText}>{title}</Text>
    </Pressable>
  );
};

const AppBar = () => {
  const { data } = useQuery(ME);
  const isAuthenticated = !!data?.me;
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <AppBarTab title="Repositories" to="/" />
        {isAuthenticated ? (
          <>
            <AppBarTab title="Create a Review" to="/create-review" />
            <AppBarTab title="My Reviews" to="/my-reviews" />
            <AppBarTab title="Sign Out" onPress={signOut} />
          </>
        ) : (
          <>
            <AppBarTab title="Sign In" to="/signin" />
            <AppBarTab title="Sign Up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
