var express = require('express')
var app = express()
var multipart=require('connect-multiparty')
var multipartMiddleware = multipart()
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var guid = require('guid')
var im = require('imagemagick')
var easyimg = require('easyimage')

app.post('/avatar/original/delete' , function(req, res) {
  if (req.body['path'] != '' || req.body['crop_path'] != '') {
    if (req.body['path'] != '') {
      var filePath = req.body['path']
      var filepath = path.join(__dirname, '../public', filePath)
      deleteFile(filepath, function() {
      })
    }

    if (req.body['crop_path'] != '') {
      var filePath = req.body['crop_path']
      console.log('crop', filePath)
      var filepath = path.join(__dirname, '../public', filePath)
      deleteFile(filepath, function() {
      })
    }
  }
  res.json({success: true})
})

app.post('/avatar/crop', function(req, res) {
  var imagePath = path.join(__dirname, '../public', req.body['path'])

  easyimg.info(imagePath).then(
    function(file) {

    var x = req.body['x']
    if (x == '') {
      x = 0
    } else {
      x = parseFloat(x)
    }
    var y = req.body['y']
    if (y == '') {
      y = 0
    } else {
      y = parseFloat(y)
    }
    var width = req.body['width']
    if (width == '') {
      width = file['width']
    } else {
      width = parseFloat(width)
    }
    var height = req.body['height']
    if (height == '') {
      height = file['height']
    } else {
      height = parseFloat(height)
    }

    var newImagePath = path.join(path.dirname(imagePath), 'crd_'+path.basename(imagePath))

    easyimg.crop({
      src: imagePath, 
      dst: newImagePath,
      cropwidth: width, 
      cropheight: height,
      'x': x - (file['width'] / 2) + width / 2, 
      'y': y - (file['height'] / 2) + height / 2
    }).then(
    function(image) {
      res.json({success: true, 'cropedImagePath': "/" + path.join('uploads/avatar', 'crd_'+path.basename(imagePath))})
    },
    function (err) {
      console.log(err)
    }
    )
  }, function (err) {
    console.log(err)
  })
})

app.post('/avatar/original', multipartMiddleware, function(req, res) {
  fs.readFile(req.files.file.path, function(err, data) {
    if (err)
      res.json({success: false, 'err': err})

    var newName = guid.raw(req.files.file.name)
    newName = newName + '_' + req.files.file.name

    var newPath = path.join(__dirname, '../public/uploads', 'avatar', newName)

    mkdirp(path.dirname(newPath), function(err) {
      if (err)
        res.json({success: false, 'err': err})

      fs.writeFile(newPath, data, function(err) {
        if (err)
          res.json({success: false, 'err': err})

        fs.unlink(req.files.file.path, function(err) {
          if (err)
            res.json({success: false, 'err': err})

          res.json({success: true, imageUrl: '/' + path.join('uploads', 'avatar', newName)})
        })
      })
    })
  })
})


function deleteFile(filePath, callback) {
  fs.unlink(filePath, callback)
}

module.exports = app
