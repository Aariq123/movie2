import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainContext } from "../context/context";
import { Button } from "@mui/material";
import { Card, CardMedia } from '@mui/material';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';


const Person = () => {
    const location = useLocation()
    const { id } = location.state
    const { options } = useContext(MainContext)
    const [details, setDetails] = useState()
    const [credits, setCredits] = useState()
    const [slice, setSlice] = useState(false)



    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setDetails(response))

        fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`, options)
            .then(response => response.json())
            .then(response => setCredits(response))
    }, [])

  
    return (
        <div>
            {details &&
                <div className="pt-24">
                    <div className="bg-black w-screen overflow-hidden md:flex items-center">
                        <img className="border-2 border-white scale-75 sm:scale-100 m-auto sm:m-16 z-10 rounded-xl" src={`https://image.tmdb.org/t/p/w300${details.profile_path}`}></img>
                        <div className="z-10 p-6 sm:p-0 sm:mx-6">
                            <p className="text-3xl font-bold">{details.name}</p>
                            <p className="my-6 text-lg">Biography</p>
                            <p>{slice ? details.biography : details.biography.split('').slice(0, 300).join('') + '...'}</p>
                            <Button variant="text" onClick={() => setSlice(true)}>Read More</Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <p className="my-4 text-2xl font-bold">Personal info:</p>
                        <div className="sm:flex justify-evenly">
                            <div className="m-2 mx-8">
                                <p className="text-lg font-bold">Known for:</p>
                                <p className="text-sm">{details.known_for_department}</p>
                            </div>

                            <div className="m-2 mx-8">
                                <p className="text-lg font-bold">Birthday:</p>
                                <p className="text-sm">{details.birthday}</p>
                            </div>

                            <div className="m-2 mx-8">
                                <p className="text-lg font-bold">Gender:</p>
                                <p className="text-sm mb-2">{details.gender == 2 ? 'Male' : 'Female'}</p>
                            </div>


                            <div className="m-2 mx-8">
                                <p className="text-lg font-bold">Place of birth:</p>
                                <p className="text-sm mb-2">{details.place_of_birth}</p>
                            </div>
                        </div>
                    </div>

                    <div className="m-4 sm:m-10">
                        {credits && credits.cast.map(item => {
                            const { character, title, release_date, name, first_air_date, id, vote_average } = item
                            
                            return (
                                <div className="m-4" >
                                    <Link to='/movie' state={{id}}>
                                    <Card sx={{
                                        backgroundColor: 'transparent',
                                        borderRadius: 2,
                                        color: 'white',
                                        padding:2,
                                        border:1,
                                        borderColor:"black"
                                    }}>
                                        <p>{title ? title : name}</p>
                                        <p><StarIcon sx={{ color: 'gold' }}></StarIcon>{vote_average.toFixed(1)}</p>
                                        <div className="text-slate-400">
                                            <p> as {character}</p>
                                            <p>{release_date? release_date : first_air_date}</p>
                                        </div>
                                    </Card>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    );
}

export default Person;
