import React, {useState} from 'react';
import {Typography, Form, Input, Button, Switch, message} from 'antd';
import Recommendations from '../../common/Recomendations';
import api from '../../../api/api';
import {IFilm} from '../../../types';
import Loading from '../../common/Loading';
import {useAuth} from '../../../AuthContext';

const {Title} = Typography;

const MoodMatcherPage: React.FC = () => {
  const {isAuthenticated} = useAuth();

  const [recommendations, setRecommendations] = useState<IFilm[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [personalize, setPersonalize] = useState<boolean>(false);

  const handleMoodSubmit = async (values: {description: string}) => {
    setLoading(true);

    try {
      const response = await api.post('recommendations/', {
        user_input: values.description,
        personalize,
      });

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
    <div style={{padding: '20px'}}>
      <Title level={2} style={{marginBottom: '20px'}}>
        Describe Your Mood Or What You Feel Like Watching
      </Title>
      <Form
        name="moodForm"
        onFinish={handleMoodSubmit}
        layout="vertical"
        style={{maxWidth: '400px', margin: '0 auto'}}>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {required: true, message: 'Please describe your mood.'},
            {
              validator: (_, value) => {
                if (!value || value.trim().split(/\s+/).length >= 2) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Description must contain at least two words.'),
                );
              },
            },
          ]}>
          <Input placeholder="I feel like..." />
        </Form.Item>
        {isAuthenticated && (
          <Form.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <span>Personalize Recommendations</span>
              <Switch onChange={checked => setPersonalize(checked)} />
            </div>
          </Form.Item>
        )}
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
