import React,{useEffect,useState} from "react";
import {style} from './style'
import { SafeAreaView,Text,TouchableOpacity,FlatList,Image,View,StyleSheet,ActivityIndicator } from "react-native";

const App=()=>{
  const [loading,setLoading] =  useState(false);
  const [movies,setMovies] = useState([]);
  useEffect(()=>{
    handleLoadMovie()
  },[])
  const handleLoadMovie = async ()=>{
    setLoading(true)
    const req = await fetch("https://api.b7web.com.br/cinema/");
    const json = await req.json();
    setLoading(false)
    if(json){
      setMovies(json)
    }
  }
  return(
    <SafeAreaView style={style.container} >
      <TouchableOpacity title="Carregar filmes" style={style.button} onPress={handleLoadMovie} >
        <Text style={style.textBtn} >Carregar Filmes</Text>
      </TouchableOpacity>
        {loading && 
         <View style={style.loadin}> 
            <ActivityIndicator size={"large"} color={"#fff"}/>
            <Text style={style.loadingText}>Carregando...</Text>
         </View>
        }
        {!loading && 
      <>
       <Text style={style.totalMovies}>Total de filmes: {movies.length}</Text>
       
       <FlatList 
          style={style.list}
          data={movies}
          renderItem={({item})=>{
             return(
              <View style={style.movieItem}>
                <Text style={style.texTitulo}>{item.titulo}</Text>
                <Image 
                  source={{uri:item.avatar}}
                  resizeMode="contain"
                  style={style.movieImage}
                />
              </View>);}}
              keyExtractor={item => item.titulo}/>
      </>}
    </SafeAreaView>
  );
}

export default App; 