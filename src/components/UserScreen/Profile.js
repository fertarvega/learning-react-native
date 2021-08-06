import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Colors from '../../res/Colors';
import UserSession from '../../libs/sessions';

class Profile extends React.Component {
  state = {
    user: undefined,
    token: undefined,
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    let user = await UserSession.instance.getUser();
    //console.log(user.username);
    let token = await UserSession.instance.getToken(user.username);
    this.setState({user: user, token: token});
    console.log(this.state);
  };

  render() {
    return (
      <View>
        <Text>Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.charade,
  },
});

export default Profile;
