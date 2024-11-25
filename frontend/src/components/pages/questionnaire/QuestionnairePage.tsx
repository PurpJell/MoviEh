import React, {useState, useEffect} from 'react';
import {IFilm, IQuestion} from '../../../types/questionnaireTypes';
import api from '../../../api/api';
import Loading from '../../common/Loading';
import Recommendations from '../../common/Recomendations';
import Questionnaire from './Questionnaire';
import {message} from 'antd';
import TagSelection from './TagSelection';

const QuestionnairePage: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[] | null>(null);
  const [phrases, setPhrases] = useState<string[] | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);
  const [recommendations, setRecommendations] = useState<IFilm[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await api.get('questionnaire/');
        setQuestions(response.data.questions);
      } catch (error) {
        message.error('Failed to fetch questionnaire. Please try again later.');
        console.error('Error fetching questionnaire:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaire();
  }, []);

  const handleQuestionnaireSubmit = (results: {
    phrases: string[];
    tags: string[];
  }) => {
    const uniqueTags = Array.from(new Set(results.tags));
    setTags(uniqueTags);

    const uniquePhrases = Array.from(new Set(results.phrases));
    console.log('uniquePhrases', uniquePhrases);
    setPhrases(uniquePhrases);
  };

  const handleTagSelectionSubmit = async (selectedTags: string[]) => {
    const payload = {
      tags: selectedTags,
      phrases: phrases,
    };

    setLoading(true);
    const response = await api.post('recommendations/', payload);
    setLoading(false);
    setRecommendations(response.data.recommendations);

    if (response.data.recommendations.length === 0) {
      message.warning(
        'No recommendations found for selected tags and phrases.',
      );
    }
  };

  if (loading) {
    return <Loading />;
  } else if (recommendations) {
    return <Recommendations recommendations={recommendations} />;
  } else if (phrases && tags) {
    return (
      <TagSelection initialTags={tags} onSubmit={handleTagSelectionSubmit} />
    );
  } else if (questions) {
    return (
      <Questionnaire
        questions={questions}
        onSubmit={handleQuestionnaireSubmit}
      />
    );
  }
};

export default QuestionnairePage;
