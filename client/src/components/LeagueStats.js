import React from "react";
import { Link, useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@apollo/client";
import NotFoundPage from "./NotFound"
import { Card } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const LeagueStats = () => {

    let { leagueId } = useParams();

    leagueId = parseInt(leagueId)

    const { loading: LeagueLoading, error: LeagueError, data: LeagueData } = useQuery(
        queries.LOAD_LEAGUE_BY_ID, {
        fetchPolicy: 'cache-and-network',
        variables: { id: leagueId },
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
    }
    )

    const { loading, error, data, refetch } = useQuery(
        queries.LOAD_TOP_SCORER, {
        fetchPolicy: 'cache-and-network',
        variables: { league: leagueId, season: 2022 },
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
    }
    )
    const { loading: AssitLoading, error: AssitError, data: AssitData } = useQuery(
        queries.LOAD_TOP_ASSISTS, {
        fetchPolicy: 'cache-and-network',
        variables: { league: leagueId, season: 2022 },
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
    }
    )


    if (loading || LeagueLoading || AssitLoading) {
        return (
            <div class="spinner-border m-5" role="status">

            </div>
        )
    } else if (error || LeagueError || AssitError) {
        return (
            <NotFoundPage />
        )
    }

    if (LeagueData && data && AssitData) {

        return (
            <div class="col-md-12">


                <div className="row">

                    <div className="col-md-5">



                        <div className="row mt-3  wsk-cp-matches">
                            <h1 className="mt-2 mb-2"
                                style={{
                                    color: "white",
                                }}>
                                Top Scorer</h1> <br></br> <br></br>
                            {data.TopScorerByLeague.map((x) => {
                                return (
                                    <div className="row">
                                        <div className="col-md-10 d-flex">
                                            <img alt="playerlogo" class=" img-fluid leagueimg" src={x.playerImage} />
                                            <div className="d-block">
                                                <Link to={`/player/${x.playerID}`}>
                                                    <p className="ml-2 tablehead">{x.playerName}</p>
                                                </Link>

                                                <div className="d-flex">

                                                    <img alt="Leaguelogo" class=" ml-2" width="20" height="20" src={x.teamLogo} />
                                                    <p className="ml-2 tablehead">{x.teamName}</p>
                                                </div>

                                            </div>
                                            <div className="col-md-2 ml-auto">
                                                <button className="btn-danger" style={{ color: "#ffff" }}>{x.goals}</button>
                                            </div>
                                        </div>
                                        <hr
                                            style={{
                                                background: "#D3D3D3",
                                                height: "2px",
                                                border: "none",
                                                opacity: 0.1
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div>



                    </div>
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-5">



                        <div className="row mt-3  wsk-cp-matches">
                            <h1 className="mt-2 mb-2"
                                style={{
                                    color: "white",
                                }}>
                                Assists</h1> <br></br> <br></br>
                            {AssitData.TopAssistsByLeague.map((y) => {
                                return (
                                    <div className="row">
                                        <div className="col-md-10 d-flex">
                                            <img alt="playerlogo" class=" img-fluid leagueimg" src={y.playerImage} />
                                            <div className="d-block">
                                                <Link to={`/player/${y.playerID}`}>
                                                    <p className="ml-2 tablehead">{y.playerName}</p>
                                                </Link>

                                                <div className="d-flex">

                                                    <img alt="Leaguelogo" class=" ml-2" width="20" height="20" src={y.teamLogo} />
                                                    <p className="ml-2 tablehead">{y.teamName}</p>
                                                </div>

                                            </div>
                                            <div className="col-md-2 ml-auto">
                                                <button className="btn-danger">{y.assists}</button>
                                            </div>
                                        </div>
                                        <hr
                                            style={{
                                                background: "#D3D3D3",
                                                height: "2px",
                                                border: "none",
                                                opacity: 0.1
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div>



                    </div>

                </div>


            </div>












        )
    }
    //Displaying data of top Scorers.

    //   if(data){
    //    return(

    //            <div class="col-md-12">
    //                <div className="wsk-cp-matches" >
    //                    <p className='teamname'>
    //                      Players
    //                    </p>

    //                    {data.TopScorerByLeague.map((x) => {
    //                        // Logo, matches playes, matches won, matches draw, matches lost, points, home matchs, away matches, goals scored, goals conceded
    //                        return (
    //                         <Card key={x.playerID} style={{ width: '18rem' }}>
    //                            <Link to={`/player/${x.playerID}`}>
    //                               <Card.Img variant="top" src={x.playerImage} />
    //                            </Link>

    //                            <Card.Body>
    //                            <Card.Title>{x.firstName} {x.lastName}</Card.Title>
    //                            <Card.Text>
    //                               Age: {x.age}
    //                               <br />
    //                               Position: {x.playerPosition}
    //                            </Card.Text>
    //                            </Card.Body>
    //                         </Card>
    //                        )
    //                    })}
    //                </div>
    //            </div>

    //    )
    // }




}

export default LeagueStats