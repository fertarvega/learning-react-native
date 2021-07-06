import React from 'react'
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

class BadgeLogin extends React.Component {

    render(){
        return (
            <ScrollView style={Styles.Container}>
                <StatusBar backgroundColor="transparent" translucent={true}/>
                <View style={Styles.logoContainer}>
                        <Image
                            style={Styles.logo}
                            source={{
                            uri: 'https://resizer.glanacion.com/resizer/tTXgzRPXploSpp4PkuFixr4EFks=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/QS3KNYFVIFHPJLNBGX45PZCZSM.jpg',
                        }}/>
                </View> 
                <View style={Styles.FormContainer}>   
                    <Text style={Styles.title}>Login</Text>
                    <View style={Styles.inputContainer}>
                        <TextInput style={Styles.input} placeholder='Name' placeholderTextColor={Colors.black}/>
                        <TextInput style={Styles.input} placeholder='Password' placeholderTextColor={Colors.black}/>
                    </View>
                </View>
                <TouchableOpacity style={Styles.darkButton}>
                    <Text style={Styles.darkButtonText}>LOGIN</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width
var iconSize  =  height*.25
var borderTop = height*.10
var FormWidth = width*.80
var FormHeight = height*.70
const Styles = StyleSheet.create({
    Container: {
        backgroundColor:Colors.purple,
        position: 'relative',
        zIndex:0
    },
    FormContainer: {

        marginTop:FormHeight * .60,
        height:FormHeight * .52,
        width: FormWidth - 30,
        alignSelf: 'center',
        padding:'auto',
        backgroundColor:Colors.white,
        borderRadius:15,
        position: 'relative',
        marginBottom: height*.9-(borderTop + FormHeight)
    },
    logo: {
        alignSelf: 'center',
        height:iconSize,
        width:iconSize,
        borderRadius: iconSize,
        

    },
    logoContainer: {
        marginTop: borderTop,
        alignSelf: 'center',
        height:iconSize,
        width:iconSize,
        backgroundColor:Colors.white,
        position: 'absolute',
        borderRadius: iconSize,
        zIndex:2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.81,
        shadowRadius: 13.16,

        elevation: 20,
    },
    title:{

        marginTop:iconSize/5,

        alignSelf: 'center',

        fontSize: Fonts.subTitle,
    
        color: Colors.blue,


      },
    input: {

        color: Colors.black,
    
        borderBottomColor: Colors.black,
    
        borderBottomWidth: 1,

        fontSize: Fonts.text,
        
        paddingBottom: 0,

        marginBottom: 15,

        width: '70%',
    
        textAlign: 'center',
    },
    inputContainer:{
        alignItems: 'center',
        marginTop:20,
    },
    darkButton:{
        alignSelf: 'center',
    
        height:FormHeight*.1,
        
        marginTop:FormHeight*1.07,
        
        width:FormWidth*.6,

        borderRadius: 15,

        fontSize:Fonts.miniButtons,

        backgroundColor: Colors.black,

        justifyContent: 'center',
    
        zIndex: 5,
    
        position: 'absolute',
    },
    darkButtonText:{
        alignSelf: 'center',
        color: Colors.white
    }
})

export default BadgeLogin