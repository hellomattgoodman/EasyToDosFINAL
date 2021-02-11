/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import auth from '@react-native-firebase/auth';

import Login from './components/login';
import LoginError from './components/login-error';
import Registration from './components/registration';
import RegistrationSuccess from './components/registration-success';
import Tasks from './components/tasks';

const App: () => React$Node = () => {
  //set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');
  const [currentScreen, setCurrentScreen] = useState('login');

  //handle user state Changes
  const onAuthStateChanged = user => {
    setUser(user);
    if ((user) && (currentScreen === 'login')) {
      setCurrentScreen('tasks');
    }
    if (initializing) {
      setInitializing(false);
    }
  };

  //handle logging in
  const doLogin = (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        setErrorMessageText("We couldn't log you in. Either we couldn't find an account with that email address, or the password you entered was incorrect.");
        setErrorModalVisible(true);
        console.log(error);
      });
  };

  const doRegister = (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        switchScreen('registration-success');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessageText("An account already exists with that email address. Why not try logging in instead?");
          setErrorModalVisible(true);
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessageText("The email address you entered is invalid. Make sure it's formatted correctly. For example, me@myemail.com");
          setErrorModalVisible(true);
        }
      });
  };

  const logoutUser = () => {
    auth()
      .signOut()
      .then(() => setCurrentScreen('login'));
  };

  const hideError = () => {
    setErrorModalVisible(false);
  };

  const switchScreen = screen => {
    setCurrentScreen(screen);
  };

  //on initial load, set up the auth state listener
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; //when the component unmounts, destroy the listener to free up resources
  }, []);

  if (initializing) {
    return null;
  }

  if (!auth().currentUser) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Modal animationType='slide' transparent={true} visible={errorModalVisible} onRequestClose={() => hideError()}>
            <LoginError dismissError={hideError} ErrorMessage={errorMessageText} />
          </Modal>
          {currentScreen === 'login' ? <Login doLogin={doLogin} switchScreen={switchScreen} /> : null}
          {currentScreen === 'register' ? <Registration switchScreen={switchScreen} doRegister={doRegister} /> : null}
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flexGrow: 1}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          {currentScreen === 'registration-success' ? <RegistrationSuccess switchScreen={switchScreen} /> : null}
          {currentScreen === 'tasks' ? <Tasks logoutUser={logoutUser} User={user} /> : null}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
