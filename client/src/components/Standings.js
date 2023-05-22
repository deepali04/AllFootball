import React from "react";
import {Link, useParams } from "react-router-dom";
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@apollo/client";
import NotFoundPage from "./NotFound"

const Standings = () => {
    let { leagueId } = useParams();
    leagueId = parseInt(leagueId)

    const { loading, error, data, refetch } = useQuery(
        queries.LOAD_STANDINGS, {
            fetchPolicy: 'cache-and-network',
            variables:{league: leagueId, season: 2022},
            manual: true,
            refetchOnWindowFocus: false,
            enabled: false
        }
    )


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
        return(
            
                <div class="col-md-12">
                    <div className="wsk-cp-matches" >
                       
                                <div class="row matches">
                                    <div className="col-md-1">
                                        <p className="tablehead">#</p>
                                    </div>
                                    <div className="col-md-4 d-flex">
                                        <p  className="tablehead ml-5" >Team</p>
                                        {/* <img alt="Leaguelogo" class=" ml-auto img-fluid leagueimg" src={x.logo} /> 
                                        <p>{x.leagueName}</p> */}
                                    </div>
                                    <div className="col-md-1">
                                        <p className="tablehead">PL</p>
                                    </div>
                                    <div className="col-md-1">
                                        <p className="tablehead">W</p>
                                    </div>
                                    <div className="col-md-1">
                                        <p className="tablehead">D</p>
                                    </div>
                                    <div className="col-md-1">
                                        <p className="tablehead">L</p>
                                    </div>
                                    <div className="col-md-1">
                                        <p className="tablehead">+/-</p>
                                    </div>
                                    <div className="col-md-1">
                                        <p className="tablehead">GD</p>
                                    </div>
                                    <div className="col-md-1">
                                        <p className="tablehead">PTS</p>
                                    </div>
                                </div>
                            {data.StandingInformation.map((x) => {
                                console.log(x)
                                
                                  return (
                                <div className="row matches">
                                    <div className="col-md-1">
                                        <p className="tablehead">{x.rank}</p>
                                    </div>
                                <div className="col-md-4 d-flex">
                                   
                                    <img alt="Leaguelogo" class="img-fluid leagueimg" src={x.logo} /> 
                                    <Link to={`/team/${x.teamId}`}>
                                    <p className=" tablehead ml-3">{x.teamName}</p>
                                    </Link>
                                </div>
                                <div className="col-md-1">
                                    <p className="tablehead">{x.matchesPlayed}</p>
                                </div>
                                <div className="col-md-1">
                                    <p className="tablehead">{x.matchesWon}</p>
                                </div>
                                <div className="col-md-1">
                                    <p className="tablehead">{x.matchesDraw}</p>
                                </div>
                                <div className="col-md-1">
                                    <p className="tablehead">{x.matchesLost}</p>
                                </div>
                                <div className="col-md-1">
                                    <p className="tablehead">{x.goalsScored}- {x.goalsConceded}</p>
                                </div>
                                <div className="col-md-1">
                                    <p className="tablehead">{x.goalsScored - x.goalsConceded}</p>
                                </div>
                                <div className="col-md-1">
                                    <p className="tablehead">{x.points}</p>

                                </div>
                            </div>
                               
                                            
                            )

                        })}
                         </div>
                    </div>
                
          
        )
    }

}

export default Standings