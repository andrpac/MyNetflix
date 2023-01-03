import '../../App.css';

import AddSeries from './AddSeries';
import EditSeries from './EditSeries';
import SeriesModel from './components/SeriesModel';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';

function Series(props) {
    const user = props.user;
    const [series, setSeries] = useState(user.series);
    const [allSeries, setAllSeries] = useState(user.series);

    const [activeSeries, setActiveSeries] = useState(null);
    const [searchSeries, setSearchSeries] = useState('');

    function fetchSeries() {
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
            setAllSeries(data);

        })
        .catch((error) => {
            console.error(error);
        })   
    }

    /* Used for AddSeries */
    function handleExitAddSeries() {
        fetchSeries();  
    }


    /* Used for EditSeries */
    function handleSeriesDetails(data) {
        setActiveSeries(data);
    }

    function handleExitSeriesDetails() {
        setActiveSeries(null);  
        fetchSeries();             
    }
    

    function handleSearchEntries(e) {
        setSeries(allSeries.filter((series) => 
          series.seriesName.toLowerCase().includes(e.target.value.toLowerCase())));
        setSearchSeries(e.target.value); 
    }

    return (
        <Routes>
          <Route exact path='/all' element={<AddSeries userid={user.id} handleExitAddSeries={handleExitAddSeries}/>} /> 
          <Route exact path='/' element={
            <div className='background-series'>
              <div className='background-fade'>
                <div style={{'marginRight': '8%'}}>
                  <form className='series-search-bar'>
                    <input type='text' className='series-search-bar-field' value={searchSeries} placeholder='Search Series' 
                      onChange={(e) => handleSearchEntries(e)} /> 
                  </form>
                  <Link to='./all'>
                    <button className='navbar-button'>Add Series</button> 
                  </Link> 
                  <Link to='/'>
                    <button className='navbar-button'>Sign out</button>
                  </Link>
                </div>
              </div>
              {activeSeries && <EditSeries userid={user.id} series={activeSeries} handleExitSeriesDetails={handleExitSeriesDetails} />}
              <div className='series-align'>
                {series && !activeSeries &&
                series.sort((a, b) => a.id > b.id ? 1 : -1).map((currSeries) => 
                <SeriesModel key={currSeries.id} deleteButton={true} handleSeriesDetails={
                  (data) => handleSeriesDetails(data)} 
                  handleExitSeriesDetails={handleExitSeriesDetails} 
                  series={currSeries} userid={user.id} /> )}
              </div>
            </div>} />
        </Routes>
    )
}

export default Series;