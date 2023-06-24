import React from 'react';
import "./message.scss";

const Message = ({complete, message}) => {

    const fade = complete;
  return (
    <div className={complete? 'message complete' : 'message'}>
        <span>{message}</span>
        <div className={complete? "timer" : "timer hide "}>
            <div className={complete ? "progress fade" : "progress"}>

            </div>
        </div>
    </div>
  )
}

export default Message