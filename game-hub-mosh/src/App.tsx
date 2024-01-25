import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { Genre } from "./hooks/useGenres";
import { useState } from "react";

function App() {
  const [selectGenre, setSelectedGenre] = useState<Genre | null>(null); //data to share the state  between components (GenreList and GameGrid)
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
          <GenreList onSelectGenres={(genre) => setSelectedGenre(genre)} />
        </GridItem>
      </Show>
      <GridItem area="main">
        <GameGrid selectedGenre={selectGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;
