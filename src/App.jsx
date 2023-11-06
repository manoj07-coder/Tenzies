import React, { useState } from "react";
import Confetti from 'react-confetti'
import Die from './components/Die';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: randomDieValue(),
        held: false,
        id: i + 1
      };
      newArray.push(newDie);
    }
    return newArray;
  }

  function rollUnheldDice(){
    if(!tenzies){
      setDice((oldDice) => oldDice.map((die,i) => 
        die.held ? die : {value:randomDieValue(), held: false, id : i + 1}
      ))
    }else{
      setDice(allNewDice())
      setTenzies(false)
    }
  }

  function holdDice(id) {
    setDice(prevDice =>
      prevDice.map(die =>
        die.id === id ? { ...die, held: !die.held } : die
      )
    );
    const firstValue = dice[0].value;
  const allDiceSame = dice.every(die => die.value === firstValue);
  if (allDiceSame) {
    setTenzies(true);
  }
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} held={die.held} hold={() => holdDice(die.id)} />
  ));

  return (
    <main>
      {tenzies && <Confetti width={window.innerWidth}  />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className="die-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollUnheldDice}>{tenzies ? "Reset Game" : "Roll"}</button>
    </main>
  );
}
