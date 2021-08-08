import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class SettingsScreen extends Component{
    constructor(){
    super();
    this.state = {
      emailId:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      docId:'',
        }
    }
    getUserDetails =()=>{
        var user = firebase.auth().currentUser;
        var email = firebase.auth().currentUserEmail;
        db.collection('users').where('email_Id','==',email).get().then(snapshot=>{
            snapshot.forEach (doc=>{
                var data = doc.data()
                this.setState({
                    emailId:data.email_Id,
                    firstName:data.first_Name,
                    lastName:data.last_Name,
                    address:data.address,
                    contact:data.contact, 
                    docId:doc.Id,
                })
            })
        })
    }
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            "first_Name":this.state.firstName,
            "last_Name":this.state.lastName,
            "address":this.state.address,
            "contact":this.state.contact,
        })
        Alert.alert('Successfully Updated')

    }
    componentDidMount(){
        this.getUserDetails();
    }

    render(){
        return(
            <View>
                <Text>
                    Settings
                </Text>
            </View>
        )
    }

render(){
    return(
        <View style = {styles.container}>
            <MyHeader title = "Settings" navigation = {this.props.navigation}/>
            <View style = {styles.formContainer}>
            <TextInput
                style = {styles.formTextInput}
                placeHolder = {'Email'}
                keyboardType = {"email-address"}
                onChangeText = {(text)=>{
                    this.setState({
                        emailId: text
                    })
                }}
                value = {this.state.emailId}
                />
                <TextInput
                style = {styles.formTextInput}
                placeHolder = {'First Name'}
                maxLength = {10}
                onChangeText = {(text)=>{
                    this.setState({
                        firstName: text
                    })
                }}
                value = {this.state.firstName}
                />
                <TextInput
                style = {styles.formTextInput}
                placeHolder = {'Last Name'}
                maxLength = {15}
                onChangeText = {(text)=>{
                    this.setState({
                        lastName: text
                    })
                }}
                value = {this.state.lastName}
                />
                <TextInput
                style = {styles.formTextInput}
                placeHolder = {'Address'}
                multiline = {true}
                onChangeText = {(text)=>{
                    this.setState({
                        address: text
                    })
                }}
                value = {this.state.address}
                />
                <TextInput
                style = {styles.formTextInput}
                placeHolder = {'Contact'}
                maxLength = {10}
                keyboardType = {'numeric'}
                onChangeText = {(text)=>{
                    this.setState({
                        contact: text
                    })
                }}
                value = {this.state.contact}
                />
                <TouchableOpacity style = {styles.button}
                    onPress = {()=>{
                        this.updateUserDetails()
                    }}>
                        <Text style = {styles.buttonText}>
                            Update
                        </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
    formContainer:{
        flex:1,
        width:'75%',
        alignItems:'center',
    },
    formTextInput:{
        flex:1,
        alignItems:'center',
        width:'75%',
        height: 25,
        borderRadius: 11,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    button:{
        flex:1,
        alignItems:'center',
        width:'50%',
        height: 45,
        borderRadius: 12,
        borderWidth:2,
        marginTop:15,
        padding:10,
        backgroundColor:'red' 
    },
    buttonText:{
        fontSize:15,
        fontWeight:'bold',
        color:'white',
    }
})


