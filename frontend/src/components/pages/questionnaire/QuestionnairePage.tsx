import React, {useState, useEffect} from 'react';
import {IFilm, IQuestion} from '../../../types';
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
  const [allTags, setAllTags] = useState<string[] | null>(null);
  const [recommendations, setRecommendations] = useState<IFilm[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await api.get('questionnaire/');
        setQuestions(response.data.questions);
        setAllTags(response.data.tags);
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
    setPhrases(uniquePhrases);
  };

  const handleTagSelectionSubmit = async (selectedTags: string[]) => {
    try {
      setLoading(true);
      const response = await api.post('recommendations/', {
        tags: selectedTags,
        phrases: phrases,
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      message.error('Failed to fetch recommendations. Please try again later.');
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  } else if (recommendations) {
    return <Recommendations recommendations={recommendations} />;
  } else if (phrases && tags && allTags) {
    return (
      <TagSelection
        initialTags={tags}
        allTags={allTags}
        onSubmit={handleTagSelectionSubmit}
      />
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
