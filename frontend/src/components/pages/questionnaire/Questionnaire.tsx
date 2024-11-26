import React, {useState} from 'react';
import {Typography, Flex} from 'antd';
import {IQuestion} from '../../../types';
import QuestionPanel from './QuestionPanel';

const {Title, Text} = Typography;

interface QuestionnaireProps {
  questions: IQuestion[];
  onSubmit: (results: {phrases: string[]; tags: string[]}) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({questions, onSubmit}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<string[][][]>(
    new Array(questions.length).fill([...[]]),
  );

  const handleNextQuestion = (selectedOptions: string[][]) => {
    const updatedResults = [...results];
    updatedResults[currentQuestionIndex] = selectedOptions;
    setResults(updatedResults);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const payload: {phrases: string[]; tags: string[]} = {
        phrases: [],
        tags: [],
      };
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].resultType === 'tags') {
          payload.tags = [...payload.tags, ...updatedResults[i].flat()];
        } else if (questions[i].resultType === 'phrase') {
          payload.phrases = [...payload.phrases, ...updatedResults[i].flat()];
        }
      }
      console.log('payload:', payload);
      onSubmit(payload);
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Flex
      vertical
      style={{padding: '24px', width: '70%', height: '100%', margin: 'auto'}}>
      <Title level={2} style={{textAlign: 'center'}}>
        Film Questionnaire
      </Title>
      <Text>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>
      <QuestionPanel
        question={questions[currentQuestionIndex]}
        prevSelectedOptions={results[currentQuestionIndex]}
        onBack={handleGoBack}
        onNext={handleNextQuestion}
        canGoBack={currentQuestionIndex > 0}
      />
    </Flex>
  );
};

export default Questionnaire;
