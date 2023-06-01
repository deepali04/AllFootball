import React from 'react';
import { Link, useParams } from "react-router-dom";
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery,useMutation } from "@apollo/client";
import NotFoundPage from "./NotFound"
import {Card} from 'react-bootstrap'

const SinglePlayer = () => {
    const sessionToken = JSON.parse(sessionStorage.getItem('sessionToken'));
    let userId;
    if(sessionToken){
        userId = sessionToken.Login._id 
    }
    else{
        userId="";
    }
    let { playerId } = useParams();

   playerId = parseInt(playerId)
   
   const { loading, error, data, refetch } = useQuery(
    queries.LOAD_PLAYER_BY_ID_INFO, {
        fetchPolicy: 'cache-and-network',
        variables:{playerId: playerId},
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
    }
   );
   const { loading:userLoading, error:userError, data:userData } = useQuery(
    queries.GET_USER_BY_ID, {
        fetchPolicy: 'cache-and-network',
        variables:{id: userId},
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
    }
    )

const [mutate,{loading:followLoading, error:followError, data:followData }] = useMutation(queries.LOAD_PLAYER_FOLLOWING);
const [unmutate,{loading:unfollowLoading, error:unfollowError, data:unfollowData }] = useMutation(queries.LOAD_PLAYER_UNFOLLOWING);
const handle_follow = (event) => {
    
    mutate({
        
        variables:{
           
            userId: sessionToken.Login._id,
            PlayerID: playerId,
            
        },
        refetchQueries:[{
            query : queries.GET_USER_BY_ID,
            variables:{
                id:sessionToken.Login._id
            }
        }]
      
       
  })
      
       
  }
  const handle_unfollow = (event) => {
    
    unmutate({
        
        variables:{
           
            userId: userId,
            PlayerID: playerId,
            
        },
        refetchQueries:[{
            query : queries.GET_USER_BY_ID,
            variables:{
                id:userId
            }
        }]
      
       
  })
      
       
  }


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

if(data){
    let followers_list;
    
    const {GetPlayerByID} = data
    if(userData === undefined){
        followers_list =[]

    }
    else{   
        const {GetUserById} = userData
        followers_list = GetUserById.followingPlayerID
        console.log(followers_list)

    }
    
    let Flag = false
      if(GetPlayerByID === null ){
        
        return(<div class="alert alert-danger" role="alert">
        Player data not available
        </div>)
         
      }
      else{
        return(
        
            <div class="row justify-content-center" id='home'  >
                    <div className='col-md-11'>
                        <div className="wsk-cp-matches mt-3" >
                            <div className="col-md-10 d-flex">
                                <img alt="playerlogo" class="img-fluid SingleLeaguelogo" src={GetPlayerByID.playerImage} />
                                <div className="d-block">
                                    <br></br>
                                    <h4 className="mr-4 tablehead">{GetPlayerByID.playerName}</h4>
                                    <div className="d-flex"> 
                                        <p className="ml-2 tablehead">{GetPlayerByID.teamName} | {GetPlayerByID.Nationality} </p>
                                    </div>
                                                                    
                                    <div className='d-flex'>
                                        { sessionToken  && sessionToken.Login.isPremium ===true ?(
                                        <>                   
                                            { followers_list.includes(playerId.toString())?(
                                                <div className='col-md-4'>
                                                <button className='btn btn-success' onClick={(event) => handle_unfollow()}>UNFOLLOW</button>
                                                </div>
                                                
                                            )
                                            : (
                                            <div className='col-md-4'>
                                                <button className='btn btn-success' onClick={(event) => handle_follow(event)}>FOLLOW</button>
                                                </div>)
                                            }
                                        </>
                                        )
                            
                                        :(
                                        <div>
                            
                                        </div>
                                        )
                        
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className='col-md-11'>
                        <div className='row'>
                            <div className='col-md-3 mr-5 ml-2 p-0'>
                                <div className="wsk-cp-matches " >
                                    <div className='row'>
                                        <h5 className='tablehead'>General Information</h5>
                                    </div>                       
                                    <div className='row mt-4'>
                                        <div className='col-md-4'>
                                            <p className="tablehead">Height</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="tablehead">Weight</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="tablehead">Age</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <p className="tablehead">{GetPlayerByID.playerHeight}</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="tablehead">{GetPlayerByID.playerWeight}</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="tablehead">{GetPlayerByID.age}</p>
                                        </div>
                                    </div>
                                    
                                    <hr style={{background: "#D3D3D3", height: "2px", border: "none",opacity:0.1}}/>
                                    
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <p className="tablehead">Nationality</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="tablehead">Position</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="tablehead">Rating</p>
                                        </div>
                                    
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <p className="tablehead">{GetPlayerByID.Nationality}</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="tablehead">{GetPlayerByID.playerPosition}</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="tablehead">{GetPlayerByID.playerRating}</p>
                                        </div>
        
                                </div>
                            </div>
    
                        </div>
    
                        
                        
                        
                        
                        {/* card 2 */}
    
                        
                        <div className='col-md-3 mr-5 ml-2 p-0'>
                            <div className="wsk-cp-matches " >
                                <div className='row'>
                                    <h5 className='tablehead'>Highlights - 2022</h5>
                                </div>                              
                                <div className='row mt-4'>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Matches</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Goals</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Assists</p>
                                    </div>
                                </div>

                                <div className='row '>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.appearances}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.goals}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.assists}</p>
                                    </div>
                                    
                                </div>
                                
                                <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.1}}/>
                                
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Penalty</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Yellow Card</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Red Card</p>
                                    </div>
                                    
                                </div>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.penaltyScored}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.yellowCard || 0 }</p>
                                    </div>
    
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.redCard || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>



                        


                        {/* card 3 */}


                        <div className='col-md-4 mr-5 ml-2 p-0'>
                            <div className="wsk-cp-matches " >
                                <div className='row'>
                                    <h5 className='tablehead'>Player Statistics - 2022</h5>
                                </div>                              
                                <div className='row mt-4'>
                                    <div className='col-md-6'>
                                        <p className="tablehead">Appearances</p>                                     
                                    </div>
                                    <div className='col-md-6'>
                                        <p className="tablehead">Lineups</p>
                                    </div>
                                </div>

                                <div className='row '>
                                    <div className='col-md-6'>
                                        <p className="tablehead">{GetPlayerByID.appearances}</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p className="tablehead">{GetPlayerByID.lineUps}</p>
                                    </div>                                    
                                </div>
                                
                                <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.1}}/>


                                <div className='row mt-4'>
                                    <div className='col-md-6'>
                                        <p className="tablehead">Dribbles Attempted</p>                                     
                                    </div>
                                    <div className='col-md-6'>
                                        <p className="tablehead">Successful Dribbles</p>
                                    </div>
                                </div>

                                <div className='row '>
                                    <div className='col-md-6'>
                                        <p className="tablehead">{GetPlayerByID.dribblesAttempts}</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p className="tablehead">{GetPlayerByID.dribblesSuccess}</p>
                                    </div>                               
                                </div>
                                
                                

                                <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.1}}/>

                                <div className='row mt-4'>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Passes</p>                                     
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Key Passes</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Accuracy</p>
                                    </div>
                                </div>

                                <div className='row '>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.shots}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.shotsOnTarget}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.accuracy}</p>
                                    </div>                                    
                                </div>


                                <hr style={{ background: "#D3D3D3",height: "2px", border: "none", opacity:0.1}}/>


                                <div className='row mt-4'>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Shots</p>                                     
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Shots on Target</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Player Rating</p>
                                    </div>
                                </div>

                                <div className='row '>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.shots}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.shotsOnTarget}</p>
                                    </div> 
                                    <div className='col-md-4'>
                                        <p className="tablehead">{GetPlayerByID.playerRating}</p>
                                    </div>                                    
                                </div>

                                






                            </div>
                        </div>

                        </div>
                    </div>


                    
                                        





            </div>
  
        )
        
      }
    
}

};

export default SinglePlayer;




