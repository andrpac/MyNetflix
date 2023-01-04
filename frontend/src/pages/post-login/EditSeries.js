import { useState } from 'react'; 
import { Link } from 'react-router-dom';

function handleRateClick(id) {
  console.log(id);
}

function EditSeries(props) {
    const [seriesName, setSeriesName] = useState(props.series.seriesName);
    const [comments, setComments] = useState(props.series.comments);
    const [currentRating, setCurrentRating] = useState(props.series.rating);
    const [rating, setRating] = useState([]);

    if(props.series.comments == null) {
      setComments('Your comments...');
      props.series.comments = comments;
    }

    if(props.series.rating == null) {
      setCurrentRating(0);
      props.series.rating = currentRating;
    }

    if(rating.length === 0) {
      for(let i=1; i<=5; i++) {
        if(i <= currentRating) {
          rating.push(<span key={5*props.series.id+i} onClick={() => handleRateClick(i)} className="fa fa-star series-star checked"></span>)
        } else {
          rating.push(<span key={5*props.series.id+i} onClick={() => handleRateClick(i)} className="fa fa-star series-star"></span>)
        }
      }
    }


    function handleRateClick(id) {
      setRating([]);
      setCurrentRating(id);
    
      for(let i=1; i<=5; i++) {
        if(i <= currentRating) {
          rating.push(<span key={5*props.series.id+i} onClick={() => handleRateClick(i)} className="fa fa-star series-star checked"></span>)
        } else {
          rating.push(<span key={5*props.series.id+i} onClick={() => handleRateClick(i)} className="fa fa-star series-star"></span>)
        }
      }
    }

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
            <Link to='/series'>
              <button className='navbar-button' onClick={props.handleExitSeriesDetails}>Back</button>
            </Link> 
          </div>
          <div className='series-popup-inner'>
            <img className='series-popup-image' alt={props.series.seriesName} src={props.series.imageUrl} />
            <form style={{'marginTop': '15px'}} onSubmit={(e) => handleSubmit(e)}>
              <input type='text' required value={seriesName} placeholder={seriesName} 
                onChange={(e) => setSeriesName(e.target.value)}>
              </input><br/>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
              {
                rating.map((star) => star)
              }

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