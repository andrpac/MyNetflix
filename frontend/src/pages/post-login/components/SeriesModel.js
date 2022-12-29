import '../post-login.css'

function SeriesModel(props) {
    
    return (
        <div className='series-border'>  
          <img src={props.series.imageUrl} />   
          <div className='series-border-footer'>
            <button className='series-button-footer'>{props.series.seriesName}</button>
          </div>
        </div>
    )
}

export default SeriesModel;

