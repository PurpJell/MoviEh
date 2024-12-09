import React from 'react';
import {Typography, Card} from 'antd';
import {IFilm} from '../../types';

const {Text} = Typography;

interface IFilmProps {
  film: IFilm;
}

const Film: React.FC<IFilmProps> = ({film}) => {
  return (
    <Card
      title={film.title}
      bordered={false}
      hoverable
      style={{marginBottom: '16px'}}>
      <Text strong>Year:</Text> <Text>{film.year}</Text>
      <br />
      <Text strong>Genres:</Text> <Text>{film.genres.join(', ')}</Text>
      <br />
      <Text strong>Rating:</Text> <Text>{film.rating}</Text>
      <br />
      <Text strong>Duration:</Text> <Text>{film.duration} min.</Text>
      <br />
      <Text strong>Description:</Text> <Text>{film.shortDescription}</Text>
      <br />
    </Card>
  );
};

export default Film;
