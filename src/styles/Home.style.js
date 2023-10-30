import { StyleSheet } from "react-native";


export default  styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    input: {
      margin: 16,
      padding: 8,
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 10,
      
    },
    avatarText: {
      fontSize: 20,
      color:'white'
    },
    addButton: {
      position: 'absolute',
      bottom: 40,
      right: 45,
      width: 65,
      height: 65,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      fontSize: 24,
      color: 'white',
    },
    Card:{
      marginTop:8,
      borderRadius:12
    },    
    lightContainer: {
      backgroundColor: 'white',
    },
    darkContainer: {
      backgroundColor: '#333333',
    },
    lightTheme: {
      addButton: {
          backgroundColor: '#7752FE',
      },
  },
  darkTheme: {
      addButton: {
          backgroundColor: '#3D30A2',
      }}
  });