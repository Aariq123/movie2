import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainContext } from "../context/context";
import PersonCard from "./personCard";
import MovieCard from "./movieCard";
import StarIcon from '@mui/icons-material/Star';
import { Card, CardMedia } from '@mui/material';
import { Button } from "@mui/material";

const Movie = () => {
    const location = useLocation()
    const { id } = location.state
    const [movie, setMovie] = useState()
    const { options } = useContext(MainContext)
    const [credits, setCredits] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [reviews, setReviews] = useState([])
    const [slice, setSlice] = useState(false)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setMovie(response))

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(response => setCredits(response.cast))


        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setRecommendations(response.results))

        fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setReviews(response.results))
    }, [])



    return (
        <div className="bg-neutral-800">
            {movie &&
                <div className="pt-20">
                    <div className="relative w-screen overflow-hidden flex flex-col sm:flex-row items-center">
                        {<img className="absolute backdrop z-0 top-0 right-0 opacity-30" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt=""></img>
                        }
                        <img className=" scale-75 sm:scale-100 sm:m-16 z-10 rounded-lg" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}></img>
                        <div className="px-4 pb-2 sm:p-0 z-10 sm:mx-6">
                            <p className="m-0 sm:my-4 text-lg sm:text-3xl font-bold">{movie.title}</p>
                            <p className="my-2 flex items-center"><StarIcon sx={{ color: 'gold' }}></StarIcon>{movie.vote_average.toFixed(1)}</p>
                            <div className="flex">{movie.genres.map(genre => {
                                return <p key={genre.id}>{genre.name},</p>
                            })}
                            </div>
                            <p className="my-2">{movie.release_date}</p>
                            <p>{Math.round(movie.runtime / 60)} hour</p>
                            <p className="italic text-slate-400">{movie.tagline}</p>
                            <p className="sm:text-lg font-bold my-2">Overview</p>
                            <p className="text-sm sm:text-base">{movie.overview}</p>
                        </div>
                    </div>

                    <div className="md:flex justify-between items-center p-4 sm:p-8">
                        <div className="md:w-9/12">
                            <p className="text-lg my-4">Top billed cast</p>
                            <div className="overflow-x-scroll flex">
                                {credits && credits.map(item => {
                                    return (
                                        <PersonCard key={item.key} item={item}></PersonCard>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="mt-6 md:m-0">
                            <p className="text-lg">Status</p>
                            <p className="text-slate-400 mb-2">{movie.status}</p>

                            <p className="text-lg">Original Language</p>
                            <p className="text-slate-400 mb-2">{movie.original_language}</p>

                            <p className="text-lg">Budget</p>
                            <p className="text-slate-400 mb-2">${movie.budget}</p>

                            <p className="text-lg">Revenue</p>
                            <p className="text-slate-400 mb-2">${movie.revenue}</p>
                        </div>
                    </div>

                    <div className="mx-4 sm:mx-10 my-10">
                        <p className="text-2xl my-4">Reviews</p>
                        {reviews.length > 0 && 
                        <div>
                        <div>
                            <Card sx={{
                                minheight:200,
                                padding:2,
                                borderRadius:5,
                                backgroundColor: 'transparent',
                                color:'white',
                                border:1,
                                borderColor:"black"
                            }}>
                                <p>A review by{reviews[0].author_details.name}</p>
                                <p className='flex items-center m-1'><StarIcon sx={{ color: 'gold' }}></StarIcon>{reviews[0].author_details.rating}</p>
                                <p>{reviews[0].created_at}</p>
                                <p>{slice ? reviews[0].content : reviews[0].content.split('').slice(0, 200).join('') + '...'}</p>
                                <Button variant="text" onClick={() => setSlice(true)}>Read More</Button>
                            </Card>
                        </div>
                        <div className="my-4"><Link to='/allreviews' state={reviews}><p className="underline">Read all reviews</p></Link></div>
                        </div>
}
                    </div>

                    <div className="mx-4 sm:mx-10 my-6 m-auto">
                        <p className="text-2xl my-4">More like this:</p>
                        <div className="flex overflow-x-scroll">
                            {recommendations && recommendations.map(movie => {

                                return (
                                    <MovieCard key={movie.key} movie={movie}></MovieCard>
                                )
                            })}
                        </div>
                    </div>
                </div>

            }
        </div>
    );
}

export default Movie;