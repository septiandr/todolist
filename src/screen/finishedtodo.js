import { View,Text } from "react-native"
import { FlatList,Pressable,ScrollView } from "react-native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import { RefreshControl } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function FinishTodo(){
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() =>{ setRefreshing(false); getPost()});
    }, []);
        const [post, setPost] = useState([])
        const [isLoading, setIsLoading] = useState(false)
        React.useEffect(()=>{
            getPost()
        },[])
        const getPost = () => {
            setIsLoading(true)
            axios
                .get('https://61e26aba3050a10017682175.mockapi.io/todo')
                .then((res)=>{
                    setPost(res.data)
                    setIsLoading(false)
                })
                .catch(()=> {
                    alert('Error Fetch Data')
                    setIsLoading(false)
                })
        }
    
        console.log(post)

        const newPost = post.filter((item)=>item.status == 'finish')
        const todo =({item})=>{
            const deleteById = async () => {
                axios.delete(`https://61e26aba3050a10017682175.mockapi.io/todo/${item.id}`)
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                })
                getPost()
                };
            return(<View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Pressable style={{marginLeft:20,marginTop:20}}>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>{item.title}</Text>
                </Pressable>
                <Pressable onPress={deleteById} style={{marginRight:15,backgroundColor:'red',borderRadius:5, width:50,height:30,marginTop:20}}>
                    <Text style={{marginLeft:4,color:'white',marginTop:5,fontWeight:'bold',fontSize:12}} >Delete</Text>
                </Pressable>
            </View>
            )
        }
    
    return(
     
      <ScrollView        
       refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
            <FlatList
                data={newPost}
                renderItem={todo}
                keyExtractor={item => item.id}
            />
            </ScrollView>
    
    )
}