import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import Colors from '../../res/Colors'

class BadgesItem extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <View style={StyleSheet.container}>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Image style={styles.profile} source={{uri:`${item.profile_picture_url}`}}/>
                        <View style={styles.userData}>
                            <Text style={styles.nameText}> {item.name} </Text>
                            <Text style={styles.cityText}> {item.city} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: 'row'
    },
    profile: {
        width: 55,
        height: 55,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        color: Colors.white,
    },
    cityText: {
        fontWeight: '100',
        paddingLeft: 20,
        color: Colors.white,
    },
});

export default BadgesItem;