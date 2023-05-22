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
        <div className="row justify-content-center" id='home'>
            <button className='btn btn-success' onClick={(event) => handle_score(event)}>GET SCORE</button>
        </div>

    )
    
}

};

export default Score;


