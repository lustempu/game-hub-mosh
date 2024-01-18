import { useState, useEffect, } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform{
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];// this is an array of objects that have a platform property, shouldnt have been designed this way
  }
  
  interface FetchGamesResponse {
    count: number;
    results: Game[];
  }

const useGames= () => {
    const [games, setGames] = useState<Game[]>([]); // to retrieve the games from the database
    const [error, setError] = useState(""); // to display an error message if the games cannot be retrieved
  
    //using effect hook to retrieve the games from the backened
    useEffect(() => {
        const controller = new AbortController();// to cancel the request if the component is unmounted

      apiClient
        .get<FetchGamesResponse>("/games", {signal: controller.signal})//signal property is used to cancel the request if the component is unmounted
        .then((response) => {
          setGames(response.data.results); // here we will need to use an TS interface to define the shape of the response object
        })
        .catch((error) => {
            if(error instanceof CanceledError) return;
          {setError(error.message)};
        });
        return () => {// to cancel the request if the component is unmounted 
            controller.abort();
        }
    }, []);// array of dependecies to make sure that the effect is only run once and not on every re-render
  return {games, error};
} 


export default useGames;
