import React, { useState, useEffect } from 'react';
import { database, auth } from "../firebaseConfig"; 
import { useNavigate } from "react-router-dom";

const words = ['apple', 'banana', 'berry', 'mango', 'grape'];

const Game = () => {
  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setDisplayWord('_ '.repeat(randomWord.length));
    setGuessedLetters([]);
  };

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (word.includes(letter)) {
      const newDisplayWord = word.split('').map((char, index) => {
        return guessedLetters.includes(char) || char === letter ? char : '_ ';
      });

      setDisplayWord(newDisplayWord.join(''));

      if (!newDisplayWord.includes('_ ')) {
        const newScore = score + 1;
        setScore(newScore);
        alert('You guessed the word! New word loaded.');
        resetGame();
      }
    }
  };

  const updateScoreInDatabase = (newScore) => {
    const userId = auth.currentUser.uid; 
    database.ref('scores/' + userId).set({ score: newScore })
      .then(() => {
        alert('Score saved!');
      })
      .catch(error => {
        console.error("Error saving score: ", error);
        alert('Failed to save score.');
      });
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('User signed out!');
      localStorage.clear();
      navigate('/register');
    });
  };

  return (
    <div className="container">
      <br/>
      <h1>Guess the Word</h1>
      <p>{displayWord}</p>
      <p>Current Score: {score}</p>
      <input type='text' placeholder='Enter a letter' />
      <button onClick={() => handleGuess(document.querySelector('input[type="text"]').value)}>Guess</button>
      <br/>
      <button onClick={() => updateScoreInDatabase(score)}>Save Score</button>
      <br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Game;
