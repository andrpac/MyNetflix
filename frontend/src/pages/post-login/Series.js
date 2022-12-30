import '../../App.css';

import AddSeries from './AddSeries';
import SeriesModel from './components/SeriesModel';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { Link } from 'react-router-dom';

function Series(props) {
    
    const user = props.user;
    const series = user.series;

    return (
        <div className='background-series'>
          <div className='background-fade'>
            <Routes>
              <Route exact path='./create' element={<AddSeries userid={user.id} />}></Route>
            </Routes>
            <Link to='./create/'>
              <button className='navbar-button'>Add Series</button> 
            </Link> 
            <Link to='/'>
              <button className='navbar-button'>Sign out</button>
            </Link>
          </div>
          <div className='series-align'>
            {series.map((currSeries) => <SeriesModel key={currSeries.id} series={currSeries} /> )}
          </div>
        </div>
    )
}

export default Series;