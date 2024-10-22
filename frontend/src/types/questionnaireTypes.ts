export interface IOption {
  id: number;
  text: string;
}

export interface IQuestion {
  id: number;
  question: string;
  options: IOption[];
}

export interface IQuestionnaire {
  version: string;
  questions: IQuestion[];
}

export interface IFilm {
  id: number;
  title: string;
  genres: string[];
  year: number;
  rating: number;
  duration: number;
  description: string;
}