import React, { useState } from "react";
import Die from './components/Die';

export default function App(){

  const [dice, setDice] = useState(allNewDice())


  function randomDieValue(){
    return Math.ceil(Math.random() * 6)
  }

  function allNewDice(){
    const newArray =[]
    for(let i = 0; i < 10; i++){
      const newDie = {
        value : randomDieValue(),
        held : false,
        id : i + 1
      }
      newArray.push(newDie)
    }
    return newArray
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, held: !die.held} : die
    }))
  }

  const diceElements = dice.map((die) => {
    <Die key={die.id} value = {die.value} hold={() => holdDice(die.id)}/>
  })

  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls</p>
        <div className="die-container">{diceElements}</div>
        <button className="roll-dice">Roll</button>
    </main>
  )
}