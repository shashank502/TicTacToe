import React,{Component} from "react";
import { StyleSheet, Button, SafeAreaView, TextInput, View, TouchableOpacity } from "react-native";

const btn= props=> {
    const content=( 
        <View style={[styles.Button, {backgroundColor: props,color}]}> 
        <Text style={styles.text}>{props.text}</Text>
        </View>
        
    )      
    return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}
const styles = StyleSheet.create({
    Button: {
        padding: 12,
        width: 15,
        borderRadius: 24,
        alignItems: 'left',
    }
   
})
