import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';

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

const AppBarTab = ({ title, to }) => (
  <Link to={to} component={Pressable}>
    <Text style={styles.tabText}>{title}</Text>
  </Link>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <AppBarTab title="Repositories" to="/" />
        <AppBarTab title="Sign In" to="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
