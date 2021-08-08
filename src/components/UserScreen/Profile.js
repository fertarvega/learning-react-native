import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Colors from '../../res/Colors';
import UserSession from '../../libs/sessions';

var last_name_save

class Profile extends React.Component {
  state = {
    user: {
      profile: {},
    },
    token: {},
  };

  componentDidMount() {
    this.getUserData();
  }

  //Get the user data using the token
  getUserData = async () => {
    let user = await UserSession.instance.getUser();
    //console.log(user.first_name);
    last_name_save = user.last_name
    console.log(last_name_save)
    let token = await UserSession.instance.getToken(user.username);
    this.setState({user: user, token: token});
    //console.log(this.state);
  };

  //handle the image from the local storage
  handleChooseProfileImage = async () => {
    const options = {
      includeBase64: false,
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        let photo = response.assets[0].uri;
        this.setState({picture: photo});
        this.editProfilePicture();
      }
    });
  };

  //with this function we send the token, the id and the picture that we upload on
  editProfilePicture = async () => {
    const {user, token, picture} = this.state;

    let response = await UserSession.instance.editProfile(
      user.id,
      token,
      picture,
    );

    //console.log(response);
  };

  render() {
    const {user, picture} = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Image
            style={styles.header}
            source={{uri: `${user.profile.header_img}`}}
          />
          <Image
            style={styles.profileImage}
            source={{uri: picture || `${user.profile.profile_img}`}}
          />
          <TouchableOpacity
            style={styles.profileEdit}
            onPress={this.handleChooseProfileImage}>
            <Image
              style={styles.iconProfileEdit}
              source={require('../../assets/camera.png')}
            />
          </TouchableOpacity>
          <View style={styles.userinfo}>
            <Text style={styles.name}>
              {user.first_name} {user.last_name}
            </Text>
            <Text style={styles.age}>
              {user.profile.age}
            </Text>
          </View>
          <View style={{alignItems: "center"}}>
          <Text style={styles.city}>
              {user.profile.city}
            </Text>
          </View>
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.charade,
  },
  horizontal: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    margin: 20,
    width: '90%',
    height: 'auto',
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginTop: 50,

  },
  userinfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    height: 310,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 20,
  },
  profileImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 125,
    borderWidth: 4,
    borderColor: Colors.white,
    position: 'absolute',
    top: 25,
    left: '15.5%',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.zircon,
  },
  inputText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
  },
  submit: {
    marginVertical: 30,
    marginLeft: 15,
    width: '30%',
    borderWidth: 1,
    borderColor: Colors.zircon,
    borderRadius: 10,
    backgroundColor: Colors.charade,
  },
  submitText: {
    fontSize: 16,
    margin: 5,
    color: Colors.white,
    textAlign: 'center',
  },
  profileEdit: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.white,

    position: 'absolute',
    right: 85,
    top: 230,
  },
  iconProfileEdit: {
    tintColor: Colors.black,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: Colors.blackPearl,
  },
  age: {
    marginTop: 4,
    fontSize: 20,
    marginLeft: 20,
    color: Colors.zircon,
  },
  city: {
    marginTop: 4,
    fontSize: 20,
    marginLeft: 20,
    color: Colors.zircon,
    marginBottom: 20
  }
});

export default Profile;
