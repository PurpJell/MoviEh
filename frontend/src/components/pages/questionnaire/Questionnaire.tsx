import React, { useState } from 'react';
import { Button, Radio, Typography, Flex } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { IQuestionnaire, IOption } from '../../../types/questionnaireTypes';

const { Title, Text } = Typography;

interface QuestionnaireProps {
  questionnaire: IQuestionnaire;
  onSubmit: (results: (number | null)[]) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ questionnaire, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
  const [results, setResults] = useState<(number | null)[]>(new Array(questionnaire.questions.length).fill(null));

  const handleAnswerChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      const newResults = [...results];
      newResults[currentQuestionIndex] = selectedOption.id;
      setResults(newResults);
      
      if (currentQuestionIndex < questionnaire.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        onSubmit(newResults); // Submit results to parent component
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

export default Questionnaire;