const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
//console.log(__filename);
console.log(path.join(__dirname, '../public'));


// Define paths for express config
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');


// setup handlebars and views location
const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views' , viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve to express
app.use(express.static(publicDirectoryPath));



app.get('', (req, res) =>
{
  res.render('index.hbs', {
      title: 'Weather',
      name: 'Ataurrahman'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
      title: 'About Me',
      name: 'Ataurrahman'
  })
});
app.get('/help', (req, res) => {
  res.render('help', {
      helpText: 'Its impossible to convey in few words .',
      title: 'Help',
      name: 'Ataurrahman'
  });
});
app.get('/data', (req, res)=>{

  res.render('data', {
                       title: 'Liux operating system',
                       name: "Ataurrahman chaudhry",
                       errorMessage: "Not found the page"

  });
})


app.get('/weather', (req, res) =>
{
if(!req.query.address){
return res.send({
           err: "You must provide an address"
})
}
geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
  if (error) {
      return res.send({ error })
  }

  forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
          return res.send({ error })
      }

      res.send({
          forecast: forecastData,
          location,
          address: req.query.address
      })
  })
})
});

/*}
res.send({
     address: req.query.address,
     Location: "UnitedStates",
     Name: "Ataurrahman chaudhry"

});
console.log('Name', req.query.name)


});
*/
app.get('/products', (req,res)=>{

  if(!req.query.search){
    return res.send({
           err: "You must provide an address"

    })
  }
  res.send({
    products: []
  })
  console.log("Search", req.query.search);
  console.log("Rating", req.query.rating);

  console.log("Name", req.query.name);
  console.log("Age", req.query.age);

app.get('/help/*', (req, res) =>{

  res.render('404', {

    name: 'Ataurrahman',
    title: '404',
    errorMessage: 'This page is not found anywhere'
  })

});
});

app.get('*', (req, res) =>{

  res.render('404', {

        title: '404',
        name: 'Ataurrahman',
        errorMessage: 'message not found'
  })

  });
 

app.listen(3000, () =>{
     console.log('Server is up on port numbrt 3000');

});