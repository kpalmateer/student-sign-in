import { createApp } from 'vue'
import App from './App.vue'
// add the service(s) to main.js
import StudentService from "@/services/StudentService"

// create the app
let app = createApp(App)

// allow the app to call the functions in StudentService
app.config.globalProperties.$student_api = StudentService

app.mount('#app')
