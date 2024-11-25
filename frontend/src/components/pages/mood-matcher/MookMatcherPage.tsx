import React, { useState } from 'react';
import { Typography, Form, Input, Button, message } from 'antd';
import Recommendations from '../../common/Recomendations';
import api from '../../../api/api';
import { IFilm } from '../../../types';
import Loading from '../../common/Loading';

const { Title } = Typography;

const MoodMatcherPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<IFilm[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleMoodSubmit = async (values: { mood: string }) => {
    setLoading(true);

    try {
      const response = await api.post('recommendations/', { user_input: values.mood });

      if (response.data.recommendations?.length > 0) {
        setRecommendations(response.data.recommendations);
      } else {
        message.warning('No recommendations found for this mood.');
        setRecommendations([]);
      }
    } catch (error) {
      message.error('Failed to fetch recommendations. Please try again later.');
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (recommendations.length > 0) {
    return <Recommendations recommendations={recommendations} />;
  } else if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ marginBottom: '20px' }}>Enter Your Mood</Title>
      <Form
        name="moodForm"
        onFinish={handleMoodSubmit}
        layout="vertical"
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <Form.Item
          label="Mood"
          name="mood"
          rules={[{ required: true, message: 'Please enter your mood!' }]}
        >
          <Input placeholder="I'm feeling..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Get Recommendations
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MoodMatcherPage;
