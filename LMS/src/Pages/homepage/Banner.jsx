import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import axios from "axios"

export default function Banner() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      const res = await axios.get("/api/genres");
      setGenres(res.data);
    }
    getGenres();
  }, []);

  const searchOnChange = (event) => {
    setSearch(event.target.value)
    navigate(`/?search=${event.target.value}&genre=${selectedGenre}`);
  }

  // handling navigate path when selectedGenre changes
  useEffect(() => {
    if (selectedGenre === "") {
      navigate(`/?search=${search}&genre=`);
    } else {
      navigate(`/?search=${search}&genre=${selectedGenre}`);
    }
  }, [selectedGenre]);


  const genreButtonClicked = (event) => {
    const genreName = event.target.value;
    if (genreName === selectedGenre) { // deselect filter
      setSelectedGenre("");
      return;
    }
    setSelectedGenre(genreName);
  }

  return (
    <div className='banner'>
      <h1>Find your next book</h1>

      <div className='search-bar'>
        <div className='search-section'>
          <input type="text" placeholder="Search book/author" value={search} onChange={searchOnChange} />
        </div>

        <div className='filter-section'>
          {
            genres.map((genre) => {
              return (
                <button 
                key={genre.id} 
                className='filter-tag' 
                value={genre.genre_name} 
                onClick={genreButtonClicked}
                style={{ 
                  backgroundColor: (genre.genre_name === selectedGenre) ? 'lightblue' : 'white',
                }}>
                  {genre.genre_name}
                </button>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
