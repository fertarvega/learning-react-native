import URLS from './url';
import Storage from './storage';

const DJANGO_URL = 'https://django-fertarvega.herokuapp.com';

class UserSession {
  static instance = new UserSession();

  login = async body => {
    try {
      let request = await fetch(`${DJANGO_URL}/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      let response = await request.json();
      try {
        let key = `token-${response.user.username}`;
        await Storage.instance.store(key, response.token);
        key = `id-${response.user.username}`;
        await Storage.instance.store(key, JSON.stringify(response.user));
        return true;
      } catch (err) {
        return response;
      }
    } catch (err) {
      console.log('Login error', err);
      throw Error(err);
    }
  };

  logout = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const tokens = allKeys.filter(key => key.includes('token-'));
      await Storage.instance.multiRemove(tokens);
      const ids = allKeys.filter(key => key.includes('id-'));
      await Storage.instance.multiRemove(ids);

      //console.log(allKeys);
      return true;
    } catch (err) {
      console.log('logout err', err);
      return false;
    }
  };

  signup = async body => {
    try {
      let request = await fetch(`${DJANGO_URL}/users/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
      let response = await request.json();
      if (typeof response.username == 'string') {
        return response.username;
      } else {
        return response;
      }
    } catch (err) {
      console.log('signup err', err);
      throw Error(err);
    }
  };

  getUser = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const data = allKeys.filter(key => key.includes('id-'));
      const user = await Storage.instance.get(data.toString());
      console.log(JSON.parse(user));
      return JSON.parse(user);
    } catch (err) {
      console.log('Get user id err', err);
    }

    // let request = await fetch(`${DJANGO_URL}/profile/${user_id}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(),
    // });
    // let response = request.json();
    // console.log(response);
  };

  getToken = async username => {
    try {
      const key = `token-${username}`;
      return await Storage.instance.get(key);
    } catch (err) {
      console.log('Get token error', err);
    }
  };
}

export default UserSession;
