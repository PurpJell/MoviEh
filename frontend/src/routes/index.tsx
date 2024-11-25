import React from 'react';
import PathConstants from './PathConstants';
import {Navigate} from 'react-router-dom';

const MoodMatcher = React.lazy(
  () => import('../components/pages/mood-matcher/MookMatcherPage'),
);
const Questionnaire = React.lazy(
  () => import('../components/pages/questionnaire/QuestionnairePage'),
);

const routes = [
  {path: '', element: <Navigate to={PathConstants.HOME} />},
  {path: PathConstants.MOOD_MATCHER, element: <MoodMatcher />},
  {path: PathConstants.QUESTIONNAIRE, element: <Questionnaire />},
];

export default routes;
