import { GameQuery } from "../App";
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
  gameQuery: GameQuery
) =>
  useData<Game>(
    "/games",
    {
      params: { 
         genres: gameQuery.genre?.id, 
         parent_platforms: gameQuery.platform?.id,
         ordering: gameQuery.sortOrder
    }},
    [gameQuery]
  );

export default useGames;


