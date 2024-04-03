import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import challenges from './challengesData';

function App() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const [message, setMessage] = useState('');
  const submitButtonRef = useRef(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    const focusInput = (index) => {
      inputRefs.current[index].focus();
    };

    focusInput(0);
  }, [currentChallenge]);



  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);

    if (index < 3 && value !== '') {
      inputRefs.current[index + 1].focus();
    } else if (index === 3 && value !== '') {
      submitButtonRef.current.focus();
    }
  };

  const handleChallengeSubmit = () => {
    const currentChallengeData = challenges[currentChallenge];
    const combinedAnswer = inputValues.join('');
  
    if (combinedAnswer === currentChallengeData.answer) {
      if (currentChallenge === challenges.length - 1) {
        setMessage(`Pirate Hacker: Ahoy! Ye have unlocked the secret location of the treasure: ${currentChallengeData.secretLocation}. Find the treasure and claim yer reward!`);
      } else {
        setCurrentChallenge(currentChallenge + 1);
        setInputValues(['', '', '', '']);
        setMessage(`Pirate Hacker: Ya got it right! Here be the next clue:\n\n${challenges[currentChallenge + 1].clue}`);
      }
    } else {
      setMessage(`Pirate Hacker: Ye scurvy dog! Try again, matie!`);
      setInputValues(['', '', '', '']);
      inputRefs.current[0].focus();
    }
  };

  return (
    <div className="App">
      <div className="terminal">
        <div className="terminal-header">
          <span className="terminal-title">Pirate Hacker's Treasure Challenge</span>
        </div>
        <div className="terminal-body">
          <div className="message">{message || challenges[0].clue}</div>
          <div className="input-container">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(e, index)}
                maxLength={1}
                pattern="[0-9]*"
                inputMode="numeric"
                disabled={currentChallenge === challenges.length}
                ref={(input) => inputRefs.current.push(input)}
              />
            ))}
          </div>
          <button
            ref={submitButtonRef}
            onClick={handleChallengeSubmit}
            disabled={currentChallenge === challenges.length}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}


export default App;