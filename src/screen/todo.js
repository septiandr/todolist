import React, {useState} from 'react';
import {
  SafeAreaView,

  ScrollView,
  StyleSheet,
  Text,
  View,Pressable
 } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios'
import { useEffect } from 'react';

import { RefreshControl } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Todo = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() =>{ setRefreshing(false); getPost()});
    }, []);

    const [post, setPost] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
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

    const newPost = post.filter((item)=>item.status == 'not yet')

    
  const [activeSections, setActiveSections] = useState([]);
  const setSections = (sections) => {
      setActiveSections(
      sections.includes(undefined) ? [] : sections
    );
  };
  const renderHeader = (section, _, isActive) => {
      return (
      <Animatable.View
        duration={400}
        style={[
          styles.header,
          isActive ? styles.active : styles.inactive
        ]}
        transition="backgroundColor">
        <Text style={styles.headerText}>
          {section.title}
        </Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    const handleSubmit = async() => {
        
        const config ={
          headers:{
            "Content-type": "application/json",
          },
        };
        const data ={status:'finish'}
        console.log(data)
         const res = await axios.put(`https://61e26aba3050a10017682175.mockapi.io/todo/${section.id}`,data,config);
         console.log(res)
         getPost()
      };
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.content,
          isActive ? styles.active : styles.inactive
        ]}
        transition="backgroundColor">
        <Text><Text style={{fontWeight:'bold'}}>Description:</Text>{section.description}</Text>
        <Text style={{marginTop:20}}><Text style={{fontWeight:'bold'}}>Time:</Text>{section.time}</Text>
        <Pressable style={styles.btn} onPress={handleSubmit}><Text style={styles.btntxt}>Done</Text></Pressable>
      </Animatable.View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView         refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Accordion
            activeSections={activeSections}
            sections={newPost}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
          />

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginLeft:20
  },
  headerText: {
    textAlign: 'left',
    marginLeft:20,
    fontSize: 14,
    fontWeight: 'bold',
    color:'black',marginTop:5
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    color:'black'
  },
  active: {
    backgroundColor: 'white',width:330,
  },
  inactive: {
    backgroundColor: 'gray',
  },
  header:{
      color:'white',
      marginTop:10,
      width:330,
      height:30,
      borderRadius:5
  },
  btn :{
    marginLeft:250,backgroundColor:'green',borderRadius:5, width:50,height:30,marginTop:20
  },
  btntxt:{
    marginLeft:7,color:'white',marginTop:5,fontWeight:'bold'
  }
});