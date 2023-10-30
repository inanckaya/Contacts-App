import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Appbar, TextInput, Button, PaperProvider, MD3LightTheme, MD3DarkTheme, Text, IconButton } from 'react-native-paper';
import { useNavigation, useRoute, } from '@react-navigation/native';
import { updateContact, deleteContact } from '../Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/EditContacts.style';
import translations from '../languages/Translations';



const EditContact = () => {
  const navigation = useNavigation();
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('light');
  const route = useRoute();
  const { contact } = route.params;
  const [name, setName] = useState(contact.name);
  const [surname, setSurname] = useState(contact.surname);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [iban, setIban] = useState(contact.iban);
  const [address, setAddress] = useState(contact.address);
  const [note, setNote] = useState(contact.note);

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
  const translation = translations[language];

  const handleSave = () => {
    updateContact(contact.id, name, surname, phone, email, iban, address, note)
      .then((result) => {
        console.log('Contact updated successfully:', result);
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error updating contact:', error);
      });
  };

  const handleDelete = () => {
    deleteContact(contact.id)
      .then((result) => {
        console.log('Contact deleted successfully:', result);
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };
  const containerStyle = theme === 'light' ? styles.lightTheme.ibanInput : styles.darkTheme.ibanInput;
  const buttonStyle = theme === 'light' ? styles.lightTheme.button : styles.darkTheme.button;
  return (
    <PaperProvider theme={theme === 'light' ? MD3LightTheme : MD3DarkTheme}>
      <View style={[containerStyle, styles.container]}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={translation.EditContact} />
        </Appbar.Header>
        <ScrollView style={{ padding: 5 }}>
          <TextInput
            mode='outlined'
            style={styles.input}
            label={
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                {translation.namePlaceholder}
              </Text>
            }
            value={name}
            onChangeText={setName}
          />
          <TextInput
            mode='outlined'
            style={styles.input}
            label={
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                {translation.surnamePlaceholder}
              </Text>
            }
            value={surname}
            onChangeText={setSurname}
          />
          <TextInput
            mode='outlined'
            style={styles.input}
            label={
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                {translation.phonePlaceholder}
              </Text>
            }
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            mode='outlined'
            style={styles.input}
            label={
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                {translation.emailPlaceholder}
              </Text>
            }
            value={email} onChangeText={setEmail}
          />
          <TextInput
            mode='outlined'
            style={styles.input}
            label={
              <Text style={{ fontWeight: 'bold', fontSize: 17, }}>
                {translation.IbanPlaceholder}
              </Text>
            }
            value={iban} onChangeText={setIban}
          />
          <View style={styles.copyButtonContainer}>
          </View>
          <TextInput
            mode='outlined'
            style={styles.input}
            label={
              <Text style={{ fontWeight: 'bold', fontSize: 17, }}>
                {translation.addressPlaceholder}
              </Text>
            }
            value={address} onChangeText={setAddress}
          />
          <TextInput
            mode='outlined'
            style={styles.input}
            label={
              <Text style={{ fontWeight: 'bold', fontSize: 17, }}>
                {translation.notePlaceholder}
              </Text>
            }
            value={note} onChangeText={setNote}
          />
          <TouchableWithoutFeedback onPress={handleSave}>
            <Button
              mode="contained"
              style={[styles.saveButton, buttonStyle]}
              contentStyle={{ padding: 10 }}
              labelStyle={styles.buttonLabel}
              onPress={handleSave}
            >
              {translation.saveButton}
            </Button>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleDelete} >
            <Button
              mode="contained"
              contentStyle={{ padding: 10 }}
              onPress={handleDelete}
              labelStyle={styles.buttonLabel}
              style={styles.deleteButton}
            >
              {translation.Delete}
            </Button>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default EditContact;
