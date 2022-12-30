import { useState } from 'react';  
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddSeries(props) {
    const [seriesName, setSeriesName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [rating, setRating] = useState(-1);
    const [comments, setComments] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        
        fetch('http://localhost:8080/' + props.userid + '/series', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                seriesName: seriesName,
                episodes: 80,
                imageUrl: imgUrl,
            })
        })
        .then((response) => {        
            if(response.ok) {
                navigate(-1);
            }
        })
        .catch((error) => {
            console.error(error);
        })
        
    }

    return (
        <div className='background'>
          <div className='background-fade' style={{'textAlign': 'left'}}>
            <Link to='../series'>
              <button className='navbar-button'>Back</button> 
            </Link> 
          </div>
          <div className='login-border'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label> Add a new series </label>
              <input type='text' required value={seriesName} placeholder='Series Name' 
                onChange={(e) => setSeriesName(e.target.value)}></input><br/>
              <input type='text' required value={imgUrl} placeholder='Image Url' 
                onChange={(e) => setImgUrl(e.target.value)}></input><br/>
              <input type='submit' className='submit' value={'Add Series'}></input>
            </form>
          </div>
        </div>    
    )
}

export default AddSeries;