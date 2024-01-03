import { useContext, useEffect, useRef, useState } from 'react';
import { MainContext } from '../context/context';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { Button, Card, CardContent, CardMedia, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import useMediaQuery from '@mui/material/useMediaQuery';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const Account = () => {
    const { options, userData, setUserData, setCheckWatchlistMovies, setCheckWatchlistTv } = useContext(MainContext)
    const [movies, setMovies] = useState([])
    const [ratedMovies, setRatedMovies] = useState([])
    const [watchlistMovies, setWatchlistMovies] = useState([])
    const [tv, setTv] = useState([])
    const [ratedTv, setRatedTv] = useState([])
    const [watchlistTv, setWatchlistTv] = useState([])
    const matches = useMediaQuery('(max-width:640px)');
    const [form, setForm] = useState(false)
    const [signin, setSignin] = useState(true)
    const [showLogout, setShowLogout] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [alignment, setAlignment] = useState('rated');


    const handleChange = (e, newAlignment) => {
        setAlignment(newAlignment);
        if (newAlignment == 'rated') {
            setMovies(ratedMovies)
            setTv(ratedTv)
        } else {
            setMovies(watchlistMovies)
            setTv(watchlistTv)
        }
    };






    const deleteOption = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
        }
    };


    useEffect(() => {
        if (showLogout) {
            if(sessionStorage.getItem('session_id')){
                const id = JSON.parse(sessionStorage.getItem('session_id')).session_id


                fetch(`https://api.themoviedb.org/3/account/17109799/rated/movies?language=en-US&page=1&session_id=${id}&sort_by=created_at.asc`, options)
                    .then(response => response.json())
                    .then(response => setRatedMovies(response.results))
    
                fetch(`https://api.themoviedb.org/3/account/17109799/rated/tv?language=en-US&page=1&session_id=${id}&sort_by=created_at.asc`, options)
                    .then(response => response.json())
                    .then(response => setRatedTv(response.results))
    
                fetch(`https://api.themoviedb.org/3/account/17109799/watchlist/movies?language=en-US&page=1&session_id=${id}&sort_by=created_at.asc`, options)
                    .then(response => response.json())
                    .then(response => {
                        setWatchlistMovies(response.results)
                        setCheckWatchlistMovies(response.results)
                    })
    
                fetch(`https://api.themoviedb.org/3/account/17109799/watchlist/tv?language=en-US&page=1&session_id=${id}&sort_by=created_at.asc`, options)
                    .then(response => response.json())
                    .then(response => {
                        setWatchlistTv(response.results)
                        setCheckWatchlistTv(response.results)
                    })
            }
        }

    }, [showLogout])


    useEffect(() => {
        if (ratedMovies) {
            setMovies(ratedMovies)
            setTv(ratedTv)
        }else if(watchlistMovies){
            setMovies(watchlistMovies)
            setTv(watchlistTv)
        }
    }, [ratedMovies, ratedTv, watchlistMovies, watchlistTv])


    const deleteRating = (type, id) => {
        if (sessionStorage.getItem('session_id')) {
            const sessionId = JSON.parse(sessionStorage.getItem('session_id')).session_id
            if (movies == watchlistMovies) {
                const options = {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
                    },
                    body: JSON.stringify({ media_type: type, media_id: id, watchlist: false })
                };
                fetch(`https://api.themoviedb.org/3/account/17109799/watchlist?session_id=${sessionId}`, options)
                    .then(response => response.json())
            } else {
                fetch(`https://api.themoviedb.org/3/${type}/${id}/rating?session_id=${sessionId}`, deleteOption)
                    .then(response => response.json())
            }
        }
    }



    const nigga = () => {
        fetch('https://api.themoviedb.org/3/authentication/token/new', options)
            .then(response => response.json())
            .then(response => {
                if (sessionStorage.getItem('data') === null) {
                    sessionStorage.setItem('data', JSON.stringify({
                        request_token: response
                    }))
                }
            })
        setForm(true)
        setSignin(false)
    }




    useEffect(() => {
        if (sessionStorage.getItem('data') && !sessionStorage.getItem('session_id')) {
            setForm(true)
        } else if (sessionStorage.getItem('user') && sessionStorage.getItem('session_id')) {
            setForm(false)
        }

        if (form) {
            setSignin(false)
        } else if (!sessionStorage.getItem('data') && sessionStorage.getItem('session_id')) {
            setSignin(false)
        } else if (!sessionStorage.getItem('data') && !sessionStorage.getItem('session_id')) {
            setSignin(true)
        }

        if (!signin && !form) {
            setShowLogout(true)
        } else {
            setShowLogout(false)
        }

    }, [form, signin, showLogout])


    const goBack = () => {
        setForm(false)
        setSignin(true)
        sessionStorage.removeItem('data')
    }

    const login = () => {
        const ligma = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                request_token: JSON.parse(sessionStorage.getItem('data')).request_token.request_token
            })
        };


        fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login', ligma)
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    const sessionOptions = {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'content-type': 'application/json',
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
                        },
                        body: JSON.stringify({ request_token: JSON.parse(sessionStorage.getItem('data')).request_token.request_token })
                    }

                    sessionStorage.removeItem('data')

                    fetch('https://api.themoviedb.org/3/authentication/session/new', sessionOptions)
                        .then(response => response.json())
                        .then(response => {
                            sessionStorage.setItem('session_id', JSON.stringify({
                                session_id: response.session_id,
                            }))
                            getUserData(response)
                        })
                } else {
                    setLoginError(true)
                    setPassword('')
                    setUsername('')
                    setLoginErrorMessage(response.status_message)
                }
            })
        setShowLogout(true)
        setPassword('')
        setUsername('')
    }


    useEffect(() => {
        if (loginError) {
            setTimeout(() => setLoginError(false), 4000)
        }
    }, [loginError])


    const getUserData = (data) => {
        fetch(`https://api.themoviedb.org/3/account/17109799?session_id=${data.session_id}`, options)
            .then(response => response.json())
            .then(response => {
                sessionStorage.setItem('user', JSON.stringify(response))
                setUserData(response)
            }
            )
        setForm(false)
    }


    const logout = () => {
        const options = {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
            },
            body: JSON.stringify({ session_id: JSON.parse(sessionStorage.getItem('session_id')).session_id })
        };

        sessionStorage.removeItem('session_id')
        sessionStorage.removeItem('user')

        fetch('https://api.themoviedb.org/3/authentication/session', options)
            .then(response => response.json())

        setShowLogout(false)
        setUserData(null)
    }



    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-10 px-4 sm:p-10 sm:p-20 text-white">
            <div>
                <p className='text-lg sm:text-2xl text-center my-10'>Sign in to your account:</p>

                <div className={loginError ? 'bg-red-600 text-lg text-center px-6 py-4 rounded-lg mb-6' : 'hidden'}>
                    {loginErrorMessage}
                </div>

                <div className={signin ? 'text-center my-12' : 'hidden'}>
                    <Button onClick={nigga} sx={{ textTransform: 'capitalize', fontSize: 16 }} variant='contained'>Sign-In</Button>
                </div>

                <div className={signin ? 'text-base sm:text-lg text-center my-12' : 'hidden'}>
                    <p>If you have a tmdb account you can sign-in to your account here and stay in sync with it.</p>
                </div>

                <div className={signin ? 'text-base sm:text-lg text-center my-12' : 'hidden'}>
                    <p className='flex flex-col sm:flex-row justify-center items-center'>You can sign up to tmdb here:
                        <a className='text-teal-400 mt-2 sm:m-0' href='https://www.themoviedb.org/signup'>
                            <img width='120' src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'></img>
                        </a>
                    </p>
                </div>

                <div className={!form ? 'hidden' : 'border-2  flex flex-col items-center justify-center text-center rounded-2xl border-gray-900 shadow-2xl text-white py-4 px-2.5 sm:p-10'}>
                    <p className='text-center my-6 m-auto text-2xl text-cyan-500'>Login to your account:</p>
                    <form className='mt-6'>
                        <div className='flex flex-wrap items-center'>
                            <label htmlFor="name">Username:</label>
                            <div className='m-auto sm:ml-2 w-full sm:w-96'>
                                <TextField required sx={{ backgroundColor: 'white' }} fullWidth onChange={(e) => setUsername(e.target.value)} variant="outlined" />
                            </div>

                        </div>
                        <div className='flex flex-wrap items-center mt-4'>
                            <label htmlFor="pass">Password:</label>
                            <div className='m-auto sm:ml-2 w-full sm:w-96'>
                                <TextField required type="password" sx={{ backgroundColor: 'white' }} fullWidth onChange={(e) => setPassword(e.target.value)} variant="outlined" />
                            </div>
                        </div>
                    </form>

                    <Button sx={{ marginTop: 6 }} variant='contained' onClick={login}>Login</Button>
                </div>

                {form && <div className='text-center mt-10'><Button onClick={goBack} color='error' variant='contained'>Go back</Button></div>}

                {showLogout
                    &&
                    <div className='flex flex-col items-center my-16'>
                        <p className='text-green-500 mb-6 text-lg sm:text-3xl'>You're logged in</p>
                        <div className='my-6 flex flex-col items-center'>
                            <span className='mb-4 uppercase text-xl flex flex-col items-center justify-center h-14 w-14 bg-teal-400 rounded-full'>
                                {userData && userData.username.split('')[0]}
                            </span>
                            <span className='capitalize'>Welcum {userData && userData.username}</span>
                        </div>
                        <Button onClick={logout} variant='contained' color='error'>Log Out</Button>
                    </div>
                }
            </div>

            {
            userData && <div className='w-full'>
                <div>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        color='error'
                        sx={{border:1, borderColor:'white'}}
                    >
                        <ToggleButton sx={{color:'white', borderRight:1, borderColor:'white', fontSize: matches ? 12 : 16}} value="rated">Rated</ToggleButton>
                        <ToggleButton sx={{color:'white', fontSize: matches ? 12 : 16}} value="watchlist">Watchlist</ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div>
                    <p className='text-center font-bold text-2xl m-6'>{alignment === 'rated' ? 'Your Rated Movies:' : 'Your Movie Watchlist:'} </p>
                    {movies.length > 0 ? movies.map(item => {
                        const { id, poster_path, name, vote_average, title, rating } = item
                        return (
                            <div key={id} className='hover:scale-x-95 my-6 search cursor-pointer'>

                                <Card sx={{
                                    height: matches ? 120 : 200,
                                    borderRadius: matches ? 0 : 5,
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    border: 1,
                                    borderColor: "black"
                                }}>
                                    <div className='flex items-center relative'>
                                        <Link to={`/movie/${id}`} state={{ id, media_type: 'movie' }}>
                                            <CardMedia sx={{ height: matches ? 120 : 200, width: matches ? 60 : 130 }} image={`https://image.tmdb.org/t/p/w200${poster_path}`}></CardMedia>
                                        </Link>
                                        <Link to={`/movie/${id}`} state={{ id, media_type: 'movie' }}>
                                            <div className='ml-2'>
                                                <p className='text-sm sm:text-base mb-2'>{name ? name : title}</p>
                                                <p className='text-xs sm:text-lg'><StarIcon sx={{ color: 'gold' }}></StarIcon>{vote_average.toFixed(1)}</p>

                                                <div className={alignment == 'rated' ? 'mt-2' : 'hidden'}>
                                                    <p className='text-xs sm:text-sm mb-2'>Your rating:</p>
                                                    <Rating sx={{ border: 1, borderColor: 'white', borderRadius: 2 }} name="read-only" precision={0.5} value={rating / 2} readOnly />
                                                </div>
                                            </div>
                                        </Link>
                                        <div className='absolute right-1 sm:right-4 bottom-2/4 translate-y-2/4 z-10'>
                                            <Button onClick={() => deleteRating('movie', id)} variant='contained' color='error'>Delete</Button>
                                        </div>
                                    </div>

                                </Card>

                            </div>
                        )
                    }) : <p className='text-red-600 text-center'>No Movies</p>}
                </div>

                <div>
                    <p className='text-center font-bold text-2xl mt-20 m-6'>{alignment === 'rated' ? 'Your Rated TV-Shows:' : 'Your TV Watchlist:'} </p>
                    {tv.length > 0 ? tv.map(item => {
                        const { id, poster_path, name, vote_average, title, rating } = item
                        return (
                            <div key={id} className='hover:scale-x-95 my-6 search cursor-pointer'>

                                <Card sx={{
                                         height: matches ? 120 : 200,
                                         borderRadius: matches ? 0 : 5,
                                         backgroundColor: 'transparent',
                                         color: 'white',
                                         border: 1,
                                         borderColor: "black"
                                }}>
                                    <div className='flex items-center relative'>
                                        <Link to={`/movie/${id}`} state={{ id, media_type: 'tv' }}>
                                            <CardMedia sx={{height: matches ? 120 : 200, width: matches ? 60 : 130  }} image={`https://image.tmdb.org/t/p/w200${poster_path}`}></CardMedia>
                                        </Link>
                                        <Link to={`/movie/${id}`} state={{ id, media_type: 'tv' }}>
                                            <div className='ml-2'>
                                                <p className='text-sm sm:text-base mb-2'>{name ? name : title}</p>
                                                <p className='text-xs sm:text-lg'><StarIcon sx={{ color: 'gold' }}></StarIcon>{vote_average.toFixed(1)}</p>

                                                <div className={alignment == 'rated' ? 'mt-2' : 'hidden'}>
                                                    <p className='text-xs sm:text-sm mb-2'>Your rating:</p>
                                                    <Rating sx={{ border: 1, borderColor: 'white', borderRadius: 2 }} name="read-only" precision={0.5} value={rating / 2} readOnly />
                                                </div>
                                            </div>
                                        </Link>
                                        <div className='absolute right-1 sm:right-4 bottom-2/4 translate-y-2/4 z-10'>
                                            <Button onClick={() => deleteRating('tv', id)} variant='contained' color='error'>Delete</Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )
                    }) : <p className='text-red-600 text-center'>No TV-Shows</p>}
                </div>
            </div>
            }

        </div>
    );
}

export default Account;