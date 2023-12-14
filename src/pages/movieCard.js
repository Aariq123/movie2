import { Card, CardMedia } from '@mui/material';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';

import useMediaQuery from '@mui/material/useMediaQuery';

const MovieCard = ({movie, mediaType}) => {
    const { id, title, name, release_date, vote_average, poster_path, first_air_date, media_type } = movie
    const matches = useMediaQuery('(max-width:640px)');
    

    return ( 
        <div className='mx-1 sm:mx-2 '>
        <Link to={`/movie/${id}`}state={{ id, media_type: mediaType? mediaType : media_type }}>
            <Card sx={{
                width:matches ? 120 : 180,
                minHeight: matches ? 180 : 250,
                backgroundColor: 'transparent',
                boxShadow: 'none',

            }}>

                <CardMedia sx={{
                    height:  matches ? 180 : 250,
                    width:matches ? 120 : 180,
                    color: 'white',
                    border: 1,
                    borderColor: 'white',
                    borderRadius: 5,
                }}
                    image={`https://image.tmdb.org/t/p/w200${poster_path}`}>
                </CardMedia>
                <p className='flex items-center text-white mt-1 text-base sm:text-lg'><StarIcon sx={{ color: 'gold' }}></StarIcon>{vote_average.toFixed(1)}</p>
                <p className='text-sm sm:text-base text-white m-1 mb-0'>{name ? name : title}</p>
                <p className='text-white text-xs sm:text-sm m-1 mt-0 mb-0'>{release_date ? release_date : first_air_date}</p>
            </Card>
        </Link>
    </div>
    );
}
 
export default MovieCard;
