import { StyleSheet } from "react-native";

export default styles = StyleSheet.create ({
        container: {
            flex: 1,
        },
        lightContainer: {
            backgroundColor: 'white',
        },
        darkContainer: {
            backgroundColor: '#333333',
        },
        appbar: {
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
        },
        input: {
            margin: 10,
            padding: 10,
            elevation: 1,
            paddingLeft: 1,
            fontWeight: 'bold' 
        },
        button: {
            margin: 20,
            backgroundColor: '#6200EE',
            borderRadius:8
        },
        buttonLabel: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        },
        ibanInput: {
            flex: 1.8,
            margin: 10,
            padding: 10,
            elevation: 1,
            paddingLeft: 0,
            
        },
        lightTheme: {
            ibanPrefixInput: {
                backgroundColor: '#E7E0EC',
                color: '#000000',
            },
            ibanInput: {
                backgroundColor: '#E7E0EC',
                color: '#000000',
            },
            button: {
                backgroundColor: '#6200EE',
            },
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
            button: {
                backgroundColor: '#1C1C1C',
            },
        },
   

});