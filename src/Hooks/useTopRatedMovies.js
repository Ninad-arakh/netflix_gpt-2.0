import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addTopRatedMovies } from "../Utils/MovieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json?.results));
  };
  useEffect(() => {
    getMovieVideo();
  }, []);
};

export default useTopRatedMovies;
