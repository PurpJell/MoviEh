import React, {useEffect, useState} from 'react';
import {Typography, Col, Row, Select, Slider, Switch} from 'antd';
import {IFilm} from '../../types';
import Film from './Film';
import {useAuth} from '../../AuthContext';

const {Title, Text} = Typography;
const {Option} = Select;

interface IRecommendationsProps {
  recommendations: IFilm[];
}

const Recommendations: React.FC<IRecommendationsProps> = ({
  recommendations,
}) => {
  const {isAuthenticated} = useAuth();

  const [personalized, setPersonalized] = useState<boolean>(true);
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
    const recommendationCopy = [...recommendations];
    const recoms = !personalized
      ? recommendationCopy
      : recommendationCopy.sort(
          (a, b) => b.personalization_score - a.personalization_score,
        );

    const filtered = recoms.filter(film => {
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
  }, [selectedGenre, yearRange, durationRange, recommendations, personalized]);

  return (
    <div style={{padding: '24px', width: '80%', margin: 'auto'}}>
      <Title level={2} style={{textAlign: 'center'}}>
        Film Recommendations
      </Title>

      <div style={{marginBottom: '24px'}}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Switch
              checkedChildren="Personalized"
              unCheckedChildren="Generic"
              defaultChecked
              onChange={checked => {
                if (checked) {
                  setPersonalized(true);
                } else {
                  setPersonalized(false);
                }
              }}
            />
          </Col>

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
              <Film film={film} giveFeedback={isAuthenticated} />
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
