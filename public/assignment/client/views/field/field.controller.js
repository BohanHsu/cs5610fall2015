(function() {
  angular
  .module('FormBuilderApp')
  .controller('FieldController', FieldController)

  function FieldController($scope, $rootScope, $routeParams, FormService) {

    $scope.model = {}
    $scope.model.fieldType = null
    $scope.model.selections = [
      'Single Line Text Field',
      'Multi Line Text Field',
      'Date Field',
      'Dropdown Field',
      'Checkboxes Field',
      'Radio Buttons Field'
    ]
    $scope.formId = $routeParams.formId

    FormService.getFieldsForForm($scope.formId).then(function(response) {
      console.log(response)
      $scope.fields = response
      $scope.isEditing = []
      $scope.editingString = []
      $scope.fields.forEach(function(ele, idx, arr) {
        $scope.isEditing.push(false)
        $scope.editingString.push(JSON.stringify(ele))
      })
    })

    $scope.getEditingString = function(index) {
      return $scope.editingString[index]
    }

    $scope.getIsEditing = function(index) {
      return $scope.isEditing[index]
    }

    $scope.setIsEditing = function(index, value) {
      $scope.isEditing[index] = value
    }

    $scope.newFieldMap = {
      'Single Line Text Field': function() {
        return {"id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}},

      'Multi Line Text Field': function() {
        return {"id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}},

      'Date Field': function() {
        return {"id": null, "label": "New Date Field", "type": "DATE"}},

      'Dropdown Field': function() {
        return {"id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
        {"label": "Option 1", "value": "OPTION_1"},
      {"label": "Option 2", "value": "OPTION_2"},
      {"label": "Option 3", "value": "OPTION_3"}
      ]}},

      'Checkboxes Field': function() {
        return {"id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
        {"label": "Option A", "value": "OPTION_A"},
      {"label": "Option B", "value": "OPTION_B"},
      {"label": "Option C", "value": "OPTION_C"}
      ]}},

      'Radio Buttons Field': function() {
        return {"id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
        {"label": "Option X", "value": "OPTION_X"},
      {"label": "Option Y", "value": "OPTION_Y"},
      {"label": "Option Z", "value": "OPTION_Z"}
      ]}}

    }

    $scope.newFieldSelection = function() {
      return Object.keys($scope.newFieldMap)
    }

    $scope.addField = function() {
      console.log($scope.newFeild)
      if ($scope.newFeild != '') {
        $scope.fields.push($scope.newFieldMap[$scope.newFeild]())
        $scope.isEditing.push(false)
        $scope.editingString.push(JSON.stringify($scope.fields[$scope.fields.length-1]))
      }
    }

    $scope.editField = function(index) {
      $scope.setIsEditing(index, true)
    }

    $scope.updateField = function(index) {
      var jsonObj = JSON.parse($scope.editingString[index])
      $scope.fields[index] = jsonObj
      $scope.setIsEditing(index, false)
    }

    function deepCopy(obj) {
      var newObj = null
      if (Array.isArray(obj)) {
        newObj = []

        obj.forEach(function(ele, idx, arr) {
          if (typeof ele == 'object') {
            newObj.push(deepCopy(ele))
          } else {
            if (typeof obj[k] == 'string') {
              newObj.push(new String(obj[k]))
            } else {
              newObj.push(obj[k])
            }
          }
        })
      } else {
        newObj = {}

        for (var k in obj) {
          if (typeof obj[k] == 'object') {
            newObj[k] = deepCopy(obj[k])
          } else {
            if (typeof obj[k] == 'string') {
              newObj[k] = new String(obj[k])
            } else {
              newObj[k] = obj[k]
            }
          }
        }
      }
      return newObj
    }

    $scope.copyField = function(index) {
      // a very ugly but quick to be implement way of copy object
      var newObject = JSON.parse(JSON.stringify($scope.fields[index]))

      console.log(Guid.create(newObject).value)
      newObject['id'] = Guid.create(newObject).value

      $scope.fields.push(newObject)
      $scope.isEditing.push(false)
      $scope.editingString.push(JSON.stringify(newObject))
    }

    $scope.removeFeild = function(index) {
      $scope.fields.splice(index, 1)
      $scope.isEditing.splice(index, 1)
      $scope.editingString.splice(index, 1)
    }
  }
})()
