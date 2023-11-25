import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardMedia } from "@mui/material";
const SearchResults = () => {
    const location = useLocation()
    const { list, search } = location.state

    return ( 
        <div className="p-10 sm:p-20">
        <p className="text-center font-bold text-2xl m-10">All results for '{search}'</p>
       <div className="flex flex-wrap justify-evenly">{list ? list.map(movie => {
           const { poster_path, name, id, title } = movie
           return (
               <div className='m-2' key={id}>
                   <Link to='/movie2/movie' state={{ id }}>
                       <Card sx={{
                           width: 180,
                           minHeight: 250,
                           backgroundColor: 'transparent',
                           boxShadow: 'none',

                       }}>

                           <CardMedia sx={{
                               height: 250,
                               width: 180,
                               color: 'white',
                               border: 1,
                               borderColor: 'white',
                               borderRadius: 5,
                           }}
                               image={`https://image.tmdb.org/t/p/w200${poster_path}`}>
                           </CardMedia>
                           <p className='text-md text-white m-2'>{name ? name : title}</p>
                       </Card>
                   </Link>
               </div>
           )
       }) : <div className="text-2xl text-center my-10">Sorry, an unknown error occured</div>

       }</div>
       </div>
     );
}
 
export default SearchResults;