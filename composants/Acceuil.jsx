import { StyleSheet, Text, View , Button , FlatList,  Image } from 'react-native'
import React , { useState, useEffect } from 'react'
import db from "../firebaseConfig" ;
import { getDocs , collection , doc , deleteDoc } from "firebase/firestore"
 
const Accueil = ({navigation}) => {
    const [oeuvres , setOeuvres] = useState([]); 



    useEffect( function(){ 

        // ipconfig pour trouvez la bonne ip 
        /* fetch("http://192.168.33.1:9999").then(function(reponse){
            return reponse.json();
        }).then(function(data){ console.log(data)})
        */
        getDocs(collection(db, "oeuvres"))
        .then(function(snapShot){
            const data = []; 
            snapShot.docs.map(function(doc){
                data.push({...doc.data() , id : doc.id})
            })
            setOeuvres(data);
        })

    } , [])


    

    const handleSubmit = (id) => {
      
      navigation.navigate('Update', {id: id})
    }



  return (
    <View>
      <Text>Accueil</Text>
      
      <FlatList 
        data={oeuvres}
        renderItem={function({item}){ 
            return <View style={{  borderWidth:1 , borderBlockColor : "black" , padding : 50 , paddingLeft : 50 , paddingRight : 50 , alignItems : "center" , marginTop : 60 , flex : 1}}>
                
                <Text>nom { item.nom }</Text>
                <Text style={{}}>description { item.description }</Text>
                <Image source= {{uri : item.image, width: 150, height: 100}} />
                <Text style={{}}>auteur { item.auteur }</Text>
                <Button onPress={()=>handleSubmit(item.id)} color="orange" title="m"/>

            </View>
         }}
      />
    </View>
  )
}

export default Accueil

const styles = StyleSheet.create({})