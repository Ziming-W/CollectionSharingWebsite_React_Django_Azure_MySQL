import React, {Component} from 'react'
import zxcvbn from 'zxcvbn';

export default function PasswordMeter({password}) {
    const testResult = zxcvbn(password);
    let num = testResult.score * 100/4;
    if (testResult.score === 0){
        num = 5;
    }
    
    const strengthColor = () => {
      switch(testResult.score) {
          case 0:
            return '#828282';
          case 1:
            return '#EA1111';
          case 2:
            return '#FFAD00';
          case 3:
            return '#9bc158';
          case 4:
            return '#00b500';
          default:
            return 'none';
      }
    }
    

    const changeColor = () => ({
        width: `${num}%`,
        background: strengthColor(),
        // height: '7px'
    })

    return (
        <div className="progress-bar" style = {changeColor()} />
    )
} 