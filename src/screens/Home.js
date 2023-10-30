import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchContacts, initDatabase } from '../Database';
import { View, Text, ScrollView, TouchableWithoutFeedback, Pressable, Linking } from 'react-native';
import { Appbar, Card, IconButton, Menu, Divider, TextInput, PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Home.style';
import translations from '../languages/Translations';

const Home = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');
  const translation = translations[language];
  useEffect(() => {
    AsyncStorage.getItem('theme').then((savedTheme) => {
        if (savedTheme) {
            setTheme(savedTheme);
        }
    });
}, []);
  useEffect(() => {
    initDatabase()
      .then(() => {
        console.log("Veritabanı başarıyla oluşturuldu.");
      })
      .catch((error) => {
        console.error("Veritabanı oluşturulurken hata oluştu: " + error);
      });
    loadContacts();

      setInterval(function() {
        AsyncStorage.getItem('theme').then((savedTheme) => {
          if (savedTheme) {
            setTheme(savedTheme);
          }
        });
      }, 2000)

    
  }, []);
  useEffect(() => {
    setInterval(function() {
      AsyncStorage.getItem('language').then((savedLanguage) => {
          if (savedLanguage) {
              setLanguage(savedLanguage);
          }
      });
    }, 2000)
}, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const showSettings = () => {
    navigation.navigate('Settings');
    closeMenu();
  };

  const loadContacts = () => {
    
    fetchContacts()
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.error('Kişileri getirirken hata oluştu: ' + error);
      });
  };
 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadContacts();
    });

    return unsubscribe;
  }, [navigation, loadContacts]);

  const goEditContact = (contact) => {
    navigation.navigate('EditContact', { contact });
  };

  const goNewContact = () => {
    navigation.navigate('NewContact');
  };

  const filterContacts = () => {
    return contacts.filter((contact) => {
      const nameAndSurnameMatch =
        contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.surname.toLowerCase().includes(searchText.toLowerCase());
      const phoneMatch = contact.phone.includes(searchText);

      return nameAndSurnameMatch || phoneMatch;
    })
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });  
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };


  const renderContacts = () => {
    return filterContacts().map((contact, index) => (
      <Card style={styles.Card} key={index}>
        <Card.Title
        title={`${contact.name} ${contact.surname}`}
        subtitle={contact.phone}
        left={() => (
          <View style={{ width: 47, height: 47, borderRadius: 50, backgroundColor: '#7752FE', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.avatarText}>{contact.name.charAt(0).toUpperCase() + contact.surname.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        right={() => (
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon="phone"
              size={28}
              onPress={() => Linking.openURL(`tel:${contact.phone}`)}
              style={{ marginRight: 1 }}
            />
            <IconButton
              icon="chevron-right"
              size={28}
              onPress={() => goEditContact(contact)}
            />
          </View>
        )}
      />
    </Card>
  ));
};
  const buttonStyle = theme === 'light' ? styles.lightTheme.addButton : styles.darkTheme.addButton;
  const containerStyle = theme === 'light' ? styles.lightContainer : styles.darkContainer;
  
  return (
    <PaperProvider theme={theme === 'light' ? MD3LightTheme : MD3DarkTheme}>
      <View style={[containerStyle, styles.container]}>
        <Appbar.Header>
          <Appbar.Content title={translation.HeaderContacts} />
          <Appbar.Action icon="magnify" onPress={toggleSearch} />
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
          >
            <Menu.Item onPress={showSettings} title={translation.HeaderSettings} />
            <Divider />
          </Menu>
        </Appbar.Header>
        {isSearchOpen && (
          <TouchableWithoutFeedback onPress={toggleSearch}>
            <View style={styles.searchOverlay} />
          </TouchableWithoutFeedback>
        )}
        {isSearchOpen && (
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder={translation.insideSearch}
            autoFocus
            onBlur={toggleSearch}
          />
        )}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ScrollView style={{ padding: 5 }}>
            {renderContacts()}
          </ScrollView>
        </GestureHandlerRootView>
        <Pressable
          style={[styles.addButton, buttonStyle]}
          onPress={goNewContact}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>
    </PaperProvider>
  );
};

export default Home;
