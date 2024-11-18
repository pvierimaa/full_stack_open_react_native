import { View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgrey',
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} showGitHubButton={true} />
      <View style={styles.separator} />
    </View>
  );
};

export default RepositoryInfo;
