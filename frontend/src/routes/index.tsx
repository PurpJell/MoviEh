import React from 'react';
import PathConstants from './PathConstants';

const Home = React.lazy(() => import('../components/pages/home/HomePage'));
const Questionnaire = React.lazy(
  () => import('../components/pages/questionnaire/QuestionnairePage'),
);

const routes = [
  {path: PathConstants.HOME, element: <Home />},
  {path: PathConstants.QUESTIONNAIRE, element: <Questionnaire />},
];

export default routes;
