import '../post-login.css'

function SeriesModel(props) {
    // Function to delete data from local database where trash icon is clicked
    function handleDelete() {
        fetch('http://localhost:8080/' + props.userid + '/series/' + props.series.id, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {        
            if(response.ok) {
                // Inform the Series component to rerender
                props.handleExitSeriesDetails();
            }
        })
        .catch((error) => {
            console.error(error);
        }) 
    }

    return (
        <div className='series-border'>  
        {/* Image with trash icon */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <div style={{'display': 'block', 'position': 'relative'}}>
            <img alt={props.series.seriesName} src={props.series.imageUrl} />
            {props.deleteButton && <button className="btn" onClick={handleDelete}><i className="fa fa-trash"></i></button>}
          </div>

          {/* Button with series name */}
          <div className='series-border-footer'>
            {/* When button is clicked inform series compoent to zoom in a single series */}
            <button className='series-button-footer' onClick={
              () => props.handleSeriesDetails(props.series)}>
                {props.series.seriesName}
            </button>
          </div>
        </div>
    )
}

export default SeriesModel;

