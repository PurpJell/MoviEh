import React, {useState} from 'react';
import {Typography, Card, Tag, Button, Row, Col} from 'antd';

const {Title, Text} = Typography;

interface TagSelectionProps {
  initialTags: string[];
  allTags: string[];
  onSubmit: (selectedTags: string[]) => void;
}

const TagSelection: React.FC<TagSelectionProps> = ({initialTags, allTags, onSubmit}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [availableTags, setAvailableTags] = useState<string[]>(
    allTags.filter(tag => !initialTags.includes(tag)),
  );

  const handleSelectTag = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
    setAvailableTags(availableTags.filter(t => t !== tag));
  };

  const handleDeselectTag = (tag: string) => {
    setAvailableTags([...availableTags, tag]);
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        maxWidth: '800px',
        height: '100%',
        margin: '0 auto',
      }}>
      <Title level={3}>Change tags to get better recommendations</Title>

      <Row gutter={20} style={{marginTop: '20px', flexGrow: '1'}}>
        {/* Selected Tags */}
        <Col span={12}>
          <Card
            title="Selected Tags"
            bordered={false}
            style={{height: '100%', overflowY: 'auto'}}>
            {selectedTags.length > 0 ? (
              selectedTags.map(tag => (
                <Tag
                  key={tag}
                  color="green"
                  onClick={() => handleDeselectTag(tag)}
                  style={{cursor: 'pointer', marginBottom: '8px'}}>
                  {tag}
                </Tag>
              ))
            ) : (
              <Text type="secondary">No tags selected</Text>
            )}
          </Card>
        </Col>

        {/* Available Tags */}
        <Col span={12}>
          <Card
            title="Available Tags"
            bordered={false}
            style={{height: '100%', overflowY: 'auto'}}>
            {availableTags.length > 0 ? (
              availableTags.map(tag => (
                <Tag
                  key={tag}
                  color="blue"
                  onClick={() => handleSelectTag(tag)}
                  style={{cursor: 'pointer', marginBottom: '8px'}}>
                  {tag}
                </Tag>
              ))
            ) : (
              <Text type="secondary">No available tags</Text>
            )}
          </Card>
        </Col>
      </Row>

      <Button
        type="primary"
        onClick={() => onSubmit(selectedTags)}
        style={{marginTop: '20px'}}>
        Finish Selection
      </Button>
    </div>
  );
};

export default TagSelection;
