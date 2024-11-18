import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (repositoryId, first) => {
  const { data, loading, error, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id: repositoryId, first },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    if (data?.repository.reviews.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          id: repositoryId,
          first,
          after: data.repository.reviews.pageInfo.endCursor,
        },
      });
    }
  };

  return {
    repository: data?.repository,
    reviews: data?.repository.reviews.edges.map((edge) => edge.node) || [],
    pageInfo: data?.repository.reviews.pageInfo,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useSingleRepository;
