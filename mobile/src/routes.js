import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Main from './page/Main'
import Profile from './page/Profile'

const Routes = createAppContainer(
    createStackNavigator({ // passando as rotas da nossa navegação
        Main:{
            screen: Main,
            navigationOptions: {
                title: "DevRadar"
            }
        }, 
        Profile:{
            screen: Profile,
            navigationOptions:{
                title: "Perfil no Github"
            }
        },
    }, 
    { // Segundo parametro retrata a configurações
        defaultNavigationOptions:{ // configurações aplicada a todas as telas do app
            headerTintColor: "#FFF", // titulo devradar fica branco
            headerStyle:{
                backgroundColor: "#7D40E7"
            },
        }     
    })
)

export default Routes