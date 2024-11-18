import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import { Link } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgrey',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onOrderChange,
  searchKeyword,
  onSearchChange,
}) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Link to={`/repository/${item.id}`}>
          <RepositoryItem item={item} />
        </Link>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search repositories..."
            value={searchKeyword}
            onChangeText={onSearchChange}
          />
          <Picker
            selectedValue={onOrderChange.orderBy}
            style={styles.picker}
            onValueChange={onOrderChange.handleOrderChange}
          >
            <Picker.Item label="Latest repositories" value="CREATED_AT" />
            <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE" />
            <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE_ASC" />
          </Picker>
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);

  const handleOrderChange = (value) => {
    const orderMapping = {
      CREATED_AT: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
      RATING_AVERAGE: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
      RATING_AVERAGE_ASC: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
    };

    const { orderBy, orderDirection } = orderMapping[value];
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);
  };

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onOrderChange={{ handleOrderChange, orderBy }}
      searchKeyword={searchKeyword}
      onSearchChange={handleSearchChange}
    />
  );
};

export default RepositoryList;
