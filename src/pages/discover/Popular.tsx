import { useEffect, useState } from "react";
import { axiosClient } from "../../utils/axios";
import MovieList from "../../components/movie-list/MovieList";
import { Movie } from "../../types/movies";
import { useStore } from "../../store/store";
import { CanceledError } from "axios";
import MovieLayout from "../../components/movie-layout/MovieLayout";

const Popular = () => {
  const { config } = useStore();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovies = async () => {
      setIsLoadingMovies(true);

      try {
        const resp = await axiosClient.get<{ results: Movie[] }>(
          "/movie/popular",
          { signal }
        );
        setMovies(resp.data.results);
      } catch (err) {
        if (!(err instanceof CanceledError)) {
          setError(err as Error);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoadingMovies(false);
        }
      }
    };

    fetchMovies().catch(console.error);

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoadingMovies) {
    return null;
  }

  if (error !== null) {
    return <div>Oops...Something went wrong</div>;
  }

  console.log(movies);

  return (
    <MovieLayout>
      <MovieList movies={movies} baseUrl={config.baseUrl} label="Popular" />
    </MovieLayout>
  );
};

export default Popular;
