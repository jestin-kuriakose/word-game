const port = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')

const app = express()

app.use(cors()) 

app.get('/', (req, res) => {
    res.json('hi')
})

app.get('/results', (req, res) => {
    console.log('request', req.query.level)
    const passedLevel = req.query.level
    const options = {
        method: 'GET',
        url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
        params: {level: passedLevel, area: 'sat'},
        headers: {
          'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      };
  
      axios.request(options).then((response) =>{
        res.json(response.data)
        console.log(response.data);
  
      }).catch((error) => {
        console.error(error);
      });
})

app.listen(port, () => console.log(`Server running on PORT ${port}`))