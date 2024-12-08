import React from 'react';
import PathConstants from './PathConstants';
import {Navigate} from 'react-router-dom';

const Login = React.lazy(() => import('../components/pages/login/LoginPage'));
const Register = React.lazy(
  () => import('../components/pages/register/RegisterPage'),
);
const MoodMatcher = React.lazy(
  () => import('../components/pages/mood-matcher/MookMatcherPage'),
);
const Questionnaire = React.lazy(
  () => import('../components/pages/questionnaire/QuestionnairePage'),
);
const Profile = React.lazy(
  () => import('../components/pages/profile/ProfilePage'),
);

const routes = [
  {path: '', element: <Navigate to={PathConstants.HOME} />},
  {path: PathConstants.LOGIN, element: <Login />},
  {path: PathConstants.REGISTER, element: <Register />},
  {path: PathConstants.PROFILE, element: <Profile />},
  {path: PathConstants.MOOD_MATCHER, element: <MoodMatcher />},
  {path: PathConstants.QUESTIONNAIRE, element: <Questionnaire />},
];

export default routes;
