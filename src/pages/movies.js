import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainContext } from "../context/context";
import MovieCard from "./movieCard";

const Movies = () => {
    const location = useLocation()
    const { options, setMobileMenu, setMenuOpen } = useContext(MainContext)
    const [ list, setList ] = useState()
    const { menuName, item } = location.state


    useEffect(() => {
        if(item == 'Now playing'){
            fetch(`https://api.themoviedb.org/3/${menuName}/now_playing?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setList(response.results)) 
        }else if(item == 'Top rated'){
            fetch(`https://api.themoviedb.org/3/${menuName}/top_rated?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setList(response.results)) 
        }else if(item == 'On TV'){
            fetch(`https://api.themoviedb.org/3/${menuName}/on_the_air?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setList(response.results)) 
        }else if(item == 'Airing today'){
            fetch(`https://api.themoviedb.org/3/${menuName}/airing_today?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setList(response.results)) 
        }else{
            fetch(`https://api.themoviedb.org/3/${menuName}/${item.toLowerCase()}?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setList(response.results)) 
        }
    }, [menuName, item]) 


   
    useEffect(()=>{
        setMobileMenu(false)
        setMenuOpen(false)
    },[location.state.menuName, location.state.item])

    
    return (
        <div className="py-10 sm:px-4 sm:p-10 sm:p-20">
         <p className="text-center text-lg font-bold my-10 sm:text-2xl sm:m-6">{item} in {menuName}</p>
        <div className="flex flex-wrap justify-evenly">{list ? list.map(movie => {
            
            return (
                <div className="sm:mb-4" key={movie.id}><MovieCard movie={movie} mediaType={menuName}></MovieCard> </div>
            )
        }) : <div className="text-2xl text-center my-10">Sorry, an unknown error occured</div>

        }</div>
        </div>
    );
}

export default Movies;