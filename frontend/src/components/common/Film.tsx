import React, {useState} from 'react';
import {
  Typography,
  Card,
  Button,
  Space,
  Tooltip,
  message,
  Row,
  Col,
} from 'antd';
import {LikeOutlined, DislikeOutlined} from '@ant-design/icons';
import {IFilm} from '../../types';
import api from '../../api/api';

const {Text} = Typography;

interface IFilmProps {
  film: IFilm;
  giveFeedback?: boolean;
}

const Film: React.FC<IFilmProps> = ({film, giveFeedback}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);

  const handleFeedback = async (feedbackPolarity: boolean) => {
    setIsSubmitting(true);
    try {
      await api.post('/feedback/', {
        movie_title: film.title,
        feedback_polarity: feedbackPolarity,
      });
      setFeedbackGiven(feedbackPolarity);
      message.success(
        `You ${feedbackPolarity ? 'liked' : 'disliked'} "${film.title}".`,
      );
    } catch (error) {
      console.error('Error submitting feedback:', error);
      message.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      title={film.title}
      bordered={false}
      hoverable
      style={{
        marginBottom: '24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Text strong>Year:</Text> <Text>{film.year}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Genres:</Text> <Text>{film.genres.join(', ')}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Rating:</Text> <Text>{film.rating}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Duration:</Text> <Text>{film.duration} min.</Text>
        </Col>
      </Row>

      <div style={{marginTop: '12px'}}>
        <Text strong>Description:</Text>
        <Text style={{display: 'block', marginTop: '4px'}}>
          {film.shortDescription}
        </Text>
      </div>

      {giveFeedback && (
        <Space
          style={{
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
          }}>
          <Tooltip
            title={
              feedbackGiven === true
                ? 'You already liked this movie'
                : 'I like this movie'
            }>
            <Button
              type="primary"
              shape="round"
              icon={<LikeOutlined />}
              disabled={isSubmitting || feedbackGiven !== null}
              style={{flex: '1 1 auto', minWidth: '120px'}}
              onClick={() => handleFeedback(true)}>
              Like
            </Button>
          </Tooltip>

          <Tooltip
            title={
              feedbackGiven === false
                ? 'You already disliked this movie'
                : 'I dislike this movie'
            }>
            <Button
              shape="round"
              danger
              icon={<DislikeOutlined />}
              disabled={isSubmitting || feedbackGiven !== null}
              style={{flex: '1 1 auto', minWidth: '120px'}}
              onClick={() => handleFeedback(false)}>
              Dislike
            </Button>
          </Tooltip>
        </Space>
      )}

      {feedbackGiven !== null && (
        <Text
          style={{
            display: 'block',
            marginTop: '12px',
            textAlign: 'center',
            color: feedbackGiven ? 'green' : 'red',
          }}>
          {feedbackGiven
            ? 'You have liked this movie.'
            : 'You have disliked this movie.'}
        </Text>
      )}
    </Card>
  );
};

export default Film;
