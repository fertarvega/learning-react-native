import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Colors from '../../res/Colors';

class BadgesItem extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <View style={StyleSheet.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.row}>
            <Image
              style={styles.profile}
              source={{uri: `${item.profile_picture_url}`}}
            />
            <View style={styles.userData}>
              <Text style={styles.nameText}> {item.name} </Text>
              <Text style={styles.cityText}> {item.city} </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.icons}>
          {this.props.onEdit ? (
            <Pressable onPress={this.props.onEdit}>
              <Image
                style={styles.editIcon}
                source={require('../../assets/editIcon.png')}
              />
            </Pressable>
          ) : null}
          {this.props.onDelete ? (
            <Pressable onPress={this.props.onDelete}>
              <Image
                style={styles.deleteIcon}
                source={require('../../assets/deleteIcon.png')}
              />
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.orange,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.white,
    marginTop: 5,
  },
  profile: {
    width: 55,
    height: 55,
    borderRadius: 50,
    resizeMode: 'cover',
    marginBottom: 15,
    marginTop: 15,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: Colors.white,
  
    marginTop: 15,
  },
  cityText: {
    fontWeight: '100',
    paddingLeft: 20,
    color: Colors.white,    

  },
  icons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: -55,
    marginBottom: 40,
  },
  editIcon: {
    height: 22,
    width: 22,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  deleteIcon: {
    marginLeft: 15,
    height: 22,
    width: 22,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default BadgesItem;
