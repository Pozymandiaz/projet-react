import { StyleSheet, Text, Image , View , Button , TextInput , FlatList } from 'react-native'
import React , {useState , useEffect} from 'react'
import { schemaOeuvre } from "../verification/oeuvre"
import db from "../firebaseConfig"
import { getDocs,updateDoc , doc, collection, deleteDoc  } from "firebase/firestore"



const GestionOeuvres = ({navigation}) => {

    const [oeuvres, setOeuvres] = useState([]);
    const [id, setId]= useState("");
    const [nom, setNom]= useState("");
    const [description, setDescription]= useState("");
    const [image, setImage]= useState("");
    const [auteur, setAuteur]= useState("");
    //const [dt_creation, setDt_creation]= useState("");
    const [erreurs, setErreurs]= useState([]);
    const [updateList, setUpdateList] = useState(false);
   

    useEffect(() => {
      getDocs(collection(db, "oeuvres"))
        .then((snapShot) => {
          const data = [];
          snapShot.docs.map((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setOeuvres(data);
          setUpdateList(!updateList);
        });
    }, [updateList])


    const supprimer = (id) => {
        deleteDoc(doc(db , "oeuvres" , id)).then(function(){
            setUpdateList(!updateList);
        });
    }
  return (
    <View>
      <Button onPress={function(){
        navigation.navigate("Create")
      }} title="ajouter une oeuvre" />
      <FlatList 
        data={oeuvres}
        renderItem={function({item}){ 
            return <View style={{borderWidth:1 , borderBlockColor : "black" , padding : 5 , alignItems : "center"}}>
                <Button onPress={function(){
                    navigation.navigate("Update" , {id : item.id })
                }} color="orange" title="m"/>
                <Button onPress={function(){  
                    supprimer(item.id)
                }} color="red" title="s"/>
               <Text>nom { item.nom }</Text>
                <Text style={{}}>description { item.description }</Text>
                <Image source= {{uri : item.image, width: 150, height: 100}} />
                <Text style={{}}>auteur { item.auteur }</Text>
                
            </View>
         }}
      />
    </View>
  )
}

export default GestionOeuvres

const styles = StyleSheet.create({})