import { useState } from 'react'; 
import { Link } from 'react-router-dom';

function EditSeries(props) {
    // Used to get typed in series name
    const [seriesName, setSeriesName] = useState(props.series.seriesName);

    // Used to get typed in comments
    const [comments, setComments] = useState(props.series.comments);

    // Used to get rating as a number from 1 to 5
    const [currentRating, setCurrentRating] = useState(props.series.rating);

    // Used to create the html content for the rating 
    const [rating, setRating] = useState([]);

    // Create default text for comments if missing from database
    if(props.series.comments == null) {
      setComments('Your comments...');
      props.series.comments = comments;
    }

    // Create default rating as 0 if missing from database
    if(props.series.rating == null) {
      setCurrentRating(0);
      props.series.rating = currentRating;
    }

    // Create default html for rating based on data from database
    if(rating.length === 0) {
      for(let i=1; i<=5; i++) {
        if(i <= currentRating) {
          rating.push(<span key={5*props.series.id+i} onClick={() => handleRateClick(i)} className="fa fa-star series-star checked"></span>)
        } else {
          rating.push(<span key={5*props.series.id+i} onClick={() => handleRateClick(i)} className="fa fa-star series-star"></span>)
        }
      }
    }

    
    // Function to handle rate click: 
    // Each star has a unique id; mark all stars as 'checked' when individual id 
    // is lower than the one which was clicked      (highlight)
    function handleRateClick(id) {
      setRating([]);
      setCurrentRating(id);
      
      // Iterate thru all stars and add 'checked' class based on id
      for(let i=1; i<=5; i++) {
        if(i <= currentRating) {
          rating.push(<span key={5*props.series.id+i} onClick={() => handleRateClick(i)} className="fa fa-star series-star checked"></span>)
        } else {
          rating.push(<span key={5*props.series.id+i} onClick={() => handleRateClick(i)} className="fa fa-star series-star"></span>)
        }
      }
    }

    // Function to update properties of a specific series at the local database.
    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:8080/' + props.userid + '/series/' + props.series.id, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                seriesName: seriesName,
                episodes: 80,
                imageUrl: props.series.imageUrl,
                rating: currentRating,
                comments: comments,
            })
        })
        .then((response) => { 
            // Inform the Series component to rerender
            if(response.ok) {
                props.handleExitSeriesDetails();
            }
        })
        .catch((error) => {
            console.error(error);
        }) 
    } 

    return (
        <div className='series-popup'>
          <div className='background-fade' style={{'textAlign': 'left'}}>
            {/* Back button */}
            <Link to='/series'>
              <button className='navbar-button' onClick={props.handleExitSeriesDetails}>Back</button>
            </Link> 
          </div>
          
          {/* Main frame */}
          <div className='series-popup-inner'>
            <img className='series-popup-image' alt={props.series.seriesName} src={props.series.imageUrl} />
            <form style={{'marginTop': '15px'}} onSubmit={(e) => handleSubmit(e)}>
              {/* Series name field */}
              <input type='text' required value={seriesName} placeholder={seriesName} 
                onChange={(e) => setSeriesName(e.target.value)}>
              </input><br/>
              
              {/* Star rating */}
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
              { rating }

              {/* Comments textbox*/}
              <textarea placeholder={props.series.comments} value={comments} 
                onChange={(e) => {console.log(e.target.value); setComments(e.target.value)}}>
              </textarea>
              <input type='submit' className='submit' value={'Edit Series'} style={{'marginTop': '5%'}}></input>
            </form>
          </div>
        </div>
    )
}

export default EditSeries;