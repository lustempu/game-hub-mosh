import useData from "./useData";
import { Genre } from "./useGenres";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[]; // array of objects that have a platform property, shouldnt have been designed this way
  metacritic: number;
}

const useGames = (
  selectedGenre: Genre | null,
  selectedPlatfrom: Platform | null
) =>
  useData<Game>(
    "/games",
    { params: { 
      genres: selectedGenre?.id, 
      parent_platforms: selectedPlatfrom?.id 
    }},
    [selectedGenre?.id, selectedPlatfrom?.id]
  );

export default useGames;
