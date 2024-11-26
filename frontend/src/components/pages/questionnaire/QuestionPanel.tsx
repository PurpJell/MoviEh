import React, {useState, useEffect} from 'react';
import {Button, Radio, Checkbox, Typography, Flex, Space} from 'antd';
import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {IOption, IQuestion} from '../../../types';
import {RadioChangeEvent} from 'antd/es/radio';

const {Title} = Typography;

interface QuestionPanelProps {
  question: IQuestion;
  prevSelectedOptions: string[][];
  onBack: () => void;
  onNext: (selectedOptions: string[][]) => void;
  canGoBack: boolean;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  prevSelectedOptions,
  onBack,
  onNext,
  canGoBack,
}) => {
  // [string[]] for radio, string[][] for checkbox
  const [selectedOptions, setSelectedOptions] = useState<string[][]>([[]]);

  useEffect(() => {
    setSelectedOptions(prevSelectedOptions);
    console.log('prevSelectedOptions', prevSelectedOptions);
  }, [question]);

  const handleRadioChange = (e: RadioChangeEvent) => {
    const val = e.target.value as IOption['result'];
    setSelectedOptions([val]);
  };

  const handleCheckboxChange = (checkedValues: IOption['result'][]) => {
    setSelectedOptions(checkedValues);
  };

  const handleNextClick = () => {
    onNext(selectedOptions);
  };

  return (
    <Flex
      vertical
      style={{
        padding: '24px',
        width: '40vw',
        height: '100%',
        margin: 'auto',
      }}>
      <div style={{textAlign: 'left', flexGrow: 10}}>
        <Title level={4} style={{margin: '10px 0'}}>
          {question.text}
        </Title>

        {question.type === 'radio' ? (
          <Radio.Group
            onChange={handleRadioChange}
            value={selectedOptions[0] || undefined}>
            <Space direction="vertical">
              {question.options.map(option => (
                <Radio key={option.text} value={option.result}>
                  {option.text}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        ) : (
          <Checkbox.Group
            onChange={handleCheckboxChange}
            value={selectedOptions || undefined}>
            <Space direction="vertical">
              {question.options.map(option => (
                <Checkbox key={option.text} value={option.result}>
                  {option.text}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        )}
      </div>

      <Flex
        style={{
          width: '100%',
          justifyContent: 'space-between',
          padding: '10px 0',
          flexWrap: 'wrap',
          height: '7vh',
        }}>
        <Button
          style={{flexGrow: 20, height: '100%'}}
          onClick={onBack}
          disabled={!canGoBack}>
          <ArrowLeftOutlined />
          Go Back
        </Button>
        <div style={{flexGrow: 30}}></div>
        <Button
          style={{flexGrow: 50, height: '100%'}}
          type="primary"
          onClick={handleNextClick}
          disabled={selectedOptions.length === 0}>
          Next
          <ArrowRightOutlined />
        </Button>
      </Flex>
    </Flex>
  );
};

export default QuestionPanel;
