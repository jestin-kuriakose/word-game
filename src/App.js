import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

  const [chosenLevel, setChosenLevel] = useState(null)
  const [words, setWords] = useState("")
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])

  const getRandomWords = () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/results',
      params: {level: chosenLevel, area: 'sat'},
    };

    axios.request(options).then((response) =>{
      console.log(response.data);
      setWords(response.data)

    }).catch((error) => {
      console.error(error);
    });
  }


  useEffect(() => {
    if(chosenLevel) getRandomWords()
  }, [chosenLevel])

  const checkAnswer = (option, optionIndex, correctAnswer) => {
    if(optionIndex == correctAnswer) {
      setCorrectAnswers([...correctAnswers, option] )
    }
    setClicked([...clicked, option])
  }

  console.log(correctAnswers)

  return (
    <div className="App">
      { !chosenLevel && <div className="level-selector">
        <h1>Word Association Game</h1>
        <p>Select your level to start</p>
        <select name="levels" id="levels" value={chosenLevel} onChange={(e) => setChosenLevel(e.target.value)}>
        <option value={null} >Select a level</option>  
        <option value={'1'} >Level 1</option>
          <option value={'2'} >Level 2</option>
          <option value={'3'} >Level 3</option>
        </select>
      </div>}
      
      { words && chosenLevel && <div className="question-area">
        <h1>Welcome to level {chosenLevel} </h1>
        { words.quizlist.map((question, questionIndex) => 
          <div className="question-box">
            {question.quiz.map((tip, _index) => (
              <p key={_index}>{tip}</p>
            ))}
          <div className="question-buttons">
              {question.option.map((option, optionIndex) =>
                <div className="question-button">
                  <button disabled={clicked.includes(option)} onClick={() => checkAnswer(option, optionIndex+1, question.correct)}>{option}</button>
                  {correctAnswers.includes(option) && <p>Correct!</p>}
                </div>
                )}
          </div>  
            
            <p>{question.correct}</p>
        </div>)}
      </div>}
      
    </div>
  );
}

export default App;
