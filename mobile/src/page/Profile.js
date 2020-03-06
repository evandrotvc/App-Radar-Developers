import React from 'react'
import {View } from 'react-native'
import {WebView} from 'react-native-webview'

function Profile({navigation}){
    const dev_git = navigation.getParam('github_username')// parametro que passei lá no main.js
    return <WebView style = {{flex: 1}} source = {{uri : `https://github.com/${dev_git}` }}/>
    
}

export default Profile