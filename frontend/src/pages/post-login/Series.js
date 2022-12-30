import '../../App.css';

import AddSeries from './AddSeries';
import EditSeries from './EditSeries';
import SeriesModel from './components/SeriesModel';

import { useState } from 'react';
import { Link } from 'react-router-dom';

function Series(props) {
    const user = props.user;
    const series = user.series;

    const [activeSeries, setActiveSeries] = useState(null);

    function handleSeriesDetails(data) {
        setActiveSeries(data);
    }

    function handleExitSeriesDetails() {
        setActiveSeries(null);
    }

    return (
        <div className='background-series'>
          <div className='background-fade'>
            <Link to='./create/'>
              <button className='navbar-button'>Add Series</button> 
            </Link> 
            <Link to='/'>
              <button className='navbar-button'>Sign out</button>
            </Link>
          </div>
          {activeSeries && <EditSeries series={activeSeries} handleExitSeriesDetails={handleExitSeriesDetails} />}
          <div className='series-align'>
            {series.map((currSeries) => <SeriesModel handleSeriesDetails={
              (data) => handleSeriesDetails(data)} 
                 key={currSeries.id} series={currSeries} /> )}
          </div>
        </div>
    )
}

export default Series;