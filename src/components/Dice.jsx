import React from 'react'

const Dice = (props) => {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
  return (
    <div 
        className="box" 
        style={styles} 
        onClick={props.holdDice}>
        <h2 className='box-num'>{props.value}</h2>
    </div>
  )
}

export default Dice