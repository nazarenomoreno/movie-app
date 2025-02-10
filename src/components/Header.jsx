


function Header(props){

    function mostrarInput(){
        if(props.showInput===true){
            return <input type='text' placeholder='Buscar pelicula o serie' onChange={cambiarValor}></input>
        }
    }
    
    function cambiarValor(event){
       props.setValue(event.target.value)
       
    }
    

    return(
        <>
            <div className="encabezado">
                <h3>{props.titulo}</h3>

                <div>{mostrarInput()}</div>
            </div>
        
        </>
    );


    
}

export default Header