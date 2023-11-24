import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Card, CardMedia } from '@mui/material';
import { Button } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

const AllReviews = () => {
    const location = useLocation()
    const [slice, setSlice] = useState(false)
    console.log(location.state)

    return ( 
        <div className="pt-24 px-10">
            {location.state && location.state.map(review=>{
            const { author_details, content, created_at, id} = review
            return (
                <div key={id} className="mb-6 md:w-3/4 m-auto">
                <Card sx={{
                    minheight:200,
                    padding:2,
                    borderRadius:5,
                    backgroundColor: 'transparent',
                    color:'white',
                    border:1,
                    borderColor:"black"
                }}>
                    <p>A review by{author_details.name}</p>
                    <p className='flex items-center m-1'><StarIcon sx={{ color: 'gold' }}></StarIcon>{author_details.rating}</p>
                    <p>{created_at}</p>
                    <p>{slice ? content : content.split('').slice(0, 200).join('') + '...'}</p>
                    <Button variant="text" onClick={() => setSlice(true)}>Read More</Button>
                </Card>
            </div>
            )
        })}</div>
    );
}
 
export default AllReviews;