import {defer} from "lodash"
import React from 'react'
import {
    View, 
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
} from "react-native"
import Colors from '../../res/Colors'

const Background = {
    uri: `https://images.wallpaperscraft.com/image/bird_fantastic_flight_136785_1440x2560.jpg`,
};

class BadgesLanding extends React.Component{
    handlePress = () => {
        this.props.navigation.replace('BadgesTabNavigator');
    };

    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true}/>
                <ImageBackground source={Background} style={styles.image}>
                    <View style={styles.layerColor}>
                        <Text style={styles.title}>
                            Welcome {'\n'}to my {'\n'}App
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
                            <Text style={styles.buttonText}>Welcome</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    layerColor: {
        flex: 2,
        backgroundColor: 'rgba(112,0,255,0.20)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        margin: 30,
        fontSize: 80,
        fontWeight: 'bold',
        color: Colors.white,
    },
    button: {
        padding: 15,
        marginTop: 50,
        borderRadius: 15,
        backgroundColor: Colors.orange,
        borderColor: Colors.white,
        borderWidth: 1,
        zIndex: 3
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 25,
        color: Colors.white,
    },
});

export default BadgesLanding