import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

  const [chosenLevel, setChosenLevel] = useState(1)
  const [word1, setWord1] = useState("")
  const [word2, setWord2] = useState("")
  const [word3, setWord3] = useState("")

  const getRandomWords = () => {
    const options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: {level: chosenLevel, area: 'sat'},
      headers: {
        'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
        'x-rapidapi-key': '6df3b81666mshecd82d66f32708cp12ddd2jsnf7bdb36865ed'
      }
    };

    axios.request(options).then((response) =>{
      console.log(response.data.quizlist[0].quiz[0]);
      setWord1(response.data.quizlist[0].quiz[0])
      setWord2(response.data.quizlist[0].quiz[1])
      setWord3(response.data.quizlist[0].quiz[2])
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    if(chosenLevel) getRandomWords()
  }, [chosenLevel])

  return (
    <div className="App">
      <div className="level-selector">
        <select name="levels" id="levels" value={chosenLevel} onChange={(e) => setChosenLevel(e.target.value)}>
          <option value={'1'} >Level 1</option>
          <option value={'2'} >Level 2</option>
          <option value={'3'} >Level 3</option>
        </select>
        <div className="quiz-words">
          <input value={word1} disabled="true"/>
          <input value={word2} disabled="true"/>
          <input value={word3} disabled="true"/>
          
        </div>
      </div>
      
      
    </div>
  );
}

export default App;
