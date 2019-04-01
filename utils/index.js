const Form = data => {
   var form = new FormData()
   Object.entries(data)
     .map(([key, value]) => {
       form.append(key, value)
     })
   return form
}

module.exports = {
   Form
}