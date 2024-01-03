import { Button, Card, CardContent, CardMedia, TextField } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { MainContext } from '../context/context';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import EastIcon from '@mui/icons-material/East';
import MovieCard from './movieCard';

const Home = () => {
    const { options } = useContext(MainContext)
    const [trending, setTrending] = useState([])
    const [popular, setPopular] = useState([])
    const [leftDiv, setLeftDiv] = useState(1)
    const [rightDiv, setRightDiv] = useState(1)
    const [bgImg, setBgImg] = useState(0)
    const [search, setSearch] = useState('')
    const [openSearch, setOpenSearch] = useState(false)
    const [searchArrFull, setSearchArrFull] = useState([])
    const [searchArr, setSearchArr] = useState()
    const leftRef = useRef(null)
    const rightRef = useRef(null)
    const bgRef = useRef(null)
    const deviceRef = useRef(null)
    const [ displayWidth, setDisplayWidth] = useState('')

    const children = [
        <ToggleButton sx={{ color: 'white', borderRight: 1 }} value="week" key='this week'>
            This Week
        </ToggleButton>,
        <ToggleButton sx={{ color: 'white' }} value="day" key='today'>
            Today
        </ToggleButton>,
    ];

    const handleChange = (e, ghe) => {
        fetch(`https://api.themoviedb.org/3/trending/movie/${ghe}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setTrending(response.results))
        
    };




    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setPopular(response.results))
        fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, options)
            .then(response => response.json())
            .then(response => setTrending(response.results))
    }, [])


    useEffect(() => {
        if (search !== '') {
            setOpenSearch(true)
            fetch(`https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1`, options)
                .then(response => response.json())
                .then(response => setSearchArrFull(response.results))
            setSearchArr(searchArrFull.slice(0, 5))
        }
    }, [search])



    const design1 = () => {
        if (leftRef.current) {
            leftRef.current.childNodes.forEach(item => item.className = 'text-lg sm:text-3xl flex flex-col justify-center items-center h-full text-center absolute')

            if (leftDiv == 0) {
                leftRef.current.children[leftDiv].classList.add('current')
                leftRef.current.children[leftDiv + 1].classList.add('next')
                leftRef.current.children[leftDiv + 2].classList.add('prev')
            } else if (leftDiv == 1) {
                leftRef.current.children[leftDiv].classList.add('current')
                leftRef.current.children[leftDiv + 1].classList.add('next')
                leftRef.current.children[0].classList.add('prev')
            } else if (leftDiv == 2) {
                leftRef.current.children[leftDiv].classList.add('current')
                leftRef.current.children[leftDiv - 1].classList.add('prev')
                leftRef.current.children[0].classList.add('next')
            }
            setLeftDiv(leftDiv + 1)
            if (leftDiv >= 2) {
                setLeftDiv(0)
            }
        }

        if (rightRef.current) {
            rightRef.current.childNodes.forEach(item => item.className = 'h-full absolute')

            if (rightDiv == 1) {
                rightRef.current.children[rightDiv].classList.add('current')
                rightRef.current.children[rightDiv - 1].classList.add('prev')
                rightRef.current.children[rightDiv + 1].classList.add('next')
            } else if (rightDiv == 0) {
                rightRef.current.children[rightDiv].classList.add('current')
                rightRef.current.children[rightDiv + 1].classList.add('next')
                rightRef.current.children[2].classList.add('prev')
            } else if (rightDiv == 2) {
                rightRef.current.children[rightDiv].classList.add('current')
                rightRef.current.children[rightDiv - 1].classList.add('prev')
                rightRef.current.children[0].classList.add('next')
            }
            setRightDiv(rightDiv - 1)
            if (rightDiv <= 0) {
                setRightDiv(2)
            }
        }

    }

    const clickSearchDivOpen = () => {
        if (!openSearch) {
            if (search.length > 1) {
                setOpenSearch(true)
            }
        }
    }

    const OpenSearchDiv = (muhu) => {
        if (!muhu.className.includes('search')) {
            if (openSearch) {
                setOpenSearch(false)
            }
        }
    }

    const bgImgFunc = () => {
        if (bgRef.current) {
            bgRef.current.childNodes.forEach(item => item.className = 'bg-img shadow-inner2 absolute hidden opacity-30')
            if (bgImg == 0) {
                bgRef.current.children[bgImg].classList.add('bg-current')
                bgRef.current.children[bgImg + 1].classList.add('bg-next')
                bgRef.current.children[3].classList.add('bg-prev')
            } else if (bgImg == 1) {
                bgRef.current.children[bgImg].classList.add('bg-current')
                bgRef.current.children[bgImg + 1].classList.add('bg-next')
                bgRef.current.children[0].classList.add('bg-prev')
            } else if (bgImg == 3) {
                bgRef.current.children[bgImg].classList.add('bg-current')
                bgRef.current.children[0].classList.add('bg-next')
                bgRef.current.children[bgImg - 1].classList.add('bg-prev')
            } else {
                bgRef.current.children[bgImg].classList.add('bg-current')
                bgRef.current.children[bgImg + 1].classList.add('bg-next')
                bgRef.current.children[bgImg - 1].classList.add('bg-prev')
            }
            setBgImg(bgImg - 1)
            if (bgImg <= 0) {
                setBgImg(3)
            }
        }
    }

    setTimeout(() => design1(), 3000)
    setTimeout(() => bgImgFunc(), 4000)


    useEffect(() => {  
        if(deviceRef.current){
            setDisplayWidth(deviceRef.current.clientWidth)
            bgRef.current.childNodes.forEach((item, i) => {
                if (deviceRef.current.clientWidth < 1000 && deviceRef.current.clientWidth > 600) {
                    item.src = require(`../resource/${i+1}${i+1}.jpg`)
                }else if (deviceRef.current.clientWidth < 600 && deviceRef.current.clientWidth > 450) {
                    item.src = require(`../resource/${i+1}${i+1}${i+1}.jpg`)
                }else if (deviceRef.current.clientWidth < 450) {
                    item.src = require(`../resource/${i+1}${i+1}${i+1}${i+1}.jpg`)
                }
            })
        }
        }, [deviceRef.current, bgRef, displayWidth])


    return (
        <div className='mb-40' onClick={(e) => OpenSearchDiv(e.target)} ref={deviceRef}>
            <div className='h-screen text-white home flex flex-col relative justify-center items-center shadow-inner2'>

                <div ref={bgRef} className='absolute h-full flex w-full overflow-hidden'>
                    <img className='bg-img opacity-30 bg-prev absolute' src={require('../resource/1.jpg')} alt="" />
                    <img className='bg-img opacity-30 bg-current absolute' src={require('../resource/2.jpg')} alt="" />
                    <img className='bg-img opacity-30 bg-next absolute' src={require('../resource/3.jpg')} alt="" />
                    <img className='bg-img opacity-30 hidden absolute' src={require('../resource/4.jpg')} alt="" />
                </div>


                <div className='z-10 text-center flex flex-col items-center'>
                    <p className='text-lg px-4 sm:p-0 sm:text-4xl font-bold sm:w-3/4'>THE BIGGEST DATABASE FOR MOVIES & TV SHOWS</p>
                    <p className='text-md px-4 sm:p-0 sm:text-2xl my-8'>Search through our database</p>
                    <div className='bg-white w-11/12 sm:w-3/4 flex rounded-md relative'>
                        <TextField value={search} onClick={clickSearchDivOpen} onChange={(e) => setSearch(e.target.value)} fullWidth variant="outlined" placeholder='eg:oppenheimer' />
                        <div className={openSearch ? 'top-full absolute w-full bg-neutral-800' : 'hidden'}>
                            <div>
                                {
                                    searchArr && searchArr.map(item => {
                                        const { id, poster_path, name, vote_average, media_type, title } = item
                                        return (
                                            <div key={id} className='hover:bg-sky-700 search cursor-pointer'>
                                                <Link to={`/movie/${id}`} state={{ id, media_type }}>
                                                    <Card sx={{ display: 'flex', height: 100 }}>
                                                        <CardMedia sx={{ width: 70 }} image={`https://image.tmdb.org/t/p/w200${poster_path}`}></CardMedia>
                                                        <div className='ml-2 text-left'>
                                                            <p className='my-2'>{name ? name : title}</p>
                                                            <p className='text-lg'><StarIcon sx={{ color: 'gold' }}></StarIcon>{vote_average}</p>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                                <div><Link to='/searchresults' state={{ list: searchArrFull, search }} className='text-lg underline'>See all results</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className='flex w-60 flex-col sm:flex-row sm:w-3/4 md:w-1/2  items-center overflow-hidden my-16 sm:my-24 justify-center'>
                    <div ref={leftRef} className='relative w-full h-44 sm:w-96 overflow-hidden flex flex-col justify-center items-center'>
                        <div className='text-lg sm:text-3xl flex flex-col justify-center items-center h-full text-center absolute current'><p>The best place to learn more about your favorite movies and tv shows</p></div>
                        <div className='text-lg sm:text-3xl flex flex-col justify-center items-center h-full text-center absolute next'><p>Preview your favourite movies</p></div>
                        <div className='text-lg sm:text-3xl flex flex-col justify-center items-center h-full text-center absolute prev'><p>Learn the latest data about movies, tv shows</p></div>
                    </div>
                    <div ref={rightRef} className='relative h-44 w-60 overflow-hidden flex justify-center'>
                        <img className='h-full absolute prev' src={require('../resource/images.jpg')} alt="" />
                        <img className='h-full absolute next' src={require('../resource/download.jpg')} alt="" />
                        <img className='h-full absolute current' src={require('../resource/mair.jpg')} alt="" />
                    </div>
                </div>
            </div>


            <div className="trend mx-2 sm:mx-4 md:mx-10">
                <p className='text-lg sm:text-2xl text-left mb-6 sm:mb-8'>Trending now <EastIcon></EastIcon></p>
                <div className='mb-4'>{
                    <ToggleButtonGroup exclusive color='success' onChange={handleChange} sx={{ border: 1}} size="small" aria-label="Small sizes">
                        {children}
                    </ToggleButtonGroup>
                }</div>
                <div className='sm:py-2 flex overflow-x-scroll'>
                    {trending.length > 0 && trending.map(movie => {
                        return (
                            <MovieCard movie={movie} key={movie.id}></MovieCard>
                        )
                    })

                    }
                </div>
            </div>



            <div className="popular mx-2 sm:mx-4 md:mx-10 mt-24">
                <p className='text-lg sm:text-2xl text-left mb-6 sm:mb-8'>Popular <EastIcon></EastIcon></p>
                <div className='sm:py-2 flex overflow-x-scroll'>
                    {popular.length > 0 && popular.map(movie => {
                        return (
                            <MovieCard movie={movie} mediaType='movie' key={movie.id}></MovieCard>
                        )
                    })
                    }
                </div>
            </div>


        </div>
    );
}

export default Home;