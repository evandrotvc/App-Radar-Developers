import React , {useEffect , useState} from 'react'
import {View , StyleSheet , Image , Text , TextInput , TouchableOpacity} from 'react-native'
import MapView , {Marker , Callout} from 'react-native-maps'
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons'

import api from '../services/api'
import {connect , disconnect , subscribeToNewDevs} from '../services/socket' // após a primeira busca, ouve em tempo real, todos devs que trabalham no raio 10 km com tais linguagens
// as vezes é interessante deixar um botão sem fazer nada,arrow function sem nada , só para estética, para isso basta: <TouchableOpacity onPress= { () => {}} style = {styles.loadButton}>
// {{}} primeira chave é cod js e a segunga que é um objeto javascript linha 6
// Callout é a interface que quando vc clica no usuario no mapa aparece as info do mesmo
// UseEffect dispara uma função toda vez que uma variavel muda de valor 
function Main( {navigation} ){ //
    const [devs , setDevs] = useState([])
    const [CurrentRegion , setCurrentRegion] = useState(null)
    const [techs , setTechs] = useState('')
    
    useEffect(() => {
        async function LoadinitialPosition(){
            const {granted} = await requestPermissionsAsync() // granted = deu permissão ou não?

            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true , // PRECISA DO GPS HABILITADO , se n quiser gps, passa o argumento como False
                })

                const {latitude , longitude} = coords
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04, // permite zoom no mapa
                    longitudeDelta: 0.04,
                })
                
            }
        }
        LoadinitialPosition()
    }, [])

    useEffect(() => { // monitorar a variavel devs, toda vez q mudar , rode subscribetonew
        subscribeToNewDevs(dev  => setDevs( [...devs , dev ] ))
    } , [devs])
    function setupWebsocket(){
        disconnect()
        const {latitude , longitude} = CurrentRegion
        connect(
            latitude,
            longitude,
            techs,
        )
    }
    async function loadDevs(){ // comunica com a api search do nodeJS, para filtrar os devs pelas techs
        const {latitude , longitude  } = CurrentRegion

        const response = await api.get('/search' , {
            params: {
                latitude,
                longitude,
                techs 
            }
        })
        setDevs(response.data.devs)
        setupWebsocket()
    }

    // Toda vez q o usuario mexer no mapa agora, atualiza a lat e longitude
    function handleRegionChange(region){ // funcao onRegionChangeComplete(region) é o padrão
        
        setCurrentRegion(region)
    }
    if(!CurrentRegion) { // enquanto não carregar a localização, deixe a tela em branco
        return null
    }
    return (
    <>  
        <MapView onRegionChangeComplete= {handleRegionChange} initialRegion= {CurrentRegion} style = {styles.map}>
       {devs.map(dev => ( // Iteração para marcar  todos os devs no mapa
            <Marker 
            key = {dev._id} // Tem iteração? obrigatorio colocar esse id logo após a tag
            coordinate= {{
                latitude: dev.location.coordinates[1] , // no banco coordenada esta : location.coordinates
                longitude:dev.location.coordinates[0]} } 
            >
            <Image style = {styles.avatar} source= {{ uri: dev.avatar_url }} />
            <Callout onPress= {() => {
                //navegação. Após clicar no box de info do dev, é encaminhado para o perfil do mesmo
                navigation.navigate('Profile' , {github_username: dev.github_username})
            }}>
                <View style = {styles.callout}>
                    <Text style = {styles.devname}> {dev.username} </Text>
                    <Text style = {styles.devbio}> {dev.bio} </Text>
                    <Text style = {styles.devtechs}> {dev.techs.join(', ')} </Text>
                </View>
            </Callout>
            </Marker>
       ) ) }
        </MapView>
        <View style = {styles.searchForm} > 
          <TextInput 
          style = {styles.searchInput} 
          placeholder= "Buscar devs por Techs..."
          placeholderTextColor= "#999" 
          autoCapitalize = "words"
          autoCorrect = {false}
          value = {techs}
          onChangeText= {text => setTechs(text)} // pega o texto digitado do usuario
          />
        

        <TouchableOpacity onPress= {loadDevs} style = {styles.loadButton}>
          <MaterialIcons name = "my-location" size={20} color = "#FFF"/>
        </TouchableOpacity>
        </View>
    </> 
    ) 
}

const styles = StyleSheet.create({
    map:{
        flex: 1
    },
    avatar:{
        height: 54,
        width: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: "#000",  
    },
    callout:{
        width: 260,
    },
    devname:{
        fontWeight: "bold",
        fontSize:16,
    },
    devbio: {
        color: "#666",
        marginTop: 5,
    },
    devtechs: {
        marginTop:5,
    },
    searchForm:{ // caixinha de busca
        position: 'absolute', // flutua sobre nosso formulario
        top: 20,
        left: 5,
        right: 50, 
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color:'#333',
        borderRadius: 25, // deixa redondo a borda
        paddingHorizontal: 20,
        fontSize: 16,
        // sombras
        shadowColor: "#000",
        shadowOpacity: 0.2, 
        shadowOffset: {
            width:4 ,
            height: 4,
        },
        elevation: 5, // controle intensidade da sombra

    },
    loadButton:{ 
        width: 60,
        height:60,
        backgroundColor: "#8E4DFF",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        left: 20,
        
    },  
})

export default Main