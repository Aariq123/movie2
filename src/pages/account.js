import { useContext, useEffect, useRef, useState } from 'react';
import { MainContext } from '../context/context';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { Button, Card, CardContent, CardMedia, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import useMediaQuery from '@mui/material/useMediaQuery';

const Account = () => {
    const { options } = useContext(MainContext)
    const [movies, setMovies] = useState([])
    const [showMovies, setShowMovies] = useState([])
    const [tv, setTv] = useState([])
    const [apiKey, setApiKey] = useState('')
    const matches = useMediaQuery('(max-width:640px)');


    const deleteOption = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
        }
    };

    const sessionOptions = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
        },
        body: JSON.stringify({ request_token: apiKey })
    }


    useEffect(() => {
        fetch('https://api.themoviedb.org/3/account/17109799/rated/movies?language=en-US&page=1&sort_by=created_at.asc', options)
            .then(response => response.json())
            .then(response => setMovies(response.results))

        fetch('https://api.themoviedb.org/3/account/17109799/rated/tv?language=en-US&page=1&sort_by=created_at.asc', options)
            .then(response => response.json())
            .then(response => setTv(response.results))

    }, [])


    const deleteRating = (type, id) => {
        fetch(`https://api.themoviedb.org/3/${type}/${id}/rating`, deleteOption)
            .then(response => response.json())
            .then(response => console.log(response))
    }

    const nigga2 = () => {
        if(sessionStorage.getItem('key')){
           const ligma = sessionStorage.getItem('key')
            const sessionOptions = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
                },
                body: JSON.stringify({request_token: ligma})
            }
    
            fetch('https://api.themoviedb.org/3/authentication/session/new', sessionOptions)
                .then(response => response.json())
                .then(response => console.log(response))
        
            }
    }

    const nigga = () => {
        fetch('https://api.themoviedb.org/3/authentication/token/new', options)
            .then(response => response.json())
            .then(response => {
                setApiKey(response.request_token)
                sessionStorage.setItem("key",response.request_token);
            })
    }

 

    return (
        <div className="py-10 px-4 sm:p-10 sm:p-20">
            <div>
                <Button onClick={nigga} variant='contained'>hehe</Button>
                <Button onClick={nigga2} variant='contained'>muhu</Button>
                {apiKey !== '' && <a href={`https://www.themoviedb.org/authenticate/${apiKey}`}>hoho</a>}

                <div>
                    <p>Login to your account:</p>
                    <form>
                        <div>
                        <label htmlFor="name">Username:</label>
                      
                        </div>
                        <div>
                        <label htmlFor="pass">Password:</label>
                     
                        </div>
                    </form>
                </div>
            </div>


            <div>
                <p className='text-center font-bold text-2xl m-6'>Your rated movies</p>
                {movies && movies.map(item => {
                    const { id, poster_path, name, vote_average, title, rating } = item
                    return (
                        <div key={id} className='hover:scale-x-95 my-6 search cursor-pointer'>

                            <Card sx={{
                                height: matches ? 100 : 200,
                                borderRadius: 5,
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: 1,
                                borderColor: "black"
                            }}>
                                <div className='flex items-center relative'>
                                    <Link to='/movie' state={{ id, media_type: 'movie' }}>
                                        <CardMedia sx={{ height: matches ? 100 : 200, width:matches ? 60 : 130 }} image={`https://image.tmdb.org/t/p/w200${poster_path}`}></CardMedia>
                                    </Link>
                                    <Link to='/movie' state={{ id, media_type: 'movie' }}>
                                        <div className='ml-2'>
                                            <p className='text-sm sm:text-base mb-2'>{name ? name : title}</p>
                                            <p className='text-xs sm:text-lg'><StarIcon sx={{ color: 'gold' }}></StarIcon>{vote_average.toFixed(1)}</p>

                                            <div className='mt-2'>
                                                <p className='text-xs sm:text-sm mb-2'>Your rating:</p>
                                                <Rating sx={{ border: 1, borderColor: 'white', borderRadius: 2 }} name="read-only" precision={0.5} value={rating / 2} readOnly />
                                            </div>
                                        </div>
                                    </Link>
                                    <div className='absolute right-4 bottom-2/4 translate-y-2/4'>
                                        <Button onClick={() => deleteRating('movie', id)} variant='contained' color='error'>Delete</Button>
                                    </div>
                                </div>

                            </Card>

                        </div>
                    )
                })}
            </div>

            <div>
                <p className='text-center font-bold text-2xl m-6'>Your rated tv shows</p>
                {tv && tv.map(item => {
                    const { id, poster_path, name, vote_average, title, rating } = item
                    return (
                        <div key={id} className='hover:scale-x-95 my-6 search cursor-pointer'>

                            <Card sx={{
                                height: 200,
                                borderRadius: 5,
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: 1,
                                borderColor: "black"
                            }}>
                                <div className='flex items-center relative'>
                                    <Link to='/movie' state={{ id, media_type: 'tv' }}>
                                        <CardMedia sx={{ height: 200, width: 130 }} image={`https://image.tmdb.org/t/p/w200${poster_path}`}></CardMedia>
                                    </Link>
                                    <Link to='/movie' state={{ id, media_type: 'tv' }}>
                                        <div className='ml-2'>
                                            <p className='mb-2'>{name ? name : title}</p>
                                            <p className='text-lg'><StarIcon sx={{ color: 'gold' }}></StarIcon>{vote_average.toFixed(1)}</p>

                                            <div className='mt-2'>
                                                <p className='mb-2'>Your rating:</p>
                                                <Rating sx={{ border: 1, borderColor: 'white', borderRadius: 2 }} name="read-only" precision={0.5} value={rating / 2} readOnly />
                                            </div>
                                        </div>
                                    </Link>
                                    <div className='absolute right-4 bottom-2/4 translate-y-2/4'>
                                        <Button onClick={() => deleteRating('tv', id)} variant='contained' color='error'>Delete</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Account;