import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { Genre } from "./hooks/useGenres";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import { Game, Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
}

function App() {
  // const [selectGenre, setSelectedGenre] = useState<Genre | null>(null); //data to share the state  between components (GenreList and GameGrid)
  // const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
  //   null
  // ); //data to share the state between components (PlatformSelector and GameGrid)

  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery); //data to share the state between components (PlatformSelector and GameGrid)

  return (
    <Grid
      templateAreas={{
        base: '"nav" " main"', //layout for small screens (mobile phones)
        lg: '"nav nav" "aside main"', //layout for large screens (1024px)
      }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5} borderBlock={1}>
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectGenres={(genre) => setGameQuery({ ...gameQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <HStack spacing={5} paddingLeft={2} marginBottom={5}>
          <PlatformSelector
            selectedPlatform={gameQuery.platform}
            onSelectPlatform={(platform) =>
              setGameQuery({ ...gameQuery, platform })
            }
          />
          <SortSelector />
        </HStack>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
