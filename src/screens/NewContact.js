import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, PaperProvider, MD3LightTheme, MD3DarkTheme, Text } from 'react-native-paper';
import { insertContact } from '../Database';
import { useNavigation } from '@react-navigation/native';
import translations from '../languages/Translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/NewContact.style'

const NewContact = () => {
    const navigation = useNavigation();
    const [language, setLanguage] = useState('English');
    const [theme, setTheme] = useState('light');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [iban, setIban] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const translation = translations[language];

    useEffect(() => {
        AsyncStorage.getItem('language').then((savedLanguage) => {
            if (savedLanguage) {
                setLanguage(savedLanguage);
            }
        });
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('theme').then((savedTheme) => {
            if (savedTheme) {
                setTheme(savedTheme);
            }
        });
    }, []);

    const handleSave = async () => {
        if (!name.trim() || !phone.trim()) {
            alert(translation.SaveAlert);
        } else {
            const result = await insertContact(name, surname, phone, email, iban, address, note);
            if (result) {
                alert(translation.insertAlert);
                navigation.goBack();
            } else {
                alert("Kişi kaydederken bir hata oluştu.");
            }
        }
    };


    const handlePhoneChange = (text) => {
        const formattedText = text.replace(/[^0-9+]/g, '');
        if (formattedText.length <= 13) {
            setPhone(formattedText);
        }
    };
    const containerStyle = theme === 'light' ? styles.lightContainer : styles.darkContainer;
    const buttonStyle = theme === 'light' ? styles.lightTheme.button : styles.darkTheme.button;

    return (
        <PaperProvider theme={theme === 'light' ? MD3LightTheme : MD3DarkTheme}>
            <View style={[containerStyle, styles.container]}>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={translation.headerPlaceholder} />
                </Appbar.Header>
                <ScrollView style={{ padding: 5 }}>
                <TextInput
                    mode='outlined'
                    label={
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                            {translation.namePlaceholder}
                        </Text>
                    }
                    style={styles.input}
                    value={name}
                    onChangeText={setName}

                />
                <TextInput
                    mode='outlined'
                    label={
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                            {translation.surnamePlaceholder}
                        </Text>
                    }
                    style={styles.input}
                    value={surname}
                    onChangeText={setSurname}
                />
                <TextInput
                    mode='outlined'
                    label={
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                            {translation.phonePlaceholder}
                        </Text>
                    }
                    style={styles.input}
                    value={phone}
                    onChangeText={handlePhoneChange}
                    keyboardType="phone-pad"
                />
                <TextInput
                    mode='outlined'
                    label={
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                            {translation.emailPlaceholder}
                        </Text>
                    }
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                    <TextInput
                        mode='outlined'
                        label={
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                {"IBAN"}
                            </Text>
                        }
                        style={styles.input}
                        value={iban}
                        onChangeText={setIban}
                        keyboardType="text"
                    />
                <TextInput
                    mode='outlined'
                    label={
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                            {translation.addressPlaceholder}
                        </Text>
                    }
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    
                />
                <TextInput
                    mode='outlined'
                    label={
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                            {translation.newNotePlaceholder}
                        </Text>
                    }
                    style={styles.input}
                    value={note}
                    onChangeText={setNote}
                    keyboardType="text"
                />
                <TouchableWithoutFeedback onPress={handleSave} >
                <Button
                    mode="contained"
                    style={[styles.button, buttonStyle]}
                    contentStyle={{ padding: 10 }}
                    labelStyle={styles.buttonLabel}
                    onPress={handleSave}
                >
                    {translation.saveButton}
                </Button>
                </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        </PaperProvider>
    );
};

export default NewContact;
