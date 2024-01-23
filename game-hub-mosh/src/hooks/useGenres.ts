import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { Game } from "./useGames";

interface Genre{
    id: number;
    name: string;
}

interface FetchGenreResponse{
    count: number;
    results: Genre[];
}

const useGenres = () => {

    const [genres, setGenres] = useState<Genre[]>([]); // to retrieve the games from the database
    const [error, setError] = useState(""); // to display an error message if the games cannot be retrieved
  //to track the loading state for the gameCard skeleton
    const [isLoading, setLoading]= useState(false);

    //using effect hook to retrieve the games from the backened
    useEffect(() => {
        const controller = new AbortController();// to cancel the request if the component is unmounted
        setLoading(true);
      apiClient
        .get<FetchGenreResponse>("/genres", {signal: controller.signal})//signal property is used to cancel the request if the component is unmounted
        .then((response) => {setGenres(response.data.results);
        setLoading(false)})// here we will need to use an TS interface to define the shape of the response object
        .catch((error) => {
            if(error instanceof CanceledError) return;
           setError(error.message);
           setLoading(false);
        });
        return () => {// to cancel the request if the component is unmounted 
            controller.abort();
        }
    }, []);// array of dependecies to make sure that the effect is only run once and not on every re-render
  return {genres, error, isLoading};
};


export default useGenres;