import React from "react";
import "./App.css";
import { questions } from "./questions";
import { useState, useEffect } from "react";
import congrantsImg from "./images/congrats.jpeg";
import lifeVac from "./images/lifevac.png";
import correctImg from "./images/correct.svg";
import wrongImg from "./images/wrong.svg";
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

// Insert link to the discounted product here
const link = "https://www.lifevac.net/";
function InsertLink (props){
  if (props.hasLink) {
    return <a className="link" href={link}>Buy at full price of $79.99</a>
  }
}
function ShowResult (props){
  if (props.answer) {
    return <p className="correct"><img src={correctImg}></img></p>
  } 
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false)
  const onClick = () => setShowResults(true)

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
      setCurrentQuestion(nextQuestion);
      }, 2000);

    } else {
      setShowScore(true);
    }
  };
  const Results = () => (
    <div id="results" className="search-results">
      Some Results
    </div>
  )

  return (
    <div className="app">
      {showScore ? (
        <section className="showScore-section">
        <img src={congrantsImg}></img>
        <p>Congratulations for taking the quiz!</p>
        <h2 className="total-score">Your score is {score} / {questions.length}</h2>
        <p>Here is a link to the discounted product for you:</p>
        <a className="external-button" href="#">PROCEED TO CHECKOUT</a>
        <p className="countdown-txt">Don't forget - this offer is only available for the next 30 minutes!</p>
        <p className="countdown"><Countdown date={Date.now() + 1800000} /></p>
        </section>
      ) : (
        <>
          <section className="question-section">
            <div className="lifevac-img">
              <img src={lifeVac}></img>
            </div>
            <div className="image">
              <img src={questions[currentQuestion].questionImg}></img>
                </div>
            <h2>{questions[currentQuestion].questionText}</h2>
          </section>

          <section className="answer-section">
            {questions[currentQuestion].answerOptions.map((item) => (
              <button onClick={() => handleClick(item.isCorrect)}>
                {item.answerText} { showResults ? <Results /> : null } />
              </button>
            ))}
            <InsertLink hasLink={questions[currentQuestion].link} />
          </section>
        </>
      )}
    </div>
  );
}
