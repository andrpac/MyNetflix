import '../../App.css';
import SeriesModel from './components/SeriesModel';

import { Link } from 'react-router-dom';

function Series(props) {
    
    const user = props.user;
    const id = user.id;
    const series = user.series;

    console.log(series);
    
    return (
        <div className='background-series'>
          <div className='background-fade'>
            <Link to='/'>
              <button className='navbar-button'>Add Series</button> 
            </Link> 
            <Link to='/'>
              <button className='navbar-button'>Sign out</button>
            </Link>
          </div>
          <div className='series-align'>
            {series.map((currSeries) => <SeriesModel series={currSeries} /> )}
          </div>
        </div>
    )
}

export default Series;