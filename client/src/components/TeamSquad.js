import React from "react";
import {Link, useParams } from "react-router-dom";
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@apollo/client";
import NotFoundPage from "./NotFound"

const TeamSquad = () => {
    console.log("I'm in squad rn")
    let { teamId } = useParams();
    teamId = parseInt(teamId);

    console.log(teamId)

    const { loading, error, data, refetch } = useQuery(
        queries.LOAD_TEAM_SQUAD, {
            fetchPolicy: 'cache-and-network',
            variables:{teamID: teamId},
            manual: true,
            refetchOnWindowFocus: false,
            enabled: false
        }
    )
    console.log(data)
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
        const  squadInfo  = data
        console.log(squadInfo.GetTeamSquad)
        return(           
            <div className='col-md-11'>
                    <br></br>
                    <div className='row'>
                        {squadInfo.GetTeamSquad.map((player, index) => (
                            <div className='col-md-3 mb-4' key={index}>
                                <div className="card">
                                <Link to={`/player/${player.playerId}`}>
                                <div className="col-md-3 d-flex">
                                    <img alt="SinglePlayerLogo" class="img-fluid SingleLeaguelogo" src={player.playerPhoto} />
                                    <div className="ml-2 d-block">
                                        <h5 className='card-title'>{player.playerName}</h5>
                                        <p className='card-text'>{player.playerPosition}</p>
                                        
                                    </div>
                                </div>
                                </Link>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
            </div>


        )
    }

}

export default TeamSquad;