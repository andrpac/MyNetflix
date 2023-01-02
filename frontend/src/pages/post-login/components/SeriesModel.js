import '../post-login.css'

function SeriesModel(props) {
    function handleDelete() {
        fetch('http://localhost:8080/' + props.userid + '/series/' + props.series.id, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {        
            if(response.ok) {
                props.handleExitSeriesDetails();
            }
        })
        .catch((error) => {
            console.error(error);
        }) 
    }

    return (
        <div className='series-border'>  
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <div style={{'display': 'block', 'position': 'relative'}}>
            <img alt={props.series.seriesName} src={props.series.imageUrl} />
            {props.deleteButton && <button className="btn" onClick={handleDelete}><i className="fa fa-trash"></i></button>}
          </div>
          <div className='series-border-footer'>
            <button className='series-button-footer' onClick={
              () => props.handleSeriesDetails(props.series)}>
                {props.series.seriesName}
            </button>
          </div>
        </div>
    )
}

export default SeriesModel;

