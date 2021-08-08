import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import BadgesItem from './BadgesItem';
import BadgesSearch from './BadgesSearch';
import Colors from '../../res/Colors';
import Http from '../../libs/http';
import Loader from '../Generics/Loader';
import Storage from '../../libs/storage'

class BadgesScreen extends React.Component {
  state = {
    loading: false,
    badges: undefined,
    badgesCopy: undefined,
  };

  //We call the next functions to fetch the data and call the intervals
  componentDidMount() {
    this.fetchdata();
    this.focusEvent();
    this.blurEvent();
  }
 //Fetch the interval calling the function to do it
  focusEvent = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.setFetchInterval();
    });
  };

  //Clear the interval
  blurEvent = () => {
    this.blurListener = this.props.navigation.addListener('blur', () => {
      clearInterval(this.interval);
    });
  };

  //Fetch the interval every 3 seconds
  setFetchInterval = () => {
    this.interval = setInterval(this.fetchdata, 3000);
  };

  //Get all badges
  fetchdata = async () => {
    this.setState({loading: true});
    let response = await Http.instance.get_all();
    // response = response.reverse();
    this.setState({loading: false, badges: response, badgesCopy: response});
  };

  //Show the user badge screen
  handlePress = item => {
    this.props.navigation.navigate('BadgesDetail', {item});
  };

  //Show the edit badge screen
  handleEdit = item => {
    this.props.navigation.navigate('BadgesEdit', {item});
  };

  //Handle if we did a change or some change appears
  handleChange = query => {
    const {badgesCopy} = this.state;

    const badgesFiltered = badgesCopy.filter(badge => {
      return badge.name.toLowerCase().includes(query.toLowerCase());
    });

    this.setState({badges: badgesFiltered});

    if(query){
        clearInterval(this.interval)
    } else{
        this.setFetchInterval();
    }

  };

  //Delete the badge 
  handleDelete = item => {
    Alert.alert(
      'Are you sure?',
      `Do you really want to delete ${item.name}'s badge?\n\nThis process cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            this.setState({loading: true, badges: undefined});
            await Http.instance.remove(item._id);
            let key = `favorite-${item._id}`;
            await Storage.instance.remove(key);
            this.fetchdata();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  //Call the events focus and blur listener
  componentWillUnmount() {
    this.focusListener();
    this.blurListener();
  }

  render() {
    const {badges, loading} = this.state;

    if (loading === true && !badges) {
      return (
        <Loader />
      );
    }

    return (
      <View style={[styles.container, styles.horizontal]}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <BadgesSearch onChange={this.handleChange} />
        <FlatList
          style={styles.list}
          data={badges}
          renderItem={({item}) => (
            <BadgesItem
              key={item._id}
              item={item}
              onPress={() => this.handlePress(item)}
              onEdit={() => this.handleEdit(item)}
              onDelete={() => this.handleDelete(item)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.charade,
  },
  horizontal: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loader: {
    height: '100%',
    paddingHorizontal: 10,
  },
  list: {
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default BadgesScreen;
