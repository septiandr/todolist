import { TextInput,Pressable,Text,View } from "react-native"
import { StyleSheet } from "react-native"
import axios from "axios";
import { useState } from "react";
export default function AddTodo({navigation}){
    const [title,setTitle]= useState()
    const [description,setDescription]= useState()
    const [time,setTime]= useState()
  
    const handleSubmit=() => {
      
        const config ={
            headers:{
              "Content-type": "application/json",
            },
          };
          const data ={title:title.title,description:description.description,time:time.time,status:'not yet'}
        axios.post('https://61e26aba3050a10017682175.mockapi.io/todo', data,config)
        .then(res => {
            console.log(res);
            console.log(res.data);
          })
        navigation.navigate('Todo')
    }
  

    return(
    <View style={style.container}>
        <View>
            <Text style={style.text}>Title</Text>
            <TextInput name="title" style={style.input} onChangeText={(text)=>setTitle({title:text})} ></TextInput>
        </View>
        <View>
            <Text style={style.text}>Time</Text>
            <TextInput name="time" style={style.input} onChangeText={(text)=>setTime({time:text})} type="number" ></TextInput>
        </View>
        <View>
            <Text style={style.text}>description</Text>
            <TextInput name="description" style={style.inputarea} onChangeText={(text)=>setDescription({description:text})}></TextInput>
        </View>
        <Pressable style={style.btn} onPress={handleSubmit}>
            <Text style={style.btntext}>Add Todo</Text>
        </Pressable>
    </View>)
}

const style = StyleSheet.create({
    container:{
        marginLeft:20,
        marginTop:10
    },
    input:{
        width:350,
        height:30,
        backgroundColor:'gray',
        borderColor:'black',
        marginTop:10,
        color:'white',
        borderStyle:'solid',
        borderRadius:10,
        paddingLeft:10,
        fontWeight:'bold'
    },
    inputarea:{
        width:350,
        borderStyle:'solid',
        paddingBottom:100,
        backgroundColor:'gray',
        borderColor:'black',
        marginTop:10,
        color:'white',
        borderRadius:10,
        paddingLeft:10,
        fontWeight:'bold'
    },
    text:{
        marginTop:10,
        fontSize:20,
        fontWeight:'bold'
    },
    btn:{
        marginTop:50,
        marginLeft:250,
        backgroundColor:'green',
        width:100,
        height:30,
        borderRadius:5,
    },
    btntext:{
        color:'white',
        textAlign:'center',
        marginTop:4,
        fontWeight:'bold'
    }
})