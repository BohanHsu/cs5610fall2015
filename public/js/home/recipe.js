var path;

function setPath(p) {
  path = p
}

function setPreview() {
  $('.changeImgBtn').popover({
    'trigger':'hover',
    'html':true,
    'content':function(){
      console.log('shaby')
      return "<img id='previewPanelImg' src='"+path+"'>"
    }
  })
  $('.changeImgBtn').popover('enable')
}

function resetPreview() {
  $('.changeImgBtn').popover('disable')
}
