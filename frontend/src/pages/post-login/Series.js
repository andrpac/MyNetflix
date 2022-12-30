import '../../App.css';

import AddSeries from './AddSeries';
import EditSeries from './EditSeries';
import SeriesModel from './components/SeriesModel';

import { useState } from 'react';
import { Link } from 'react-router-dom';

function Series(props) {
    const user = props.user;

    const [series, setSeries] = useState(user.series);
    const [createSeries, setCreateSeries] = useState(false);
    const [activeSeries, setActiveSeries] = useState(null);

    /* Used for AddSeries */
    function handleCreateAddSeries() {
        setCreateSeries(true);
    }

    function handleExitAddSeries() {
        setCreateSeries(false);
    }


    /* Used for EditSeries */
    function handleSeriesDetails(data) {
        setActiveSeries(data);
    }


    function handleExitSeriesDetails() {
        setActiveSeries(null);

        fetch('http://localhost:8080/' + user.id + '/series', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {        
            return response.json();
        })
        .then((data) => {
            setSeries(data);
            
        })
        .catch((error) => {
            console.error(error);
        })                
    }

    return (
        <div className='background-series'>
          <div className='background-fade'>
            <Link>
              <button onClick={handleCreateAddSeries} className='navbar-button'>Add Series</button> 
            </Link> 
            <Link to='/'>
              <button className='navbar-button'>Sign out</button>
            </Link>
          </div>
          {createSeries && <AddSeries userid={user.id} handleExitAddSeries={handleExitAddSeries}/>}
          {activeSeries && <EditSeries userid={user.id} series={activeSeries} handleExitSeriesDetails={handleExitSeriesDetails} />}
          <div className='series-align'>
            {series && series.map((currSeries) => <SeriesModel handleSeriesDetails={
              (data) => handleSeriesDetails(data)} 
                 key={currSeries.id} series={currSeries} /> )}
          </div>
        </div>
    )
}

export default Series;