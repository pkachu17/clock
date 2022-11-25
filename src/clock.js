import React from 'react';
import "./clock.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Clock = ()=>{

    document.title = "Clock";
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        let TimeId = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(TimeId);
        };
    });

    useEffect(() => {
        setInterval(() => {
            getquotes();
        }, 60000);
    }, [])

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const getquotes = async()=>{
        const response = await fetch("https://type.fit/api/quotes").then(function(response) {
            return response.json();
          })
          .then(function(data) {
            console.log(data[0]);
            var min = Math.ceil(1);
            var max = Math.floor(1600);
            var num = Math.floor(Math.random() * (max - min) + min);
            setQuote(data[num].text);
            setAuthor(data[num].author);
          });
    }

    return(
        <div className="clockpage">
            <div className="panel">
                <div className="panelup">{time.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})}
                    <div className="panelupdown">{days[time.getDay()]}, {time.getDate()}  {months[time.getMonth()]}</div>
                </div>
                <div className="panelmid">{quote}<br />-{author}</div>
            </div>
        </div>
    )
}
export default Clock