import React from "react";
import { Link, useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@apollo/client";
import NotFoundPage from "./NotFound"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Standings from "./Standings";
import LeagueStats from "./LeagueStats";

const SingleLeague = () => {

    let { leagueId } = useParams();

    leagueId = parseInt(leagueId)

    const { loading, error, data, refetch } = useQuery(
        queries.LOAD_LEAGUE_BY_ID, {
        fetchPolicy: 'cache-and-network',
        variables: { id: leagueId },
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
    }
    )



    if (loading) {
        return (
            <div class="spinner-border m-5" role="status">

            </div>
        )
    } else if (error) {
        return (
            <NotFoundPage />
        )
    }

    if (data) {
        const { SingleLeagueInformation } = data
        return (
            <div class="row justify-content-center" id='home' >
                <div className="row col-md-10 mt-3">
                    <div className="wsk-cp-leagues" >
                        <div className="row d-flex">

                            <div className="col-md-3 d-flex">
                                <img alt="SingleLeaguelogo" class="img-fluid SingleLeaguelogo" src={SingleLeagueInformation.logo} />

                                <div className="ml-2 d-block">
                                    <p className='teamname mr-4 mb-0'>{SingleLeagueInformation.countryName}</p>
                                    <p className='singleLeagueh1'>{SingleLeagueInformation.leagueName}</p>
                                </div>
                            </div>

                        </div>
                        <Tabs defaultActiveKey="first">
                            <Tab eventKey="first" title="Standings">
                                <Standings></Standings>
                            </Tab>
                            <Tab eventKey="second" title="Stats">
                                <LeagueStats></LeagueStats>
                            </Tab>

                        </Tabs>
                    </div>
                </div>

            </div>


        )
    }

    // if(data){
    //     return(
    //         <div class="row justify-content-center" id='home' >

    //             <div className="wsk-cp-matches" >
    //             </div>
    //             <Link to={`\standings`}>
    //                     <button> Standing </button>
    //                 </Link>
    //                 <Link to={`\stats`}>
    //                     <button> Stats page</button>
    //             </Link>

    //             <div class="col-md-3  d-flex align-items-center mt-3 mt-md-0">
    //                 <div>
    //                     <p className='teamname'>{data.SingleLeagueInformation.leagueName}</p>
    //                 </div>
    //             </div>

    //             <div class="col-md-1">
    //                 <div>
    //                     <img alt="Home team"  src={data.SingleLeagueInformation.logo} />
    //                 </div>
    //             </div>
    //             <br/><br/><br/><br/>

    //             <div class="col-md-3  d-flex align-items-center mt-3 mt-md-0">
    //                 <div>
    //                     <p className='teamname'>{data.SingleLeagueInformation.countryName}</p>
    //                 </div>
    //             </div>

    //         </div>

    //         // Nav Bar





    //     )
    // }


}

export default SingleLeague