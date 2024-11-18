import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  language: {
    backgroundColor: '#0366d6',
    color: 'white',
    padding: 4,
    marginTop: 5,
    alignSelf: 'flex-start',
    borderRadius: 4,
    overflow: 'hidden',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
};

const RepositoryStats = ({ stars, forks, reviews, rating }) => (
  <View style={styles.stats}>
    <View style={styles.statItem}>
      <Text fontWeight="bold">{formatCount(stars)}</Text>
      <Text color="textSecondary">Stars</Text>
    </View>
    <View style={styles.statItem}>
      <Text fontWeight="bold">{formatCount(forks)}</Text>
      <Text color="textSecondary">Forks</Text>
    </View>
    <View style={styles.statItem}>
      <Text fontWeight="bold">{formatCount(reviews)}</Text>
      <Text color="textSecondary">Reviews</Text>
    </View>
    <View style={styles.statItem}>
      <Text fontWeight="bold">{formatCount(rating)}</Text>
      <Text color="textSecondary">Rating</Text>
    </View>
  </View>
);

const LanguageTag = ({ language }) => (
  <View>
    <Text style={styles.language}>{language}</Text>
  </View>
);

const RepositoryItem = ({ item, showGitHubButton }) => (
  <View testID="repositoryItem" style={styles.container}>
    <View style={styles.row}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text fontWeight="bold" fontSize="subheading">
          {item.fullName}
        </Text>
        <Text color="textSecondary" style={{ marginBottom: 5 }}>
          {item.description}
        </Text>
        <LanguageTag language={item.language} />
      </View>
    </View>
    <RepositoryStats
      stars={item.stargazersCount}
      forks={item.forksCount}
      reviews={item.reviewCount}
      rating={item.ratingAverage}
    />
    {showGitHubButton && item?.url && (
      <Pressable
        onPress={() => Linking.openURL(item.url)}
        style={{ padding: 10, backgroundColor: '#0366d6', borderRadius: 5, marginTop: 15 }}
      >
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
    )}
  </View>
);

export default RepositoryItem;
