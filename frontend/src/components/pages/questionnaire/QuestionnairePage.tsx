import React, { useState, useEffect } from 'react';
import { IFilm, IQuestionnaire } from '../../../types/questionnaireTypes';
import api from '../../../api/api';
import Loading from '../../common/Loading';
import Recommendations from '../../common/Recomendations';
import Questionnaire from './Questionnaire';

const QuestionnairePage: React.FC = () => {

  const [questionnaire, setQuestionnaire] = useState<IQuestionnaire | null>(null);
  const [recommendations, setRecommendations] = useState<IFilm[] | null>(null);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await api.get('questionnaire/');
        setQuestionnaire(response.data);
      } catch (error) {
        console.error('Failed to fetch questionnaire:', error);
      }
    };

    fetchQuestionnaire();
  }, []);

  const handleSubmit = async (results: (number | null)[]) => {
    const payload = { version: questionnaire?.version, results };
    
    try {
      const response = await api.post('questionnaire/', payload);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    }
  };

  if (!questionnaire) {
    // questionnaire is fetching
    return <Loading />;
  } else if (!recommendations) {
    // user is answering questions
    return <Questionnaire questionnaire={questionnaire} onSubmit={handleSubmit} />;
  } else if (recommendations) {
    return <Recommendations recommendations={recommendations} />;
  }
};

export default QuestionnairePage;
