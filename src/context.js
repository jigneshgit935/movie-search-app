import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();
const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState();
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: 'false', msg: '' });
  const [query, setQuery] = useState('titanic');

  const getMovies = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === 'True') {
        setLoading(false);
        setIsError({
          show: true,
          msg: '',
        });
        setMovie(data.Search);
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 800);
    return () => clearTimeout(timeOut);
  }, [query]);
  return (
    <AppContext.Provider value={{ loading, movie, isError, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
