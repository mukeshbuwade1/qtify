import axios from "axios";
import type { Genre } from "../types/genre";
import type { Song } from "../types/song";

const API_BASE = "https://qtify-backend.labs.crio.do";

type GenresApiEnvelope = {
  data: Genre[];
};

export async function fetchSongs(): Promise<Song[]> {
  const { data } = await axios.get<Song[]>(`${API_BASE}/songs`);
  return data;
}

export async function fetchGenres(): Promise<Genre[]> {
  const { data } = await axios.get<GenresApiEnvelope>(`${API_BASE}/genres`);
  return data.data;
}
