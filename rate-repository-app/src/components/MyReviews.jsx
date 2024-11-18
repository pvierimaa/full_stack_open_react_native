import { FlatList, View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reviewItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#24292e',
  },
  reviewText: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'none',
  },
  separator: {
    height: 10,
    backgroundColor: 'lightgrey',
    width: '100%',
  },
});

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  const handleDelete = (id) => {
    Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteReview({ variables: { id } });
            refetch();
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.reviewItem}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>

          <View style={styles.reviewContent}>
            <Text style={styles.reviewHeader}>{item.repository.fullName}</Text>
            <Text style={styles.dateText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.reviewText}>{item.text}</Text>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.viewButton]}
                onPress={() => handleViewRepository(item.repository.id)}
              >
                <Text style={styles.buttonText}>View repository</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete review</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={{ padding: 0 }}
    />
  );
};

export default MyReviews;
