import axios from "axios";
import type { Album } from "../types/album";

const API_BASE = "https://qtify-backend.labs.crio.do";

export async function fetchTopAlbums(): Promise<Album[]> {
  const { data } = await axios.get<Album[]>(`${API_BASE}/albums/top`);
  return data;
}

export async function fetchNewAlbums(): Promise<Album[]> {
  const { data } = await axios.get<Album[]>(`${API_BASE}/albums/new`);
  return data;
}
