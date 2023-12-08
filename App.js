
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper'; 
import Modal from 'react-native-modal';

const StudentApp = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [course, setCourse] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
 
  const addStudent = async () => {
    try {
   
      const newStudent = {
        firstName,
        lastName,
        course,
        username,
        password,
      };

      
      const existingStudents = await AsyncStorage.getItem('students');
      const parsedStudents = existingStudents ? JSON.parse(existingStudents) : [];

    
      const updatedStudents = [...parsedStudents, newStudent];

     
      await AsyncStorage.setItem('students', JSON.stringify(updatedStudents));

     
      setStudents(updatedStudents);


      setFirstName('');
      setLastName('');
      setCourse('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {

        const existingStudents = await AsyncStorage.getItem('students');
        const parsedStudents = existingStudents ? JSON.parse(existingStudents) : [];
        setStudents(parsedStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const toggleModal = (student) => {
    setSelectedStudent(student);
    setModalVisible(!isModalVisible);
  };

 
  return (
    <View  style={styles.container}>
      {/* Input fields for student information */}
      <View style={{marginBottom:100}}>
        <Text style={{fontWeight:'bold',fontSize:30}}>STUDENT REGISTRATION</Text>
      <TextInput style = {styles.input1}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput style = {styles.input1}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput style = {styles.input1}
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
      />
      <TextInput style = {styles.input1}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput style = {styles.input1}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Button to add a new student */}
      <Button title="Add Student" onPress={addStudent} />
    

      {/* Display the list of students in a table */}
    <DataTable style={styles.tble}>
     <DataTable.Header style={styles.tblehead}>
        <DataTable.Title>Firstname</DataTable.Title> 
        <DataTable.Title>Lastname</DataTable.Title> 
        <DataTable.Title>Course</DataTable.Title> 
        <DataTable.Title>Username</DataTable.Title> 
        <DataTable.Title>Password</DataTable.Title>
     </DataTable.Header>
     
     {students.map((student, index) => (
            <DataTable.Row key={index} onPress={() => toggleModal(student)} >
              <DataTable.Cell>{student.firstName}</DataTable.Cell>
              <DataTable.Cell>{student.lastName}</DataTable.Cell>
              <DataTable.Cell>{student.course}</DataTable.Cell>
              <DataTable.Cell>{student.username}</DataTable.Cell>
              <DataTable.Cell>{student.password}</DataTable.Cell>
            </DataTable.Row>
          ))}
      
    </DataTable>

    <Modal isVisible={isModalVisible}>
        <View style={{backgroundColor:'#F2F3F2'}}>
          <Text>Additional Information</Text>
          <Text>{`First Name: ${selectedStudent?.firstName}`}</Text>
          <Text>{`Last Name: ${selectedStudent?.lastName}`}</Text>
          <Text>{`Course: ${selectedStudent?.course}`}</Text>
          <Text>{`Username: ${selectedStudent?.username}`}</Text>
          <Text>{`Password: ${selectedStudent?.password}`}</Text>
          <Button title="Close" onPress={() => toggleModal(null)} />
        </View>
      </Modal>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

input1:{
  borderColor: "#575DD9",
    borderWidth: 1,
    alignSelf: "stretch",
    margin: 10,
    height: 50,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 20
},
tble:{
  padding: 15, 
},
tblehead:{
  backgroundColor: '#DCDCDC', 
}
})

export default StudentApp;
