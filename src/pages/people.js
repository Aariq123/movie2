import { useContext, useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { MainContext } from "../context/context";
import { Button, Card, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';


const People = () => {
    const { options } = useContext(MainContext)
    const [people, setPeople] = useState()
    const matches = useMediaQuery('(max-width:640px)');

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setPeople(response.results))
    }, [])
 
    return (
        <div className="px-4 py-10 sm:p-10 sm:p-20">
            <p className="text-center font-bold text-lg sm:text-2xl m-6">Popular people in BALLS.COM</p>
            <div className="flex flex-wrap justify-evenly">{people ? people.map(movie => {
                const { profile_path, name, id } = movie
                return (
                    <div className='mx-1 sm:mx-2 ' key={id}>
                        <Link to='/person' state={{ id }}>
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
                                    image={`https://image.tmdb.org/t/p/w200${profile_path}`}>
                                </CardMedia>
                                <p className='text-md text-white m-2'>{name}</p>
                            </Card>
                        </Link>
                    </div>
                )
            }) : <div className="text-2xl text-center my-10">Sorry, an unknown error occured</div>

            }</div>
        </div>
    );
}

export default People;