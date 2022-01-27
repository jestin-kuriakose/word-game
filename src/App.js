import axios from "axios";

const App = () => {

  var options = {
    method: 'GET',
    url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
    params: {level: '3', area: 'sat'},
    headers: {
      'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
      'x-rapidapi-key': '6df3b81666mshecd82d66f32708cp12ddd2jsnf7bdb36865ed'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
