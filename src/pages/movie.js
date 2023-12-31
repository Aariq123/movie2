import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainContext } from "../context/context";
import PersonCard from "./personCard";
import MovieCard from "./movieCard";
import StarIcon from '@mui/icons-material/Star';
import { Card } from '@mui/material';
import { Button } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Rating from '@mui/material/Rating';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


const Movie = () => {
    const location = useLocation()
    const { id, media_type } = location.state
    const [movie, setMovie] = useState()
    const { options, postOptions, userData, checkWatchlistMovies, checkWatchlistTv } = useContext(MainContext)
    const [credits, setCredits] = useState([])
    const [recommendations, setRecommendations] = useState()
    const [reviews, setReviews] = useState([])
    const [images, setImages] = useState([])
    const [slice, setSlice] = useState(false)
    const [ratingDiv, setRatingDiv] = useState(false)
    const [imagesOption, setImagesOption] = useState()
    const [ratingMessageShow, setRatingMessageShow] = useState(false)
    const [bookmark, setBookmark] = useState(false)
    const [ratingMessage, setRatingMessage] = useState([])
    const [img, setImg] = useState('')
    const [imgNum, setImgNum] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/${media_type ? media_type + '/' : ''}${id}?append_to_response=reviews,credits,images,recommendations`, options)
            .then(response => response.json())
            .then(response => {
                setLoading(false)
                setLoadError(false)
                setMovie(response)
                setCredits(response.credits.cast)
                setRecommendations(response.recommendations.results)
                setReviews(response.reviews.results)
                setImages(response.images)
                setImagesOption(response.images.backdrops)
            }).catch(hehe => {
                setLoading(false)
                setLoadError(true)
            })
    }, [id])


    useEffect(() => {
        if (media_type == 'movie') {
            if (checkWatchlistMovies) {
                checkWatchlistMovies.forEach(element => {
                    if (element.id == id) {
                        setBookmark(true)
                    }
                });
            }
        } else {
            if (checkWatchlistTv) {
                checkWatchlistTv.forEach(element => {
                    if (element.id == id) {
                        setBookmark(true)
                    }
                });
            }
        }
    }, [checkWatchlistMovies, media_type])


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


    const watchLater = () => {
        if (userData && sessionStorage.getItem('session_id')) {
            setRatingMessage(['Loading', "text-yellow-500"])
            setRatingMessageShow(true)
            const sessionId = JSON.parse(sessionStorage.getItem('session_id')).session_id
            postOptions.body = JSON.stringify({ media_type: media_type, media_id: id, watchlist: true })

            fetch(`https://api.themoviedb.org/3/account/17109799/watchlist?session_id=${sessionId}`, postOptions)
                .then(response => response.json())
            setBookmark(true)
            setRatingMessageShow(true)
            setRatingMessage(["Saved to watch later", 'text-green-500'])
        } else {
            setRatingMessageShow(true)

            setRatingMessage(["You're not logged in", 'text-red-500'])
        }
    }


    const removeWatchLater = () => {
        if (bookmark) {
            const sessionId = JSON.parse(sessionStorage.getItem('session_id')).session_id
            setRatingMessage(['Loading', "text-yellow-500"])
            setRatingMessageShow(true)
            postOptions.body = JSON.stringify({ media_type: media_type, media_id: id, watchlist: false })

            fetch(`https://api.themoviedb.org/3/account/17109799/watchlist?session_id=${sessionId}`, postOptions)
                .then(response => response.json())

            setBookmark(false)
            setRatingMessageShow(true)
            setRatingMessage(["Removed from watch later", 'text-red-500'])
        }
    }


    const sendRating = (value) => {
        setRatingMessage(['Loading', "text-yellow-500"])
        setRatingMessageShow(true)
        if (userData && sessionStorage.getItem('session_id')) {
            const sessionId = JSON.parse(sessionStorage.getItem('session_id')).session_id
            postOptions.body = JSON.stringify({ value: value * 2 })
            if (value > 0) {
                fetch(`https://api.themoviedb.org/3/${media_type}/${id}/rating?session_id=${sessionId}`, postOptions)
                    .then(response => response.json())
                    .then(response => {
                        if (response.status_message == 'Success.') {
                            setRatingMessage(['Rating has been saved', "text-green-500"])
                        }
                        else if (response.status_message == 'The item/record was updated successfully.') {
                            setRatingMessage(['Rating has been updated', "text-green-500"])
                        }
                        setRatingMessageShow(true)
                    })
            }
        } else {
            setRatingMessageShow(true)
            setRatingMessage(["You're not logged in", 'text-red-500'])
        }

    }


    useEffect(() => {
        if (ratingMessageShow) {
            setTimeout(() => setRatingMessageShow(false), 4000)
        }
    }, [ratingMessageShow])


    const expandImage = (hehe) => {
        setImg(`https://image.tmdb.org/t/p/original${hehe}`)
    }

    const exitImage = (e) => {
        if (img !== '') {
            if (!e.target.className.includes('image')) {
                setImg('')
            }
        }
    }

    const prevImg = () => {
        setImgNum(imgNum - 1)
        setImg(`https://image.tmdb.org/t/p/original${imagesOption[imgNum].file_path}`)
    }

    const nextImg = () => {
        setImgNum(imgNum + 1)
        setImg(`https://image.tmdb.org/t/p/original${imagesOption[imgNum].file_path}`)
    }

    console.log(imgNum)
    console.log(img)


    return (
        <div className="bg-neutral-800 mb-40"
            onClick={(e) => {
                closeRating(e)
                exitImage(e)
            }}
        >
            <div className={loading ? "h-screen flex flex-col items-center justify-center" : 'hidden'}>
                <p className="text-3xl">Loading....</p>
            </div>
            <div className={loadError ? "h-screen flex flex-col items-center justify-center" : 'hidden'}>
                <p className="text-3xl my-2 text-red-700">Sorry,</p>
                <p className="text-3xl text-yellow-500">Server responded with an error.</p>
            </div>
            {movie &&
                <div className={img == '' ? "pt-20 relative" : "blur-md pt-20 relative"}>
                    <div className="relative w-screen overflow-hidden flex flex-col sm:flex-row items-center">
                        <div className={ratingMessageShow ? 'text-center text-2xl px-12 py-6 z-20 bg-white rounded-lg absolute top-96 sm:top-28 right-0 transition-all duration-500' : 'px-10 py-6  top-96 sm:top-28 absolute right-[-100%] transition-all duration-800'}>
                            <p className={ratingMessage[1]}>{ratingMessage[0]}</p>
                        </div>
                        {<img className="absolute backdrop z-0 top-0 right-0 opacity-30" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt=""></img>
                        }
                        <img className=" scale-75 sm:scale-100 sm:m-16 z-10 rounded-lg" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}></img>
                        <div className="px-4 pb-2 sm:p-0 z-10 sm:mx-6">
                            <p className="m-0 sm:my-4 text-lg sm:text-3xl font-bold">{movie.title}</p>
                            <div className="my-2 ligma flex relative items-center">
                                <Button onClick={() => setRatingDiv(true)} sx={{ color: 'white', fontSize: 18 }}>
                                    <StarIcon sx={{ color: 'gold' }}></StarIcon>{movie.vote_average.toFixed(1)}
                                </Button>

                                <div className={bookmark ? "hidden" : "ml-2 hover:cursor-pointer"} onClick={watchLater}>
                                    <BookmarkBorderIcon sx={{ height: 65, width: 30 }}></BookmarkBorderIcon>
                                </div>

                                <div className={!bookmark ? "hidden" : "ml-2 hover:cursor-pointer"} onClick={removeWatchLater}>
                                    <BookmarkIcon sx={{ height: 65, width: 30 }}></BookmarkIcon>
                                </div>

                                <span className={ratingDiv ? 'absolute left-24 rounded-lg bg-gray-500 flex p-2 items-center' : 'hidden'}>
                                    <Rating onChange={(e) => sendRating(e.target.value)} name="half-rating" precision={0.5} />
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
                            {imagesOption && imagesOption.map((image, i) => {

                                return (
                                    <img onClick={() => {
                                        expandImage(image.file_path)
                                        setImgNum(i+1)
                                    }} className="hover:cursor-pointer max-h-80" src={`https://image.tmdb.org/t/p/w300${image.file_path}`}></img>
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

                    <div className="mx-2 sm:mx-10 mt-20 my-6 m-auto">
                        <p className="text-lg sm:text-2xl my-4">More like this:</p>
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
            <div className={img !== '' ? "fixed top-0 left-0 flex flex-col justify-center items-center z-20 h-full w-full font-extrabold " : 'hidden'}>
                <button onClick={prevImg} className="image absolute top-1/2 left-2 z-30 rounded-full border-2 border-white h-12 w-12">
                    {'<'}
                </button>
                <img className="blur-none image w-screen sm:w-9/12 md:w-8/12 z-20" src={img !== '' ? img : ''} alt="" />
                <button onClick={nextImg} className="image absolute top-1/2 right-2 z-30 rounded-full border-2 border-white h-12 w-12">
                    {'>'}
                </button>
            </div>

        </div>
    );
}

export default Movie;