import React from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Colors from '../../res/Colors';
import Fonts from '../../res/Fonts';
import UserSession from '../../libs/sessions';
import Loader from '../Generics/Loader';
import Signup from './BadgeSignup';

class Login extends React.Component {
  state = {
    loading: false,
    error: null,
    user: undefined,
    isPasswordVisible: true,
    form: {},
  };

  componentDidMount = () => {
    this.deleteTokens();
  };

  deleteTokens = async () => {
    await UserSession.instance.logout();
  };

  handleSubmit = async () => {
    try {
      this.setState({loading: true, error: null, user: undefined});
      let response = await UserSession.instance.login(this.state.form);

      if (typeof response == 'object') {
        console.log(response);
        if (response['405']) {
          var message = 'Your account is not verified';
        } else {
          var message = 'Invalid username or password, try again';
        }
        this.setState({loading: false, error: message, user: undefined});
      } else {
        this.setState({loading: false, error: null, user: response});
      }
    } catch (err) {
      this.setState({loading: false, error: err});
    }
    if (this.state.user) {
      this.props.navigation.replace('BadgesTabNavigator');
    }
  };

  toggleisPasswordVisible = () => {
    if (this.state.isPasswordVisible) {
      this.setState({isPasswordVisible: false});
    } else {
      this.setState({isPasswordVisible: true});
    }
  };

  handleSignup = () => {
    this.props.navigation.navigate('Signup');
  };

  render() {
    const {isPasswordVisible, loading, error, user} = this.state;
    if (loading === true && !user) {
      return <Loader />;
    }
    return (
      <ScrollView style={Styles.Container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={Styles.logoContainer}>
          <Image
            style={Styles.logo}
            source={{
              uri: 'https://resizer.glanacion.com/resizer/tTXgzRPXploSpp4PkuFixr4EFks=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/QS3KNYFVIFHPJLNBGX45PZCZSM.jpg',
            }}
          />
        </View>
        <View style={Styles.FormContainer}>
          <Text style={Styles.title}>Login</Text>
          {error ? (
            <View style={Styles.error}>
              <Text>{error}</Text>
            </View>
          ) : null}
          <View style={Styles.inputContainer}>
            <TextInput
              style={Styles.input}
              placeholder="Name"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.username = text;
                  return {form};
                });
              }}
            />
            <TextInput
              secureTextEntry={isPasswordVisible}
              style={Styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.charade}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.password = text;
                  return {form};
                });
              }}
            />
            <TouchableOpacity style={Styles.password} onPress={this.toggleisPasswordVisible}>
              <Image
                style={Styles.passwordIcon}
                source={
                  isPasswordVisible
                    ? require('../../assets/eye.png')
                    : require('../../assets/closedeye.png')
                }
              />
            </TouchableOpacity>

          </View>
        </View>
        <TouchableOpacity style={Styles.darkButton} onPress={this.handleSubmit}>
          <Text style={Styles.darkButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Styles.lightButton}
          onPress={this.handleSignup}>
          <Text style={Styles.lightButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var iconSize = height * 0.25;
var borderTop = height * 0.1;
var FormWidth = width * 0.8;
var FormHeight = height * 0.7;
const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.purple,
    position: 'relative',
    zIndex: 0,
  },
  error: {
    backgroundColor: Colors.red,
    marginLeft: 10,
    paddingLeft: 10,
    marginTop: 10,
    paddingTop: 15,
    marginRight: 5,
    marginBottom: -25,
    paddingBottom: 15,
    zIndex: 0,
  },
  FormContainer: {
    marginTop: FormHeight * 0.6,
    height: FormHeight * 0.8,
    width: FormWidth - 30,
    alignSelf: 'center',
    padding: 'auto',
    backgroundColor: Colors.white,
    borderRadius: 15,
    position: 'relative',
    marginBottom: height * 0.9 - (borderTop + FormHeight),
  },
  logo: {
    alignSelf: 'center',
    height: iconSize,
    width: iconSize,
    borderRadius: iconSize,
  },
  logoContainer: {
    marginTop: borderTop,
    alignSelf: 'center',
    height: iconSize,
    width: iconSize,
    backgroundColor: Colors.white,
    position: 'absolute',
    borderRadius: iconSize,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.81,
    shadowRadius: 13.16,

    elevation: 20,
  },
  title: {
    marginTop: iconSize / 5,

    alignSelf: 'center',

    fontSize: Fonts.subTitle,

    color: Colors.blue,
  },
  input: {
    color: Colors.black,

    borderBottomColor: Colors.black,

    borderBottomWidth: 1,

    fontSize: Fonts.text,

    marginBottom: 15,

    width: '70%',

    textAlign: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  darkButton: {
    alignSelf: 'center',

    height: FormHeight * 0.1,

    marginTop: FormHeight * 1.07,

    width: FormWidth * 0.6,

    borderRadius: 15,

    fontSize: Fonts.miniButtons,

    backgroundColor: Colors.black,

    justifyContent: 'center',

    zIndex: 5,

    position: 'absolute',
  },
  darkButtonText: {
    alignSelf: 'center',
    color: Colors.white,
  },
  lightButton: {
    alignSelf: 'center',

    height: FormHeight * 0.1,

    marginTop: 670,

    width: FormWidth * 0.6,

    borderRadius: 15,

    fontSize: Fonts.miniButtons,

    backgroundColor: Colors.white,

    justifyContent: 'center',

    zIndex: 5,

    position: 'absolute',
    borderColor: Colors.black,
    borderWidth: 1,
  },
  lightButtonText: {
    alignSelf: 'center',
    color: Colors.black,
  },
  password: {
    bottom: 50,
    left: 90,
    tintColor: Colors.black,

  },

  passwordIcon: {
    width: 25,
    height: 25,
  }
});

export default Login;
