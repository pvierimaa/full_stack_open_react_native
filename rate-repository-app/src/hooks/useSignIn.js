import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();
      navigate('/');
    }
  };

  return [signIn, result];
};

export default useSignIn;
