import React from 'react';
import queries from '../queries';
import '../App.css';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Search from './Search';
const moment = require('moment');

function Landing() {
  // console.log(id)
  const [searchTerm, setSearchTerm] = useState('Kevi');
  let now = new Date();
  let dateString = moment(now).format('YYYY-MM-DD');
  // console.log(dateString)
  const [getDate, setDate] = useState('');
  // console.log(getDate)
  const { loading, error, data, refetch } = useQuery(
    queries.LOAD_FIXTURES,
    {
      fetchPolicy: 'cache-and-network',
      variables: { date: dateString },
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false

    }
  );

  const { loading: LeagueLoading, error: LeagueError, data: LeagueData } = useQuery(
    queries.LOAD_TOP_LEAGUES,
    {
      fetchPolicy: 'cache-and-network',
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false

    }
  );

  const { loading: AllLeagueLoading, error: AllLeagueError, data: AllLeagueData } = useQuery(
    queries.LOAD_LEAGUES,
    {
      fetchPolicy: 'cache-and-network',
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false

    }
  );
  const { loading: searchLoading, error: searchError, data: termData, refetch: searchRefetch } = useQuery(
    queries.SEARCH_PLAYER_BY_NAME,
    {
      fetchPolicy: 'cache-and-network',
      variables: { playerName: searchTerm },
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false

    }
  );
  useEffect(() => {

    async function fetchData() {
      // console.log(searchTerm)
      searchRefetch({
        playerName: searchTerm
      }
      );



    }
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  const searchValue = async (value) => {
    if (value.length === 4) {
      setSearchTerm(value);
    }

  };

  const handleDate = (date) => {
    setDate(date)
    refetch({
      date: date
    }
    );
  }


  if (data && LeagueData && AllLeagueData && termData) {
    let dataFlag
    if(data === undefined){
      dataFlag = false
    }
    else{
      dataFlag = true
    }
    const { FixtureByDateInformation } = data;
    const { TopLeaguesInformation } = LeagueData;
    const { LeagueInformation } = AllLeagueData;
    const { SearchPlayerByName } = termData;
    let searchFlag = false
    if (SearchPlayerByName === null) {
      searchFlag = false


    }
    else {
      searchFlag = true

    }
    return (
      <div class="row justify-content-center" id='home' >

        <div class="col-md-3">
          <div className="wsk-cp-matches" >
            <h1 className='tl_header'>Top Leagues</h1> <br></br>
            {TopLeaguesInformation.map((x) => {
              // console.log(x.id)
              return (
                <Link to={`/league/${x.id}`}>
                  <div className='row col-md-12'>
                    <div  class="btn top-leagues" >
                      <div class="row m-6">
                        <div class="col-md-4">
                          <div>
                            <img alt="Leaguelogo" class=" ml-auto img-fluid leagueimg" src={x.logo} />
                          </div>
                        </div>
                        <div class="col-md-6  ">
                          <div>
                            <p>{x.leagueName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                  </div>
                </Link>
              )
            })}
            <br></br>
            <br></br>
          </div>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>All Leagues</Accordion.Header>
              <Accordion.Body>
                {LeagueInformation.map((x) => {
                  return (
                    <div className='row col-md-12'>
                      <div  class="btn all-leagues">
                        <div class="row m-6">
                          <div class="col-md-4">
                            <div>
                              <img alt="Leaguelogo" class=" ml-auto img-fluid leagueimg" src={x.logo} />
                            </div>
                          </div>
                          <div class="col-md-6  ">
                            <div>
                              <p>{x.leagueName}</p>
                            </div>
                          </div>
                        </div>
                      </div> <br></br>
                    </div>
                  )
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>



        <div class="col-md-6">
          <div className="wsk-cp-matches" >

            <label htmlFor="date-picker-input">Select a date:</label>
            <DatePicker
              id="date-picker-input"
              selected={getDate}
              onChange={(date) => handleDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText={getDate || dateString}
            />            <br></br>
            <br></br>
            {FixtureByDateInformation.length ? 
            (FixtureByDateInformation.map((x) => {
              return (
                <div class="row matches m-3">
                  <div class="col-md-3  d-flex align-items-center mt-4 mt-md-0">
                    <div>
                      <Link to={`/team/${x.homeTeamID}`}>
                      <p className='teamname'>{x.homeTeamName}</p>
                      </Link>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div>
                      <img alt="Home team" class="img-fluid teamimg" src={x.homeTeamLogo} />
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div>
                      <p className='teamname'>{x.matchTime}</p>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div>
                      <img alt="Home team" class="img-fluid teamimg" src={x.awayTeamLogo} />
                    </div>
                  </div>
                  <div class="col-md-3  d-flex align-items-center mt-4 mt-md-0">
                    <div>
                    <Link to={`/team/${x.awayTeamID}`}>
                      <p className='teamname align-text-left'>{x.awayTeamName}</p>
                    </Link>
                    </div>
                  </div>
                </div>
              )
            })
          ): (
            <div class="alert alert-danger" role="alert">
                No Match scheduled on this date!!!
            </div>
          )}
            
          </div>
        </div>


        <div class="col-md-3">

          <div className="wsk-cp-matches">
            <Search searchValue={searchValue} />
            <br></br>
            <br></br>


            {searchFlag && SearchPlayerByName.length ? (
              SearchPlayerByName.map((x) => {

                return (
                  <div className='row'>
                    <Link to={`/player/${x.playerID}`}>
                      <p className="tablehead text-left">{x.playerName}</p>
                    </Link>
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
              })
            ) : 
            (
              
               <div class="alert alert-danger" role="alert">
                No search data !! please enter 4 character to search player!
              </div>


            )}


          </div>

        </div>





      </div>

    )

  }
  else if (loading || LeagueLoading || AllLeagueLoading || searchLoading) {

    return <div class="spinner-border m-5" role="status">

    </div>
  }
  else if (error || LeagueError || AllLeagueError || searchError) {
    return <div class="alert alert-danger" role="alert">
      {error.message || LeagueError.message || AllLeagueError.message || searchError.message}
    </div>;
  }

}
export default Landing;
