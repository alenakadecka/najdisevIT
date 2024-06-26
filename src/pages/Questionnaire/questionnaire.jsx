import { useRef, useState } from 'react';
import questionaireData from '../../data/questionnaireData';
import { Question } from '../../components/Question/question';
import { Answer } from '../../components/Answer/answer';
import { History } from '../../components/History/history';
import { Result } from '../../components/Result/result';
import { Congratulation } from '../../components/Congratulation/congratulation';
import { HistoryIntro } from '../../components/HistoryIntro/historyintro';
import './style.css';

export const Questionnaire = () => {
  const [questionId, setQuestionId] = useState(0);
  const questionObject = questionaireData[questionId];

  const [score, setScore] = useState({
    ux: 0,
    frontend: 0,
    analyticka: 0,
    testerka: 0,
  });
  const history = useRef([]);

  const onChangeAnswer = (answer) => {
    if (answer.position) {
      setScore((previousScore) => {
        const newScore = {
          ...previousScore,
        };

        newScore[answer.position] = newScore[answer.position] + 1;
        return newScore;
      });
    }

    const questionLog = {
      id: questionId,
      answer: answer.text,
    };

    history.current.push(questionLog);
    setQuestionId(answer.nextQuestionId);
  };

  return questionObject ? (
    <div>
      <Question text={questionObject.question} />
      <div className="answers-list">
        {questionObject.answers.map((answer) => {
          return (
            <Answer
              key={answer.text}
              answer={answer}
              onChangeAnswer={onChangeAnswer}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className="result">
      <Congratulation />
      <Result score={score} />
      <div className="history">
        <HistoryIntro />
        <History dataHistory={history} />
      </div>
    </div>
  );
};
