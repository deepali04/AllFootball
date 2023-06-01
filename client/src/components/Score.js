import React from 'react';
import { Link, useParams } from "react-router-dom";
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery,useMutation} from "@apollo/client";
import NotFoundPage from "./NotFound"
import Swal from 'sweetalert2';

const moment = require('moment');
const Score = () => {
    const sessionToken = JSON.parse(sessionStorage.getItem('sessionToken'));
    let userID =sessionToken.Login._id;
console.log(userID)
  
  const {loading, error, data,refetch} = useQuery(
    queries.GET_USER_BY_ID,
    {
      fetchPolicy: 'cache-and-network',
      variables:{id:userID},
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false
      
    }
  );
  const [mutate,{loading: loadingmutation, error: errormutation, data: datamutation }] = useMutation(queries.UPDATE_GAME);
  const handle_score = (event) => {

    mutate({
        
        variables:{
            gameID: userID,
            
        } 
        
      
       
  }).then((value) => {
    
     
        console.log(value)
        Swal.fire({
            icon: 'Success',
            title: 'Your score !',
            text: "Your score is "+ value.data.updateGame.coins,
          });
      

  }).catch(error => {
    refetch(
        {id:userID}
    )
    console.log(data.GetUserById.coins)
    Swal.fire({
        icon: 'Success',
        title: 'Score !',
        text: "Your score is "+ data.GetUserById.coins,
      });

  });
  }

if(loading){
    return(
        <div class="spinner-border m-5" role="status">
  
        </div>
    )
} else if (error ) {
    
    return(
        <NotFoundPage />
    )
}


if(data ){
    
    const {GetUserById} = data
    
  
    return(
        <div className="row justify-content-center align-items-center" id='home' style={{ height: '100vh' }}>

        <div className="row justify-content-center align-items-center">

            <div className='col-md-3 mr-5 ml-2 p-0'>
                <div className="wsk-cp-matches " >                              
                    <h4>Your Games and Score Information</h4>                               
                    <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.1}}/>      
                    <div className='row'>
                        <p className="tablehead">
                            You can play a game on the day of match itself. Whenever you play a game and you predict correctly, you get 100 points for correct prediction and your score will be updated after each game.
                            <br></br>
                            Click on MY SCORE button to check your score!
                        </p>
                    </div>    
                </div>
            </div>


            <div className='col-md-3 mr-5 ml-2 p-0'>
                <div className="wsk-cp-matches " >                              
                    <h4>Upgrade to Premium Account Member</h4>                               
                    <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.1}}/>      
                    <div className='row'>
                        <p className="tablehead">
                            You can 100 points per correct prediction and when you have total 200 points you'll be upgraded to premium member and you have access to our premium features where you can follow youe favorite team and players so that you can access their stats easily.
                        </p>
                    </div>    
                </div>
            </div>
        </div>


            <div className="col-4">
                <button className='btn btn-outline-info' onClick={(event) => handle_score(event)}>GET SCORE</button>
            </div>
</div>

    )
    
}

};

export default Score;


