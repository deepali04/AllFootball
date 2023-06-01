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
     <div class="col-md-12" id='home'>
          <div className="row">
                <div className="col-md-5">
                  <div className="row mt-3  wsk-cp-matches">
                        <h4 className="mt-2 mb-2" style={{ color: "white"}}>Player Following List</h4> <br></br> <br></br>

                        {GetFollowedPlayersInfo[0].playerId !== null ? 
                              (GetFollowedPlayersInfo.map((x) => {
                                  return ( 
                                    <div className="col-md-10 d-flex" >
                                      <br></br><br></br>
                                     <img alt="playerlogo" class="img-fluid SingleLeaguelogo" src={x.playerImage} />
                                      <div className="d-block">
                                                <Link to={`/player/${x.playerId}`}>
                                                <br></br>
                                                <p className="ml-2 tablehead">{x.playerName} </p>
                                                </Link>
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



                <div className="col-md-1"></div> {/* Add a column with width 1 to create space */}

                




                <div className="col-md-5">



                <div className="row mt-3  wsk-cp-matches">
                        <h4 className="mt-2 mb-2" style={{ color: "white"}}>Team Following List</h4> <br></br> <br></br>

                        {GetFollowedPlayersInfo[0].playerId !== null ? 
                              (GetFollowedPlayersInfo.map((x) => {
                                  return ( 
                                    <div className="col-md-10 d-flex" >
                                     <img alt="playerlogo" class="img-fluid SingleLeaguelogo" src={x.playerImage} />
                                      <div className="d-block">
                                                <Link to={`/player/${x.playerId}`}>
                                                <br></br>
                                                <p className="ml-2 tablehead">{x.playerName} </p>
                                                </Link>
                                      </div>
                                    </div>
                                    )
                                })
                              ): (
                                    <div class="alert alert-danger" role="alert">
                                        You don't follow any Team!!!
                                    </div>
                          )}
                  
                  
                  </div>

                </div>


            </div>
      </div> 
    )
  }

};

export default Following;


