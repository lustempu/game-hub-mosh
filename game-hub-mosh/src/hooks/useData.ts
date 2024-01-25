import { AxiosRequestConfig, CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

interface FetchResponse <T>{
    count: number;
    results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {

    const [data, setData] = useState<T[]>([]); // to retrieve the games from the database (use generic type to make it reusable)
    const [error, setError] = useState(""); // to display an error message if the games cannot be retrieved
    const [isLoading, setLoading]= useState(false);  //to track the loading state for the gameCard skeleton


    //using effect hook to retrieve the data from the backened
    useEffect(() => {
        const controller = new AbortController();// to cancel the request if the component is unmounted
        setLoading(true);
      apiClient
        .get<FetchResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig})//signal property is used to cancel the request if the component is unmounted
        .then((response) => {setData(response.data.results);
        setLoading(false)})// here we will need to use an TS interface to define the shape of the response object
        .catch((error) => {
            if(error instanceof CanceledError) return;
           setError(error.message);
           setLoading(false);
        });
        return () => {// to cancel the request if the component is unmounted 
            controller.abort();
        }
    }, deps ? [...deps]: []);// array of dependecies to make sure that the effect is only run once and not on every re-render
  return {data, error, isLoading};
};


export default useData;