import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainContext } from "../context/context";
import PersonCard from "./personCard";
import MovieCard from "./movieCard";
import StarIcon from '@mui/icons-material/Star';
import { Card, CardMedia } from '@mui/material';
import { Button } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Rating from '@mui/material/Rating';

const Movie = () => {
    const location = useLocation()
    const { id, media_type } = location.state
    const [movie, setMovie] = useState()
    const { options } = useContext(MainContext)
    const [credits, setCredits] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [reviews, setReviews] = useState([])
    const [videos, setVideos] = useState([])
    const [images, setImages] = useState([])
    const [slice, setSlice] = useState(false)
    const [ratingDiv, setRatingDiv] = useState(false)
    const [rating, setRating] = useState(0)
    const [imagesOption, setImagesOption] = useState()




    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${media_type ? media_type + '/' : ''}${id}?append_to_response=reviews,credits,images,recommendations`, options)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
                setCredits(response.credits.cast)
                setRecommendations(response.recommendations.results)
                setReviews(response.reviews.results)
                setImages(response.images)
                setImagesOption(response.images.backdrops)
            })
    }, [id])

    console.log(movie)


    const children = [
        <ToggleButton sx={{ color: 'white', borderRight: 1 }} value="backdrops" key='Backdrops'>
            Backdrops
        </ToggleButton>,
        <ToggleButton sx={{ color: 'white' }} value="posters" key='Posters'>
            Posters
        </ToggleButton>,
    ];

    const handleChange = (e, ghe) => {
        setImagesOption(images[ghe])
    };

    const closeRating = (hoho) => {
        if (ratingDiv == true) {
            if (!hoho.target.className.includes('ligma')) {
                setRatingDiv(false)
            }
        }
    }

    useEffect(() => {
        if (rating > 0) {
            fetch(`https://api.themoviedb.org/3/${media_type}/${id}/rating`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
                },
                body: `{"value":${rating * 2}}`
            })
                .then(response => response.json())
                .then(response => console.log(response))
        }
    }, [rating])



   
   
    return (
        <div className="bg-neutral-800" onClick={(e) => closeRating(e)}>
            {movie &&
                <div className="pt-20">
                    <div className="relative w-screen overflow-hidden flex flex-col sm:flex-row items-center">
                        {<img className="absolute backdrop z-0 top-0 right-0 opacity-30" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt=""></img>
                        }
                        <img className=" scale-75 sm:scale-100 sm:m-16 z-10 rounded-lg" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}></img>
                        <div className="px-4 pb-2 sm:p-0 z-10 sm:mx-6">
                            <p className="m-0 sm:my-4 text-lg sm:text-3xl font-bold">{movie.title}</p>
                            <div className="my-2 ligma flex relative items-center">
                                <Button onClick={() => setRatingDiv(true)} sx={{ color: 'white', fontSize: 18 }}>
                                    <StarIcon sx={{ color: 'gold' }}></StarIcon>{movie.vote_average.toFixed(1)}
                                </Button>
                                <span className={ratingDiv ? 'absolute left-24 rounded-lg bg-gray-500 flex p-2 items-center' : 'hidden'}>
                                    <Rating onChange={(e) => setRating(e.target.value)} name="half-rating" precision={0.5} />
                                </span>
                            </div>
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

                    <div className="mt-10 md:m-0 md:flex justify-between items-center p-4 sm:p-8">
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
                        <div className="mt-16 md:m-0">
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


                    <div className="mx-4 sm:mx-10 my-16">
                        <div>
                            <p className="font-bold text-2xl">Images</p>
                            <div className="flex my-6">
                                <ToggleButtonGroup exclusive onChange={handleChange} sx={{ backgroundColor: 'rgb(38, 38, 38)', border: 1, borderRadius: 20 }} size="small" aria-label="Small sizes">
                                    {children}
                                </ToggleButtonGroup>
                            </div>
                        </div>

                        <div className="flex overflow-x-scroll">
                            {imagesOption && imagesOption.map(image => {

                                return (
                                    <img className="max-h-80" src={`https://image.tmdb.org/t/p/w300${image.file_path}`}></img>
                                )
                            })}
                        </div>
                    </div>



                





                        <div className="mx-4 sm:mx-10 my-16">
                            <p className="text-2xl my-4">Reviews</p>
                            {reviews.length > 0 &&
                                <div>
                                    <div>
                                        <Card sx={{
                                            minheight: 200,
                                            padding: 2,
                                            borderRadius: 5,
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                            border: 1,
                                            borderColor: "black"
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

                        <div className="mx-1 sm:mx-10 my-6 m-auto">
                            <p className="text-2xl my-4">More like this:</p>
                            <div className="flex overflow-x-scroll">
                                {recommendations && recommendations.map(movie => {

                                    return (
                                        <MovieCard movie={movie} mediaType={movie.media_type} key={movie.id}></MovieCard>
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