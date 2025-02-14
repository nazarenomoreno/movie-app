import {useState, useEffect} from 'react';
import './App.css';

import MovieList from './components/MovieList';
import Header from './components/Header';
import { use } from 'react';


function App() {

  
  const [movies, setMovies] = useState([])
  
  
  const [busqueda, setBusqueda] = useState('Star+Wars')
  
  

const peliculasPredeterminadas = [        //esto se usará cuando el estado favorites es null o si esta vacio
    {                                          
      "Title": "Ghost World",                 
      "Year": "2001",
      "imdbID": "tt0162346",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNzQ4NmFmYzYtNGJmZi00NGNkLTk2YTktM2Q0MzQ5MWRlZGEyXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Yi Yi",
      "Year": "2000",
      "imdbID": "tt0244316",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNTAyMDQ5Y2MtZDk0NC00N2IyLWE5OTgtZjJkZWNlMDBhMDhlXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "A Brighter Summer Day",
      "Year": "1991",
      "imdbID": "tt0101985",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMGRkNGQwOTktNWQxOS00ZDRjLThmODktNWY4NThjNDU2MjM5XkEyXkFqcGc@._V1_SX300.jpg"
    }
  ]



  const [favorites, setFavorites] = useState(()=>{

    if (!localStorage.getItem('favorites')) {                  //si es null (el localStorage esta vacio) se llena 
      return peliculasPredeterminadas;            //es nulo cuando el estado nunca tuvo elementos o cuando se hace localStorage.clear()
    }
  

    //si hay elementos en el localStorage
    const traidasDeFavorites = JSON.parse(localStorage.getItem('favorites'));  //se convierte el JSON a un array de objetos
  

    
    return traidasDeFavorites.length > 0 ? traidasDeFavorites : peliculasPredeterminadas;  //si tiene al menos una pelicula
    ///si el array es vacío (si se eliminan las peliculas desde la pagina, el estado tiene un array vacio, no nulo), también usamos las películas predeterminadas
    

  })
  





  async function getMovieRequest(){


    const url = `https://www.omdbapi.com/?s=${busqueda}&apikey=5e56e43`


    try{
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);   // si la solicitud es falsa (no fue exitosa)
      //  throw interrumpe la ejecución del código y crea una nueva instancia de Error


      const data = await response.json();

      

      //console.log(data);    

      setMovies(data.Search || []);       //si es null, se seteará el estado con un array vacio
      
    }
    catch(error){
      console.error("Hubo un error en la solicitud:", error);
    }
  }
  





  useEffect(()=>{
    getMovieRequest(busqueda);
    console.log('nueva busqueda: ', busqueda)
  },[busqueda])


  useEffect(()=>{                                                   //cada vez que cambie el estado favorites
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },[favorites])
 


  
  function addMovie(props,index){       // al hacer click en una pelicula
    console.log(props.movies[index].Title)

    const moviePick = props.movies[index].Title        //pelicula seleccionada

    const verification= props.favorites.every(element => element.Title !== moviePick);   //si todos los elementos son diferentes de moviePick, devuelve un TRUE. el every devuelve un TRUE siempre que se haya cumplido la condicion. si la condición no se cumple una vez, es FALSE


    if(verification){
      console.log(`esta pelicula ${moviePick}, no se encuentra en la lista`)
      props.setFavorites([...props.favorites, props.movies[index]])    //traemos lo que ya tenemos y añadimos lo nuevo
    }else{
      alert('ESA PELICULA YA SE ENCUENTRA EN FAVORITAS!');
    }
  }




  function removeMovie(props, index){
    console.log(props.movies[index].Title)
    const newFavorites = props.movies.filter( (element, i) => i !== index );      //crea un nuevo array exepto la pelicula del index


    props.setFavorites(newFavorites);                //actualiza el estado con el nuevo array
  }



  return (
    <>
        <div className='contenedor-principal'>

            <Header  titulo={'Resultados (haz click para agregar a favoritas)'}  showInput={true} value={busqueda} setValue={setBusqueda}/>

            <div className='row'>
                <MovieList movies={movies} favorites={favorites} setFavorites={setFavorites} funcion={addMovie}/>
            </div>

            <Header  titulo={'Favoritas (haz click para eliminar de favoritas)'}  showInput={false} />

            <div className='row'>
                <MovieList movies={favorites} setFavorites={setFavorites} funcion={removeMovie}/>
            </div>
          
        </div>
    </>
  )
}

export default App
