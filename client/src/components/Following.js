import React from 'react';
import { Link, useParams } from "react-router-dom";
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery,useMutation} from "@apollo/client";
import NotFoundPage from "./NotFound"
import Swal from 'sweetalert2';


const moment = require('moment');
const Following = () => {
  let resultArray = []
    const sessionToken = JSON.parse(sessionStorage.getItem('sessionToken'));
    let userID =sessionToken.Login._id;
    console.log(userID)
  
  const {loading, error, data, refetch} = useQuery(
    queries.LOAD_FOLLOWED_PLAYERS,
    {
      fetchPolicy: 'cache-and-network',
      variables:{userId:userID},
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false
      
    }
  );
  let dataArray=[]

  if(loading){
    return(
        <div class="spinner-border m-5" role="status">
  
        </div>
    )
  } else if (error) {
      return(
          <NotFoundPage />
      )
  } 
  
  if (data){

    const {GetFollowedPlayersInfo} = data

    console.log(GetFollowedPlayersInfo)
    return (
    <div className="row justify-content-center" id='home'>
       <p className="mr-4 tablehead">Your Player Following List</p>
    <div className='col-md-11'>


    {GetFollowedPlayersInfo[0].playerId !== null ? 
    (GetFollowedPlayersInfo.map((x) => {
     return ( 
          
            <div className="wsk-cp-matches mt-3" >
              <div className="col-md-10 d-flex">
                  <img alt="playerlogo" class=" img-fluid leagueimg" src={x.playerImage} />
                  <div className="d-block">
                  <Link to={`/player/${x.playerId}`}>
                    <p className="mr-4 tablehead">{x.playerName}</p>  
                  </Link>
                  </div>
              </div>
            </div>

        )


      })
      ): (
        <div class="alert alert-danger" role="alert">
            You don't follow any Player!!!
        </div>
      )}
      </div>
        </div> 
    )
      
     

  }

};

export default Following;


