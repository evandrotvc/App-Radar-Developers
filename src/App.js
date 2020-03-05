import React , {useState ,useEffect} from 'react';
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import './service/api'
import api from './service/api';

/* 3 conceitos do REACT que fundamentam ele: 
- Componente : É uma função que retorna algum conteúdo HTML, CSS , JS !!! só isso (Componente sempre primeira letra maiuscula)
- ESTADO: Informações mantidas pelo componente (lembrar imutabilidade, nunca incrementa, sempre cria novas variaveis)
- Propriedade: Informações que o componente pai passa para o componente filhos
*/

//Componentes só podem estarem juntos com alguma tag agrupando-as, no react usa: <> </> 
// useState retorna um vetor , no qual usar [var1 , function] , para separar em 2 variaveis separadas

// onChange no <input lat , longitude , serve para quando usuario setar algo no input, altere o Estado tb !!
function App() {
  const [devs , setDevs] = useState([]) // vários devs , por isso []
  const [github_username , setgithub_username] = useState('')
  const [techs , setTechs] = useState('')
  const [latitude , setlatitude] = useState('')// string vazia no inicio
  const [longitude , setlongitude] = useState('')// string vazia no inicio

  useEffect(() => { //USE EFFECT faz com q acada renderização, execute a função
    navigator.geolocation.getCurrentPosition(
      (position) => {
      
        const {latitude , longitude} = position.coords
        setlatitude(latitude)
        setlongitude(longitude)
      },
      (erro)=> {
        console.log(erro)
      },
      {
        timeout: 30000, // 30 segundos
      }
    );// parametros que ela recebe é qual função executar?
  } , []) //  2 param -> Quando executar? o array é vazio pois será executado apenas 1 vez !!!
  
  useEffect( () => {
    async function LoadDev(){
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    LoadDev()
  }, [])

  async function handleAddDev(event){ /* disparada , quando um dev for submetido */
    event.preventDefault() // evita o usuario ir pra outra tela quando submeter 
    const response = await api.post('/devs' , {
      github_username,
      techs,
      latitude,
      longitude,
    })
    //console.log(response.data)
    // limpa as caixas de inputs após submeter o dev
    setgithub_username('')
    setTechs('')

    // a linha a seguir é mesma ideia devs.push()
    setDevs([...devs , response.data]) // inclui automaticamente cada dev submetido, sem preicsar f5
  }
  return (
    <div id= "app">
       <aside>
        <strong>Cadastrar</strong>
        <form  onSubmit= {handleAddDev}>
          <div className = "input-block">
            <label htmlFor= "github_username"> Usúario do Github</label>
            <input name= "github_username" id= "github_username"  required value = {github_username} onChange = {e => setgithub_username(e.target.value)} />
          </div>
          
          
          <div className = "input-block">
            <label htmlFor= "techs"> Tecnologias</label>
            <input name= "techs" id= "techs" required value = {techs} onChange = {e => setTechs(e.target.value)} />
          </div>
          
          <div className="input-group">
            <div className = "input-block">
              <label htmlFor= "latitude"> Latitude</label>
              <input type="number" name= "latitude" id= "latitude" required value = {latitude} onChange = {e => setlatitude(e.target.value)} /> 
            </div>
            

            <div className = "input-block">
              <label htmlFor= "longitude"> Longitude</label>
              <input type="number"  name= "longitude" id= "longitude" required value = {longitude} onChange = {e => setlongitude(e.target.value)} />
            </div>
          </div>
        
        <button type= "submit">Salvar</button>
        </form>
       </aside>
       
       <main>
        <ul>
          {devs.map(dev => (
            <li key= {dev.id} className="dev-item">
            <header>
              <img src={dev.avatar_url} alt= {dev.name}></img>
              <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ' )}</span>
              </div>
            </header>
            <p>{dev.bio}</p>
            <a href= {`https://github.com/${dev.github_username}` }>Acessar perfil no Github</a>
          </li>
        ))}

          

        </ul>
       </main>
    </div>
  );
}

export default App;




