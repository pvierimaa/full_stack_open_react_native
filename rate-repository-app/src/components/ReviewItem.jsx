import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{review.user?.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ratingText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    color: '#586069',
    marginBottom: 5,
  },
  reviewText: {
    marginTop: 5,
  },
});

export default ReviewItem;
