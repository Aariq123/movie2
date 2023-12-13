import { Card, CardMedia } from '@mui/material';
import { Link } from "react-router-dom";

const PersonCard = ({item}) => {
  
    const { id, name, profile_path, character } = item
    
        return (
            <div className="mr-1 mb-1 sm:mr-2 sm:mb-2 scale-75 sm:scale-100">
                <Link to='/person' state={{id}}>
                <Card sx={{
                    width: 180,
                    minHeight: 250,
                    backgroundColor: 'transparent',
                    boxShadow: 'none',

                }}>

                    <CardMedia sx={{
                        height: 250,
                        width: 180,
                        color: 'white',
                        border: 1,
                        borderColor: 'white',
                        borderRadius: 5,
                    }}
                        image={`https://image.tmdb.org/t/p/w200${profile_path}`}>
                    </CardMedia>
                    <p className="m-2 text-white">{name}</p>
                    <p className="ml-2 text-slate-400 text-sm">{character}</p>
                </Card>
                </Link>
            </div>
        
     );
}
 
export default PersonCard;