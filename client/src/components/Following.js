import React from 'react';
import { Link, useParams } from "react-router-dom";
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery,useMutation} from "@apollo/client";
import NotFoundPage from "./NotFound"
import Swal from 'sweetalert2';


const moment = require('moment');
const Following = ({ title }) => {

  React.useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);

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

  const {loading: teamLoading, error: teamError, data: teamData, refetch: teamRefetch} = useQuery(
    queries.LOAD_FOLLOWED_TEAMS,
    {
      fetchPolicy: 'network',
      variables: { userId: userID },
      enabled: true    
    }
  );

  console.log(teamData)
  console.log(teamLoading)
  console.log(teamError)

  let dataArray=[]

  if(loading || teamLoading){
    return(
        <div class="spinner-border m-5" role="status">
  
        </div>
    )
  } else if (error || teamError) {
      return(
          <NotFoundPage />
      )
  } 
  
  if (data || teamData){
    const {GetFollowedPlayersInfo} = data;
    const {GetFollowedTeamsInfo} = teamData;
    console.log(GetFollowedPlayersInfo)
    console.log(GetFollowedTeamsInfo)
    return (
      <div className="col-md-12" id='home'>
  <div className="row">
    <div className="col-md-4 offset-md-1"> {/* Skip one column from the left */}
      <div className="row mt-3 wsk-cp-matches align-items-start">
        <h4 className="mt-2 mb-2" style={{ color: "white" }}>Player Following List</h4>
        <br />
        <br />
        <hr style={{ background: "#D3D3D3", height: "2px", border: "none", opacity: 0.2 }} />

        {GetFollowedPlayersInfo[0].playerId !== null ?
          (GetFollowedPlayersInfo.map((x) => {
            return (
              <div className="col-md-10 align-items-left">
                <br />
                <br />
                <img alt="playerlogo" className="ml-auto img-fluid leagueimg" src={x.playerImage} />
                <div className="d-block">
                  <Link to={`/player/${x.playerId}`}>
                    <br />
                    <p className="ml-2 tablehead">{x.playerName}</p>
                  </Link>
                </div>
              </div>
            );
          })
          ) : (
            <div className="alert alert-danger" role="alert">
              You don't follow any Player!!!
            </div>
          )}
      </div>
    </div>

    <div className="col-md-4 offset-md-2"> {/* Skip one column from the right */}
      <div className="row mt-3 wsk-cp-matches align-items-start">
        <h4 className="mt-2 mb-2" style={{ color: "white" }}>Team Following List</h4>
        <br />
        <br />
        <hr style={{ background: "#D3D3D3", height: "2px", border: "none", opacity: 0.2 }} />

        {GetFollowedTeamsInfo[0].playerId !== null ?
          (GetFollowedTeamsInfo.map((x) => {
            return (
              <div className="col-md-10 align-items-left">
                <br />
                <br />
                <img alt="playerlogo" className="ml-auto img-fluid leagueimg" src={x.teamLogo} />
                <div className="d-block">
                  <Link to={`/team/${x.teamID}`}>
                    <br />
                    <p className="ml-2 tablehead">{x.teamName}</p>
                  </Link>
                </div>
              </div>
            );
          })
          ) : (
            <div className="alert alert-danger" role="alert">
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


