<template>
  <div id="app">
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-table v-bind:students="students"
                   v-on:student-arrived-or-left="studentArrivedOrLeft"
                   v-on:delete-student="studentDeleted"></student-table>
    <student-message v-bind:student="mostRecentStudent"></student-message>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  mounted() {
    // load all students - make a request to API when app is loaded
    this.updateStudents()
  },
  methods: {
    updateStudents() {
      // call the function in StudentService to get a list of all students
      // will return a promise which will resolve to an array of student objects
      this.$student_api.getAllStudents().then( students => {
        // set Vue data to be the array returned from the API server
        this.students = students
      }).catch( () => alert('Unable to fetch student list'))
    },
    // when the Add button is clicked, call this method to add a student
    newStudentAdded(student) {
      // call the addStudent function in StudentService
      this.$student_api.addStudent(student).then( () => {
        // get a new list of students
        this.updateStudents()
      })
          .catch( err => {
            alert('Error adding student. StarID must be unique.')
          })

    },
    studentArrivedOrLeft(student, present) {
      student.present = present // update present status
      this.$student_api.updateStudent(student).then( () => {
        // set the most recent student to be the student object
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch( () => alert('Error updating student'))
    },
    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then ( () => {
        this.updateStudents()
        // clear message
        this.mostRecentStudent = {}
      }).catch( () => alert('Unable to delete student'))
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css";
</style>
