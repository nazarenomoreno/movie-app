

function MovieList(props){      //props es un objeto SIEMPRE


    return(
        <>
            {props.movies.map((movie, index)=>{
               return (
                <div key={index} className="pelicula">
                    <img onClick={()=>props.funcion(props,index)} src={movie.Poster} alt={movie.Title} />
                </div>
            );
            })}
        </>
    );
}

export default MovieList
