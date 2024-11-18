import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';
import useSingleRepository from '../hooks/useSingleRepository';
import Text from './Text';
import { useParams } from 'react-router-native';

const SingleRepository = () => {
  const { id: repositoryId } = useParams();
  const { repository, reviews, loading, error, fetchMore } = useSingleRepository(repositoryId, 5);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const handleFetchMore = () => {
    if (repository.reviews.pageInfo.hasNextPage) {
      fetchMore();
    }
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgrey',
  },
});

export default SingleRepository;
