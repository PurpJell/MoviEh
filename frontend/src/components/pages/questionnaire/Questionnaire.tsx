import React, { useState, useEffect } from 'react';
import { Button, Radio, Typography, Flex } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import api from '../../../api/api';
import Loading from '../Loading';

const { Title, Text } = Typography;

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

interface Questionnaire {
  version: string;
  questions: Question[];
}

const FilmQuestionnaire: React.FC = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [results, setResults] = useState<(number | null)[]>([]);

  useEffect(() => {
    api.get('questionnaire/?format=json')
      .then((response: { data: Questionnaire }) => {
        setQuestionnaire(response.data);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (questionnaire) {
      setResults(new Array(questionnaire.questions.length).fill(null));
    }
  }, [questionnaire]);

  const handleAnswerChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };

  if (!questionnaire) {
    return <Loading />;
  }

  const handleNextQuestion = () => {
    if (selectedOption) {
      // save the answer
      const newResults = [...results];
      newResults[currentQuestionIndex] = selectedOption.id;
      setResults(newResults);
      if (currentQuestionIndex < questionnaire.questions.length - 1) {
        // go to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        // questionaire is done
        alert(JSON.stringify({ version: questionnaire.version, results: newResults }));
        // send the results to the server
      }
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  return (
    <Flex vertical style={{ padding: '24px', width: '50%', height: '100%', margin: 'auto' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Film Questionnaire</Title>
        <Text>Question {currentQuestionIndex + 1} of {questionnaire.questions.length}</Text>
        <div style={{textAlign: 'left', flexGrow: 10}}>
          <Title level={4} style={{margin: '10px 0'}}>{questionnaire.questions[currentQuestionIndex].question}</Title>
          <Radio.Group
            onChange={handleAnswerChange}
          >
            {questionnaire.questions[currentQuestionIndex].options.map((option) => (
              <Radio key={option.id} value={option} style={{ display: 'block', marginBottom: '8px' }}>
                {option.text}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      <Flex style={{
        width: '100%',
        justifyContent: 'space-between',
        padding: '10px 0',
        flexWrap: 'wrap',
        height: '13%',
        }}>
        <Button style={{flexGrow: 20, height: '100%' }} onClick={handleGoBack} disabled={currentQuestionIndex === 0}>
          <ArrowLeftOutlined />
          Go Back
        </Button>
        <div style={{flexGrow: 30}}></div>
        <Button style={{flexGrow: 50, height: '100%' }} type="primary" onClick={handleNextQuestion} disabled={!selectedOption}>
          Next
          <ArrowRightOutlined />
        </Button>
      </Flex>
    </Flex>
  );
};

export default FilmQuestionnaire;
