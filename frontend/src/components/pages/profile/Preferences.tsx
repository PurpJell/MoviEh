import React from 'react';
import {IProfile} from '../../../types';
import {Space, Table, Typography} from 'antd';

const {Text} = Typography;

interface PreferencesProps {
  preferences: IProfile['preferences'];
}

const Preferences: React.FC<PreferencesProps> = ({preferences}) => {
  const preferenceData = preferences
    ? Object.entries(preferences).map(([genre, score]) => ({
        key: genre,
        genre,
        score,
      }))
    : [];

  const columns = [
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => (
        <Text>{score >= 0 ? `+${score}` : score}</Text>
      ),
    },
  ];

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Table columns={columns} dataSource={preferenceData} />
    </Space>
  );
};

export default Preferences;
