import React from 'react';
import {Typography, Card, Col, Row} from 'antd';
import {IFilm} from '../../types';

const {Title, Text} = Typography;

interface IRecommendationsProps {
  recommendations: IFilm[];
}

const Recommendations: React.FC<IRecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <div style={{padding: '24px', width: '80%', margin: 'auto'}}>
      <Title level={2} style={{textAlign: 'center'}}>
        Film Recommendations
      </Title>
      <Row gutter={[16, 16]}>
        {recommendations.length > 0 ? (
          recommendations.map((film, index) => (
            <Col key={index} span={8}>
              <Card
                title={film.title}
                bordered={false}
                hoverable
                style={{marginBottom: '16px'}}>
                <Text strong>Year:</Text> <Text>{film.year}</Text>
                <br />
                <Text strong>Genres:</Text>{' '}
                <Text>{film.genres.join(', ')}</Text>
                <br />
                <Text strong>Rating:</Text> <Text>{film.rating}</Text>
                <br />
                <Text strong>Duration:</Text> <Text>{film.duration} min.</Text>
                <br />
                <Text strong>Description:</Text>{' '}
                <Text>{film.shortDescription}</Text>
                <br />
              </Card>
            </Col>
          ))
        ) : (
          <Text>No recommendations available.</Text>
        )}
      </Row>
    </div>
  );
};

export default Recommendations;
