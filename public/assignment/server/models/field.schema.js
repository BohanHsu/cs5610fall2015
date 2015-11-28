module.exports = function(db) {
  var mongoose = db

  var fieldModelSchema = mongoose.Schema({
    label: {
      type: String
    },

    fieldType: {
      type: String,
      validate: {
        validator: function(val) {
          var index = ['TEXT', 'TEXTAREA', 'RADIO', 'CHECKBOX', 'SELECT', 'DATE'].indexOf(val)
          return index != -1
        },
        message: 'Wrong type!'
      }
    },

    options: {
      type: String,
      validate: {
        validator: function(val) {
          if (['RADIO', 'CHECKBOX', 'SELECT'].indexOf(this.fieldType) != -1) {
            return !((typeof val) === 'undefined' || val == null || val == '')
          } else {
            true
          }
        }
      }
    },

    placeholder: {
      type: String
    }
  })

  return mongoose.model('FieldModel', fieldModelSchema)
}
