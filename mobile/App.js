import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes'
import {StatusBar , YellowBox} from 'react-native' //configurações da barra(no topo) de controle( luz , som) do celular

YellowBox.ignoreWarnings([ // tira um aviso sem importancia (comunic. tempo real, final da app)
  'Unrecognized WebSocket'
])

export default function App() {
  return ( // Componentes jamais pode ficar juntos sem o <> (fragment)
    <>  
    <StatusBar barStyle= "light-content" backgroundColor= "#7D40E7"/>
    <Routes/>
    </>
  );
}
/** Cada elemento precisa ter sua Própria estilização!!!  */
