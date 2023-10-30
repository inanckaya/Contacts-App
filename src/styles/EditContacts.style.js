import { StyleSheet } from "react-native";

export default styles = StyleSheet.create ( {
    container: {
        flex: 1,
      },
      saveButton: {
        margin:5,
        marginTop:15,
            backgroundColor: '#38E54D', 
      },
      copyButtonContainer: {
        margin:0,
        padding:0,
        position: "absolute",
        bottom: "41.9%", 
        right: "9%",
        transform: [
          { translateX: 14.5 },
          { translateY: -25 },
        ],
      },

      deleteButton: {
        margin:5,
        marginTop:15,
        backgroundColor: '#CD1818', 
      },
      input: {
       margin:5,
        padding: 10,
        paddingLeft: 1,
    borderColor: 'lightgray',
    },
    buttonLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
  },
    lightTheme: {
      editbutton: {
          backgroundColor: '#6200EE',
      },
      textLabel: {
        color: 'white',
        fontsize:20

      }
  },
  darkTheme: {
      ibanPrefixInput: {
          backgroundColor: '#48444E',
          color: '#ffffff',
      },
      ibanInput: {
          backgroundColor: '#48444E',
          color: '#ffffff',
      },
      editbutton: {
        backgroundColor: '#1C1C1C',
      },
  },
})