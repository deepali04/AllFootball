import React from "react";
import {Link, useParams } from "react-router-dom";
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@apollo/client";
import NotFoundPage from "./NotFound"

const TeamFixtures = () => {
    let { teamId } = useParams();
    teamId = parseInt(teamId);

    console.log(teamId)

    const { loading, error, data, refetch } = useQuery(
        queries.LOAD_TEAM_FIXTURES, {
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
        const fixtureInfo  = data
        console.log(fixtureInfo.GetTeamFixtures)
        return(           
            <div className='col-md-12'>
                    <br></br>
                    <div className='row'>
                        {fixtureInfo.GetTeamFixtures.map((fixture, index) => (
                            <div className='row matches m-2' key={index}>
                                <div class="col-md-2 d-flex align-items-center mt-4 mt-md-0">
                                    <div>
                                           <p className='teamname'>{fixture.matchDate}</p>
                                    </div>
                                </div>
                            <div class="col-md-2 d-flex align-items-right mt-4 mt-md-0">
                                <div>
                                    <Link to={`/team/${fixture.homeTeamID}`}>
                                      <p className='teamname'>{fixture.homeTeamName}</p>
                                    </Link>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <div>
                                    <img alt="Home team" class="img-fluid teamimg" src={fixture.homeTeamLogo} />
                                </div>
                            </div>
                            <div class="col-md-1">
                                <div>
                                    {fixture.winner == 'Not Decided' ? (
                                          <p className="teamname"  >{fixture.matchTimeZone}</p>
                                    ) : (
                                          <p className="teamname bg-success">{fixture.FullTimeScore}</p>
                                    )}
                                </div>
                            </div>
                            <div class="col-md-1">
                                  <div>
                                    <img alt="Home team" class="img-fluid teamimg" src={fixture.awayTeamLogo} />
                                  </div>
                            </div>
                            <div class="col-md-2  d-flex align-items-right mt-4 mt-md-0">
                              <div>
                                    <Link to={`/team/${fixture.awayTeamID}`}>
                                      <p className='teamname align-text-left'>{fixture.awayTeamName}</p>
                                    </Link>
                              </div>
                            </div>
                            <div class="col-md-3  d-flex align-items-center mt-4 mt-md-0">
                              <div>
                                      <p className='teamname align-text-left'>{fixture.leagueName}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
            </div>


        )
    }

}

export default TeamFixtures;