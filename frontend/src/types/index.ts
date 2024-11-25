export interface IOption {
  text: string;
  result: string[];
}
export interface IQuestion {
  text: string;
  type: 'radio' | 'checkbox';
  resultType: 'tags' | 'phrase';
  options: IOption[];
}

export interface IFilm {
  title: string;
  genres: string[];
  year: number;
  rating: number;
  duration: number;
  shortDescription: string;
}
