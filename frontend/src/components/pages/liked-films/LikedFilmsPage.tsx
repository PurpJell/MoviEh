import React, {useEffect, useState} from 'react';
import {IFilm} from '../../../types';
import api from '../../../api/api';
import {message, Typography, List, Spin} from 'antd';
import Film from '../../common/Film';

const {Title, Text} = Typography;

const LikedFilmsPage: React.FC = () => {
  const [films, setFilms] = useState<IFilm[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<IFilm>({
    title: '...',
    genres: [],
    year: 2000,
    rating: 9,
    duration: 100,
    shortDescription: '...',
    personalization_score: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedFilms = async () => {
      try {
        const response = await api.get<{liked_movies: IFilm[]}>(
          'liked_movies/',
        );
        setFilms(response.data.liked_movies);
        setSelectedFilm(response.data.liked_movies[0] || {});
      } catch (error) {
        message.error('Failed to fetch liked films. Please try again later.');
        console.error('Error fetching liked films:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLikedFilms();
  }, []);

  const handleFilmClick = (film: IFilm) => {
    setSelectedFilm(film);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'row', padding: '2%'}}>
      {loading ? (
        <div
          style={{
            flex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div
            style={{
              flex: 1,
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '16px',
              marginRight: '16px',
              minWidth: '40%',
            }}>
            <Title
              level={3}
              style={{textAlign: 'center', marginBottom: '24px'}}>
              Your Liked Films
            </Title>
            <List
              dataSource={films}
              renderItem={film => (
                <Text
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    backgroundColor:
                      selectedFilm === film ? '#e6f4ff' : 'white',
                    color: selectedFilm === film ? '#1677ff' : 'black',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onClick={() => handleFilmClick(film)}>
                  {film.title}
                </Text>
              )}
            />
          </div>
          <Film film={selectedFilm} />
        </>
      )}
    </div>
  );
};

export default LikedFilmsPage;
