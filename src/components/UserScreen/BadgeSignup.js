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
import UserSession from '../../libs/sessions';
import Colors from '../../res/Colors';
import Fonts from '../../res/Fonts';
import Loader from '../Generics/Loader';

class BadgeSignup extends React.Component {
  state = {
    loading: false,
    errors: [],
    user: undefined,
    isPasswordVisible: true,
    isPasswordConfVisible: true,
    form: {},
  };

  //Send the signup information, handle the information from the form
  handleSubmit = async () => {
    try {
      this.setState({loading: true, user: undefined});
      let response = await UserSession.instance.signup(this.state.form);

      if (typeof response == 'object') {
        let errors = [];
        let cont = 0;

        for (let error in response) {
          let key = error;
          if (error == 'non_field_errors') {
            error = 'password';
          }

          errors.push(
            <View key={cont}>
              <Text>{`${error} : ${response[key][0]}`}</Text>
            </View>,
          );
          cont++;
        }
        this.setState({loading: false, user: undefined, errors: errors});
      } else {
        this.setState({
          loading: false,
          user: response,
          errors: [],
        });
        if (this.state.user) {
          this.props.navigation.navigate('Login');
        }
      }
    } catch (err) {
      console.log('Sign up err', err);
      throw Error(err);
    }
  };

  //Show or hide the password 
  toggleisPasswordVisible = () => {
    if (this.state.isPasswordVisible) {
      this.setState({isPasswordVisible: false});
    } else {
      this.setState({isPasswordVisible: true});
    }
  };
  
  //Show or hide the password 
  toggleisPasswordConfVisible = () => {
    if (this.state.isPasswordConfVisible) {
      this.setState({isPasswordConfVisible: false});
    } else {
      this.setState({isPasswordConfVisible: true});
    }
  };

  render() {
    const {isPasswordVisible, loading, user, errors, isPasswordConfVisible} =
      this.state;
    if (loading == true) {
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
          <Text style={Styles.title}>Sign up</Text>
          {errors ? (
            <View style={Styles.errors}>
              <Text>{errors}</Text>
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
              style={Styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.email = text;
                  return {form};
                });
              }}
            />
            <TextInput
              secureTextEntry={isPasswordVisible}
              style={Styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.password = text;
                  return {form};
                });
              }}
            />
            <TouchableOpacity
              style={Styles.password}
              onPress={this.toggleisPasswordVisible}>
              <Image
                style={Styles.passwordIcon}
                source={
                  isPasswordVisible
                    ? require('../../assets/eye.png')
                    : require('../../assets/closedeye.png')
                }
              />
            </TouchableOpacity>
            
            <TextInput
              secureTextEntry={isPasswordConfVisible}
              style={Styles.inputConf}
              placeholder="Password confirmation"
              placeholderTextColor={Colors.black}
              onChangeText={text => {
                this.setState(prevState => {
                  let form = Object.assign({}, prevState.form);
                  form.password_confirmation = text;
                  return {form};
                });
              }}
            />
            <TouchableOpacity
              style={Styles.password}
              onPress={this.toggleisPasswordConfVisible}>
              <Image
                style={Styles.passwordIcon}
                source={
                  isPasswordConfVisible
                    ? require('../../assets/eye.png')
                    : require('../../assets/closedeye.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={Styles.darkButton} onPress={this.handleSubmit}>
          <Text style={Styles.darkButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var iconSize = height * 0.15;
var borderTop = height * 0.1;
var FormWidth = width * 0.8;
var FormHeight = height * 0.7;
const Styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.orange,
    position: 'relative',
    zIndex: 0,
  },
  errors: {
    //backgroundColor: Colors.red,
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
    marginTop: borderTop + iconSize / 2,
    height: FormHeight - 50,
    width: FormWidth - 40,
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
    borderRadius: iconSize / 2,
  },
  logoContainer: {
    marginTop: borderTop,
    alignSelf: 'center',
    height: iconSize,
    width: iconSize,
    backgroundColor: Colors.white,
    position: 'absolute',
    borderRadius: iconSize / 2,
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
    marginTop: iconSize / 1.65,

    alignSelf: 'center',

    fontSize: Fonts.subTitle,

    color: Colors.blue,
  },
  input: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: Colors.black,

    borderBottomColor: Colors.black,

    borderBottomWidth: 1,

    fontSize: Fonts.text,

    paddingBottom: 0,

    marginBottom: 15,

    width: '80%',

    textAlign: 'center',
  },
  inputConf: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: Colors.black,

    borderBottomColor: Colors.black,

    borderBottomWidth: 1,

    fontSize: Fonts.text,

    paddingBottom: 0,

    marginBottom: 15,

    marginTop: -25,

    width: '80%',

    textAlign: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  darkButton: {
    alignSelf: 'center',

    height: FormHeight * 0.1,

    marginTop: borderTop + iconSize / 2 + FormHeight * 0.85,

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
  password: {
    bottom: 46,
    left: 98,
    tintColor: Colors.black,
  },

  passwordIcon: {
    width: 25,
    height: 25,
  },
});

export default BadgeSignup;
