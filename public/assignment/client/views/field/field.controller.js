(function() {
  angular
  .module('FormBuilderApp')
  .controller('FieldController', FieldController)

  function FieldController($scope, $rootScope, $routeParams, FormService) {

    $scope.list = {
      label: "Men",
      allowedTypes: ['man'],
      max: 4,
      people: [
        {name: "Bob", type: "man"},
        {name: "Charlie", type: "man"},
        {name: "Dave", type: "man"}
      ]
    }

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

    function loadAllFieldForForm() {
      FormService.getFieldsForForm($scope.formId).then(function(response) {
        $scope.fields = response

        if ($scope.fields) {
          $scope.fields.forEach(function(ele, idx, arr) {
            ele['type'] = ele['fieldType']
          })
        }

        $scope.isEditing = []
        $scope.editingString = []
        if ($scope.fields) {
          $scope.fields.forEach(function(ele, idx, arr) {
            $scope.isEditing.push(false)
            $scope.editingString.push(JSON.stringify(ele))
          })
        }
      })
    }

    loadAllFieldForForm()

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
      FormService.createFieldForForm($scope.formId, $scope.newFieldMap[$scope.newFeild]()).then(function(response) {
        loadAllFieldForForm()
      })
    }

    $scope.editField = function(index) {
      $scope.setIsEditing(index, true)
    }

    $scope.updateField = function(index) {
      var jsonObj = JSON.parse($scope.editingString[index])
      FormService.updateField($scope.formId, $scope.fields[index]['id'], jsonObj).then(function(response) {
        loadAllFieldForForm()
      })
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

      newObject['id'] = Guid.create(newObject).value

      FormService.createFieldForForm($scope.formId, newObject).then(function(response) {
        loadAllFieldForForm()
      })
    }

    $scope.removeFeild = function(index) {
      FormService.deleteFieldFromForm($scope.formId, $scope.fields[index]['id']).then(function(response) {
        loadAllFieldForForm()
      })
    }

    $scope.moved = function(index) {
      $scope.dragedField = $scope.fields[index]

      $scope.oldIndex = index
      $scope.fields.splice(index, 1)
    }

    $scope.dragEnd = function(event) {
      console.log(event)
      console.log($scope.fields)
      console.log($scope.dragedField)
      $scope.newIndex = 0
      $scope.fields.forEach(function(ele, idx, attr) {
        if (ele['id'] == $scope.dragedField['id']) {
          $scope.newIndex = idx
        }
      })
      FormService.sortField($scope.formId, $scope.oldIndex, $scope.newIndex).then(function(response) {
        loadAllFieldForForm()
        $scope.oldIndex = null
        $scope.newIndex = null
        $scope.dragedField = null
      })
    }
  }
})()
