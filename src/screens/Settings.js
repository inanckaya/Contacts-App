import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View,  } from 'react-native';
import { Appbar,  PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import translations from '../languages/Translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Settings.style';


const Settings = () => {
    const navigation = useNavigation();
    const [visibleLanguage, setVisibleLanguage] = useState(false);
    const [visibleTheme, setVisibleTheme] = useState(false);
    const [language, setLanguage] = useState('English');
    const [theme, setTheme] = useState('light');
    const translation = translations[language];
    useEffect(() => {
        AsyncStorage.getItem('language').then((savedLanguage) => {
            if (savedLanguage) {
                setLanguage(savedLanguage);
            }
        });
        AsyncStorage.getItem('theme').then((savedTheme) => {
            if (savedTheme) {
                setTheme(savedTheme);
            }
        });
    }, []);

    const ThemeList = [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
    ];

    function _goBack() {
        navigation.navigate('Home');
    }

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setVisibleLanguage(false);

        AsyncStorage.setItem('language', selectedLanguage);
    }

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
        setVisibleTheme(false);

        AsyncStorage.setItem('theme', selectedTheme);
    }


    const containerStyle = theme === 'light' ? styles.lightContainer : styles.darkContainer;
    const getDropDownItemTextColor = (theme) => {
        return theme === 'light' ? 'black' : 'white';
      };
    return (
        <PaperProvider theme={theme === 'light' ? MD3LightTheme : MD3DarkTheme}>
             <View style={[containerStyle, styles.container]}>
            <Appbar.Header>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title={translation.HeaderSettings} />
            </Appbar.Header>
           
                <View style={styles.dropDownContainerStyle}>
                    <DropDown
                    dropDownItemTextStyle={{
                        color: getDropDownItemTextColor(theme),
                      }}
                        mode={'outlined'}
                        label={translation.Language}
                        value={language}
                        setValue={handleLanguageChange}
                        list={[
                            { label: 'English', value: 'English' },
                            { label: 'Türkçe', value: 'Türkçe' },
                        ]}
                        visible={visibleLanguage}
                        showDropDown={() => setVisibleLanguage(true)}
                        onDismiss={() => setVisibleLanguage(false)}
                    />
                </View>
                <View style={styles.dropDownContainerStyle}>
                    <DropDown
                   dropDownItemTextStyle={{
                    color: getDropDownItemTextColor(theme),
                  }}
                        mode={'outlined'}
                        label={translation.Theme}
                        value={theme}
                        setValue={handleThemeChange}
                        list={ThemeList}
                        visible={visibleTheme}
                        showDropDown={() => setVisibleTheme(true)}
                        onDismiss={() => setVisibleTheme(false)}
                        
                    />
                </View>

            </View>
        </PaperProvider>
    );
}

export default Settings;
