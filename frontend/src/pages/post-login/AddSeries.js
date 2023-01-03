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
       input.data.pop();
       records = input.data;
  }
});

function AddSeries(props) {
    const [searchSeries, setSearchSeries] = useState('');
    const [series, setSeries] = useState(records);
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
            props.handleExitAddSeries();
            if(response.ok) {
                navigate(-1);
            }
        })
        .catch((error) => {
            console.error(error);
        }) 
    }

    function handleSearchEntries(e) {
      setSeries(records.filter((record) => { 
        return record[1].toLowerCase().includes(e.target.value.toLowerCase())
      }));
      setSearchSeries(e.target.value); 
    }

    return (
        <div className='series-popup' style={{'overflow': 'auto'}}>
          <div className='background-fade' style={{'textAlign': 'left'}}>
            <Link to='../'>
              <button onClick={props.handleExitAddSeries} className='navbar-button'>Back</button> 
            </Link> 
            <form className='series-search-bar'>
              <input type='text' className='series-search-bar-field' value={searchSeries} placeholder='Search Series' 
                onChange={(e) => handleSearchEntries(e)} /> 
            </form>
          </div>
          <div className='series-align'>
            {series &&
             series.slice(0, 204).map((currRecord) => {
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