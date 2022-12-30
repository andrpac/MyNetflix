import { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

function EditSeries(props) {
    const [seriesName, setSeriesName] = useState(props.series.seriesName);
    const [imgUrl, setImgUrl] = useState(props.series.imageUrl);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:8080/' + props.userid + '/series/' + props.series.id, {
            method: 'PUT', 
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
                props.handleExitSeriesDetails();
                navigate('../series');
            }
        })
        .catch((error) => {
            console.error(error);
        }) 
    } 

    return (
        <div className='series-popup'>
          <div className='background-fade' style={{'textAlign': 'left'}}>
            <Link to='/series'>
              <button className='navbar-button' onClick={props.handleExitSeriesDetails}>Back</button>
            </Link> 
          </div>
          <div className='series-popup-inner'>
            <img className='series-popup-image' src={props.series.imageUrl} />
            <form style={{'marginTop': '15px'}} onSubmit={(e) => handleSubmit(e)}>
              <input type='text' required value={seriesName} placeholder={seriesName} 
                onChange={(e) => setSeriesName(e.target.value)}></input><br/>
              <input type='text' required value={imgUrl} placeholder='Image Url' 
                onChange={(e) => setImgUrl(e.target.value)}></input><br/>
              <input type='submit' className='submit' value={'Edit Series'}></input>
            </form>
          </div>
        </div>
    )
}

export default EditSeries;