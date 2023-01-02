import Papa from 'papaparse';
import csvFile from './series.csv';
import SeriesModel from './components/SeriesModel';

import { useState } from 'react';  
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

var records = null;
Papa.parse(csvFile, {
  download: true,
  complete: function (input) {
       input.data.shift();
       records = input.data;
  }
});

function AddSeries(props) {
    const [seriesName, setSeriesName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [rating, setRating] = useState(-1);
    const [comments, setComments] = useState('');
    const navigate = useNavigate();

    function handleSubmit(data) {
      
        fetch('http://localhost:8080/' + props.userid + '/series', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                seriesName: data.seriesName,
                episodes: 80,
                imageUrl: data.imageUrl,
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
        <div className='series-popup' style={{'overflow': 'auto'}}>
          <div className='background-fade' style={{'textAlign': 'left'}}>
            <Link to='../series'>
              <button onClick={props.handleExitAddSeries} className='navbar-button'>Back</button> 
            </Link> 
          </div>

          { /*
          <div className='login-border'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type='text' required value={seriesName} placeholder='Series Name' 
                onChange={(e) => setSeriesName(e.target.value)}></input><br/>
              <input type='text' required value={imgUrl} placeholder='Image Url' 
                onChange={(e) => setImgUrl(e.target.value)}></input><br/>
              <input type='submit' className='submit' value={'Add Series'}></input>
            </form>
          </div>
            */
          }

          <div className='series-align'>
            {records &&
             records.slice(0, 100).map((currRecord) => {
                const currSeries = {
                  seriesName: currRecord[1],
                  imageUrl: currRecord[2],
                };
                return (<SeriesModel key={currSeries[0]} handleSeriesDetails={(data) => handleSubmit(data)}
                  deleteButton={false} series={currSeries} userid={props.userid} />) 
             })}
          </div>
          
        </div>    
    )
}

export default AddSeries;