import React, {useEffect, useState} from 'react';
import {Typography, Card, Col, Row, Select, Slider} from 'antd';
import {IFilm} from '../../types';

const {Title, Text} = Typography;
const {Option} = Select;

interface IRecommendationsProps {
  recommendations: IFilm[];
}

const Recommendations: React.FC<IRecommendationsProps> = ({
  recommendations,
}) => {
  const [filteredRecommendations, setFilteredRecommendations] =
    useState<IFilm[]>(recommendations);

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [yearRange, setYearRange] = useState<[number, number]>([
    1900,
    new Date().getFullYear(),
  ]);
  const [durationRange, setDurationRange] = useState<[number, number]>([
    0, 300,
  ]);

  // Extract unique genres for dropdown
  const genres = Array.from(
    new Set(recommendations.flatMap(film => film.genres)),
  );

  const handleFilterChange = () => {
    const filtered = recommendations.filter(film => {
      const matchesGenre = selectedGenre
        ? film.genres.includes(selectedGenre)
        : true;
      const matchesYear =
        film.year >= yearRange[0] && film.year <= yearRange[1];
      const matchesDuration =
        film.duration >= durationRange[0] && film.duration <= durationRange[1];
      return matchesGenre && matchesYear && matchesDuration;
    });
    setFilteredRecommendations(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedGenre, yearRange, durationRange, recommendations]);

  return (
    <div style={{padding: '24px', width: '80%', margin: 'auto'}}>
      <Title level={2} style={{textAlign: 'center'}}>
        Film Recommendations
      </Title>

      <div style={{marginBottom: '24px'}}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>Select Genre:</Text>
            <Select
              placeholder="Choose a genre"
              style={{width: '100%', marginTop: '8px'}}
              onChange={value => {
                setSelectedGenre(value);
              }}
              allowClear>
              {genres.map(genre => (
                <Option key={genre} value={genre}>
                  {genre}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={8}>
            <Text strong>Select Release Year Range:</Text>
            <Slider
              range
              min={1900}
              max={new Date().getFullYear()}
              defaultValue={yearRange}
              tooltip={{formatter: value => `${value}`}}
              style={{marginTop: '8px'}}
              onChangeComplete={value => {
                setYearRange(value as [number, number]);
                handleFilterChange();
              }}
            />
          </Col>

          <Col span={8}>
            <Text strong>Set Duration Range (minutes):</Text>
            <Slider
              range
              min={0}
              max={300}
              step={1}
              value={durationRange}
              tooltip={{formatter: value => `${value} min`}}
              style={{marginTop: '8px'}}
              onChange={value => {
                setDurationRange(value as [number, number]);
                handleFilterChange();
              }}
            />
          </Col>
        </Row>
      </div>

      <Row gutter={[16, 16]}>
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((film, index) => (
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
