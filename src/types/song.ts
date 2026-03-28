import type { Genre } from "./genre";

export type Song = {
  id: string;
  title: string;
  artists: string[];
  genre: Genre;
  likes: number;
  image: string;
  durationInMs: number;
};
