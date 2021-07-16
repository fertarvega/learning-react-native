import URLS from './url';
import Storage from './storage';

const DJANGO_URL = 'https://django-fertarvega.herokuapp.com'

class UserSession {
  static instance = new UserSession();

  login = async body => {
    //console.log(body)
    try {
      let request = await fetch(`${DJANGO_URL}/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
      let response = await request.json();
      //console.log(response)
      try {
        
        let key = `token-${response.user.username}`;
        await Storage.instance.store(key, response.token);
        return response.user.username;
      } catch (err){
        return response
      }

    } catch (err) {
      console.log('Login error', err);
      throw Error(err);
    }
  };

  logout = async body => {
    try {
      await Storage.instances.remove(key);
      return true;
    } catch (err) {
      console.log('Logout err', err);
      return false;
    }
  };

  signup = async body => {
    try {
      await fetch(`${DJANGO_URL}/users/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log('Sign up error', err);
      throw Error(err);
    }
  };

  getToken = async key => {
    try {
      return await Storage.instance.get(key);
    } catch (err) {
      console.log('Get token error', err);
    }
  };
}

export default UserSession;
