/** Shape returned by `GET https://qtify-backend.labs.crio.do/albums/top` */
export type Album = {
  id: string;
  title: string;
  description: string;
  follows: number;
  image: string;
  slug: string;
};
