// services are functions or methods that can make API calls to a server
import axios from 'axios'

let base_url = '/api/students'

export default {
    // method to get all students
    getAllStudents() {
        // request a response from the server
        return axios.get(base_url).then(response => {
            return response.data
        })
    },

    // method to add a student
    addStudent(student) {
        // pass the student to the database after converting to JSON
        return axios.post(base_url, student).then(response => {
            return response.data
        })
    },

    updateStudent(student) {
        // create URL for the student using a template string
        return axios.patch(`${base_url}/${student.id}`, student).then(response => {
            return response.data
        })
    },

    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }
}