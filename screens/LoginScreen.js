import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal, KeyBoardAvoidingView, ScrollView} from 'react-native'
import db from '../config';
import firebase from 'firebase';

export default class LoginScreen extends Component{
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: '',
            firstName:'',
            lastName:'',
            address:'',
            confirmPassword:'',
            isModalVisible:'false',
            itemValue:"", 
            currencyCode:"",
        }
    }
    
    userLogin = (emailId, password)=>{
      firebase.auth().signInWithEmailAndPassword(emailId, password)
      .then(()=>{
       this.props.navigation.navigate("DonateABook")
      })
      .catch((error)=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      })
    }

    userSignUp = (emailId, password, confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address,
              currency_code:this.state.currencyCode,
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }
     
      showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Confirm Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
                /><TextInput
                style={styles.formTextInput}
                placeholder ={"Country Currency Code"}
                maxLength = {8}
                onChangeText={(text)=>{
                  this.setState({
                    currencyCode : text
                  })
                }} 
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={()=>this.setState({"isModalVisible":false})}
                >
                <Text style={{color:'#ff5722'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
    }
    render(){
        return(
            <View style = {styles.container}>
                
            <View style={{justifyContent:'center',alignItems:'center'}}> { 
            this.showModal() 
            } 
            </View> 
            <View style={styles.profileContainer}> 
            <BarterAnimation/> 
            <Text style={styles.title}>Barter</Text> 
            <Text style={{color:'#ff8a65'}}> A Trading Method </Text> 
            </View>

              <View style={styles.buttonContainer}> 
              <Text style={{ 
                  color: "#ff5722", 
                  fontSize: 18, 
                  fontWeight: "bold", 
                  marginLeft: 55 
                  }}> USERNAME </Text>
                </View>
             <View> 
                 <TextInput style = {styles.loginBox}
                 placeholder="abc@email.com"
                 keyboardType="email-address"
                 placeholderTextColor="black"
                 onChangeText = {(text)=>{
                     this.setState({
                         emailId:text
                     })
                 }}/>

                 <TextInput style = {styles.loginBox}
                 secureTextEntry={true}
                 placeholder="Enter Password"
                 placeholderTextColor="black"
                 onChangeText = {(text)=>{
                    this.setState({
                        password:text
                    })
            }}/>
            <TouchableOpacity style = {[styles.button, {marginBottom:20, marginTop:20,}]}
            onPress = {()=>{
                this.userLogin(this.state.emailId,this.state.password)
            }}
            >  
            <Text style = {styles.buttonText}>
                Login
            </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[styles.button, {marginBottom:20, marginTop:20,}]}
            onPress = {()=>{
                this.userSignUp(this.state.emailId,this.state.password)
            }}
            >  
            <Text style = {styles.buttonText}>
                Sign Up
            </Text>
            </TouchableOpacity>
            
         </View> 
         </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container={
        flex:1,
        backgroundColor: 'tan',
    },
    title: {
        margin: 10,
        textAlign: "center",
        fontSize: 38,
        fontWeight: "bold",
        color: "orange",
      },
      loginBox: {
        width: 300,
        height: 50,
        borderWidth: 2.5,
        margin: 10,
        paddingLeft: 10,
      },
      button: {
        marginTop: 10,
        width: 100,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 2.5,
        backgroundColor: "#baddf2",
      },
      buttonText: {
        textAlign: "center",
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
      },
      buttonContainer:{
        flex:1
      },
      KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
      profileContainer:{
          flex:1
      },
});
