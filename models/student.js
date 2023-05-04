// this file will provide (export) this function
module.exports = (sequelize, DataTypes) => {

    // define fields for Student object
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            // will prevent this field from being empty
            allowNull: false
        },

        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            // designate that every value in the column must be unique
            unique: true
        },

        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            // set a default value
            defaultValue: false
        }
    })

    // call the sync function on Student
    // force will drop the table before creating a new one when set to true
    Student.sync( {force: false} ).then( () => {
        console.log('Synced student table')
    })

    return Student

}