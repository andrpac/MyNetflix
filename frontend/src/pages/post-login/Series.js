import '../../App.css';
import SeriesModel from './components/SeriesModel';

function Series(props) {
    
    const user = props.user;
    const id = user.id;
    const series = user.series;

    console.log(series);
    
    return (
        <div className='background-series'>
          <div className='background-series-fade'></div>
          <div className='series-align'>
            {series.map((currSeries) => <SeriesModel series={currSeries} /> )}
          </div>
        </div>
    )
}

export default Series;