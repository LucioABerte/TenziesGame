import './App.css'
import { useState, useEffect } from 'react'
import Dice from './components/Dice'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App(props) {

  const [dice, setDice] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)
  
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      
      newDice.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function holdDice(id) {
      setDice(oldDice => {
        return oldDice.map(die => {
          return die.id === id ? {...die, isHeld: !die.isHeld} : die
        })
      })

  }

  const diceElements = dice.map(die => (
    <Dice 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          holdDice={()=>holdDice(die.id)}
    />
  ))   
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }
  function rollDices() {
    if(!tenzies) { 
    setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else { 
      setTenzies(false)
      setDice(allNewDice())
    }  
  }
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)

    }
}, [dice])
  
  return (
    <body>
      {tenzies && <Confetti />}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='boxes-container'>
          {diceElements}
        </div>
        <button 
              className='roll'
              onClick={rollDices}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </body>
  )
}

export default App
