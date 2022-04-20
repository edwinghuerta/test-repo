export interface Card {
  id: string | number;
  image: string;
  title: string;
  fields: {
    [key: string]: string | number;
  };
}
