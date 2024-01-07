import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';


const CardElement = ({ jobTitle, description, category, location, id,thumbnail, date,companywebsite }) => {
    // console.log(jobTitle);

    const formattedDate = new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    const { palette } = useTheme();
    return (
        // <div className="common">
        <Card sx={{ minWidth: 275, mb: 3, mt: 3,height:'16rem'}}>
        
            <CardContent sx={{display:'flex'}} >
            
            
            
            <div className="thumbnail">
                    <img className='post-img' src={thumbnail} alt=""/>
                </div>
                <div className="desc">
                <Typography sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }} gutterBottom>
                    <IconButton><LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} /></IconButton> {location}
                </Typography>
                <Typography variant="h5" component="div">
                    {jobTitle}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {category}
                </Typography>
                <Typography variant="body2" sx={{lineHeight:'22px'}}>
                    {description.split(" ").slice(0, 10).join(" ") + "..."}
                </Typography>

                <div className='date'>
                <span style={{marginTop:'1rem'}}>{formattedDate}</span>
                </div>
                <CardActions sx={{marginTop:'-1rem'}}>
            
            <Button disableElevation variant='contained' size="small" sx={{marginLeft: '-2px'}}><Link style={{ textDecoration: "none", color: "white", boxShadow: 0,fontSize:'11px' }} to={`/job/${id}`}>Read more</Link></Button>
            
           
        </CardActions>
                </div>
            </CardContent>
            
            {/* <CardActions>
            
                <Button disableElevation variant='contained' size="small" startIcon={<AddIcon />}><Link style={{ textDecoration: "none", color: "white", boxShadow: 0 }} to={`/job/${id}`}>More Details</Link></Button>
                
            </CardActions> */}
            
        </Card>
        
        // </div>
        


    );
}

export default CardElement;