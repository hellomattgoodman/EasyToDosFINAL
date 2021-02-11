import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AddTask from '../add-task';
import EmptyTaskList from '../tasklist-empty';

const Tasks = (props) => {
  return (
    View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.appTitle}>
          EasyToDo
        </Text>
        <TouchableOpacity onPress={() => props.logoutUser()} style={styles.logoutRow}>
          <Text style={styles.logoutText}>
            Logout
          </Text>
          <Icon name="logout" size={24} color="#00AFB5" />
        </TouchableOpacity>
      </View>

      <FlatList
      ListEmptyComponent={
        <EmptyTaskList />
      }
      style={{width: '100%'}}
       />

       <View style={styles.footerStyle}>
        <AddTask User={props.User} />
       </View>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  appTitle: {
    fontFamily: 'Roboto-Black',
    fontSize: 24,
    color: '#004777',
  },
  logoutRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexGrow: 0,
  },
  logoutText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#004777',
    textAlign: 'right',
    marginRight: 6,
    alignSelf: 'center',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerStyle: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
  },
});

export default Tasks;
