import React from 'react';
import { useParams } from "react-router-dom";
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useQuery, useMutation } from "@apollo/client";
import NotFoundPage from "./NotFound"
//import Standings from "./Standings";
import TeamSquad from './TeamSquad';
import TeamFixtures from './TeamFixtures';

const SingleTeam = () => {   
    const sessionToken = JSON.parse(sessionStorage.getItem('sessionToken'));
    let userId;
    if(sessionToken){
        userId = sessionToken.Login._id 
    }
    else{
        userId="";
    }

    let { teamId } = useParams();
    let teamID = parseInt(teamId)

   const { loading, error, data, refetch } = useQuery(
        queries.LOAD_TEAM_INFO, {
            fetchPolicy: 'cache-and-network',
            variables:{teamID: teamID},
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
    );

    const [mutate,{loading:followLoading, error:followError, data:followData }] = useMutation(queries.LOAD_TEAM_FOLLOWING);
    const [unmutate,{loading:unfollowLoading, error:unfollowError, data:unfollowData }] = useMutation(queries.LOAD_TEAM_UNFOLLOWING);
    
    const handle_follow = (event) => {
    
        mutate({
            
            variables:{       
                userId: sessionToken.Login._id,
                teamID: teamID,
                
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
                teamID: teamID,
                
            },
            refetchQueries:[{
                query : queries.GET_USER_BY_ID,
                variables:{
                    id:userId
                }
            }]
          
           
      })
          
           
      }


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

        let followers_list;

        const {TeamInformation} = data
         if(userData === undefined){
        followers_list =[]

    }
    else{   
        const {GetUserById} = userData
        followers_list = GetUserById.followingTeamID
        console.log(followers_list)

    }
        console.log(TeamInformation)
        let Flag = false
          if(TeamInformation === null){
            
            return(<div class="alert alert-danger" role="alert">
            Team data not avaiable
            </div>)

          }
          else{

          




        const  SingleTeamInformation  = data

        console.log(SingleTeamInformation.TeamInformation.address);
        return (
            <div class="row justify-content-center" id='home' >
                <div className="row col-md-10 mt-3">
                    <div className="wsk-cp-leagues" >
                        <div className="row d-flex">
                            <div className="col-md-3 d-flex">
                                <img alt="SingleTeamLogo" class="img-fluid SingleLeaguelogo" src={SingleTeamInformation.TeamInformation.teamLogo} />
                                <div className="ml-2 d-block">
                                    <p className='teamname mr-4 mb-0'>{SingleTeamInformation.TeamInformation.countryName}</p>
                                    <p className='singleLeagueh1'>{SingleTeamInformation.TeamInformation.teamName}</p>
                                </div>
                                <div className='d-flex'>
                                        { sessionToken  && sessionToken.Login.isPremium ===true ?(
                                        <>                   
                                            { followers_list.includes(teamID.toString())?(
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
                        <Tabs defaultActiveKey="first">
                            <Tab eventKey="first" title="Standings">
                                {/* <Standings></Standings> */}
                            </Tab>
                            <Tab eventKey="second" title="Squad">
                                <TeamSquad></TeamSquad>
                            </Tab>
                            <Tab eventKey="third" title="Fixtures">
                                <TeamFixtures></TeamFixtures>
                            </Tab>
                        </Tabs>
                    </div>
                </div>

            </div>


        )
    }

}






};



// const [mutate,{loading:followLoading, error:followError, data:followData }] = useMutation(queries.LOAD_TEAM_FOLLOWING);
// const [unmutate,{loading:unfollowLoading, error:unfollowError, data:unfollowData }] = useMutation(queries.LOAD_TEAM_UNFOLLOWING);
// const handle_follow = (event) => {
    
//     mutate({
        
//         variables:{
           
//             userId: userId,
//             teamID: teamID,
            
//         },
//         refetchQueries:[{
//             query : queries.GET_USER_BY_ID,
//             variables:{
//                 id:userId
//             }
//         }]
      
       
//   })
      
       
//   }
//   const handle_unfollow = (event) => {
    
//     unmutate({
        
//         variables:{
           
//             userId: userId,
//             teamID: teamID,
            
//         },
//         refetchQueries:[{
//             query : queries.GET_USER_BY_ID,
//             variables:{
//                 id:sessionToken.Login._id
//             }
//         }]
      
       
//   })
      
       
//   }






// if(loading){
//     return(
//         <div class="spinner-border m-5" role="status">
  
//         </div>
//     )
// } else if (error) {
//     return(
//         <NotFoundPage />
//     )
// }
// if(data){   

//     // console.log(sessionToken.Login.isPremium )
//     let followers_list;

//         const {TeamInformation} = data
//          if(userData === undefined){
//         followers_list =[]

//     }
//     else{   
//         const {GetUserById} = userData
//         followers_list = GetUserById.followingTeamID
//         console.log(followers_list)

//     }
//         console.log(TeamInformation)
//         let Flag = false
//           if(TeamInformation === null){
            
//             return(<div class="alert alert-danger" role="alert">
//             Team data not avaiable
//             </div>)
            
//           }
//       else{
//         return(
        
//             <div class="row justify-content-center" id='home'  >
//                     <div className='col-md-11'>
//                         <div className="wsk-cp-matches mt-3" >
//                               <div className="col-md-10 d-flex">
//                                   <img alt="teamlogo" class=" img-fluid leagueimg" src={TeamInformation.teamLogo} />
//                                   <div className="d-block">
                                  
//                                       {/* <p className="mr-4 tablehead">{TeamInformation.teamName}</p> */}
                                  

//                                   <div className="d-flex"> 
//                                       <p className="ml-2 tablehead">{TeamInformation.teamName}</p>


//                                 <div className='d-flex'>
//                                 { sessionToken  && sessionToken.Login.isPremium ===true ?(
//                                 <>          

//                         { followers_list.includes(teamID.toString())?(
//                             <div className='col-md-4'>
//                             <button className='btn btn-success' onClick={(event) => handle_unfollow()}>UNFOLLOW</button>
//                             </div>
                            
//                         )
//                         : (
//                         <div className='col-md-4'>
//                             <button className='btn btn-success' onClick={(event) => handle_follow(event)}>FOLLOW</button>
//                             </div>)
//                         }
//                         </>
//                     )
                        
                        
//                     :(
//                         <div>
                        
//                     </div>
//                     )
                    
//                     }





//                                   </div>
                                  
//                               </div>
//                               </div>
                                    
//                         </div>
//                     </div>
    
//                     <div className='col-md-11'>
//                         <div className='row'>
//                         <div className='col-md-3 mr-5 ml-2 p-0'>
//                             <div className="wsk-cp-matches " >
//                                 <div className='row'>
//                                 <p className='tablehead'>Team Information</p>
//                             </div>
                        
//                                 <div className='row mt-5'>
//                                     <div className='col-md-6'>
//                                         <p className="tablehead">Founded In</p>
//                                     </div>
//                                     <div className='col-md-6'>
//                                         <p className="tablehead">Team Country</p>
//                                     </div>
//                                 </div>
//                                 <div className='row'>
//                                     <div className='col-md-6'>
//                                         <p className="tablehead">{TeamInformation.founded}</p>
//                                     </div>
//                                     <div className='col-md-6'>
//                                         <p className="tablehead">{TeamInformation.countryName}</p>
//                                     </div>

//                                 </div>
//                             </div>
    
//                         </div>
    
//                         {/* card 2 */}
    
//                         <div className='col-md-3  p-0 mr-2'>
//                             <div className="wsk-cp-matches " >
//                                 <div className='row'>
//                                     <p className='tablehead'>Team Stadium</p>
//                                 </div>
                                
//                                 <div className='row mt-4'>
//                                     <div className='col-md-6'>
//                                         <p className="tablehead">Stadium</p>
//                                     </div>
//                                     <div className='col-md-4'>
//                                         <p className="tablehead">Capacity</p>
//                                     </div>
                                  
                                    
//                                 </div>
//                                 <div className='row '>
//                                     <div className='col-md-6'>
//                                         <p className="tablehead">{TeamInformation.venueName}</p>
//                                     </div>
//                                     <div className='col-md-4'>
//                                         <p className="tablehead">{TeamInformation.capacity}</p>
//                                     </div>
                                   
//                                 </div>
                               
//                             </div>                        
//                           </div>


//                          {/* card 3 */}
    


//                           <div className='col-md-3  p-0 ml-5'>
//                             <div className="wsk-cp-matches " >
//                                 <div className='row'>
//                                     <p className='tablehead'>Stadium Picture</p>
//                                 </div>
                                
//                                 <div className='row mt-4'>
//                                 <div className='col-md-6'>
//                                       <img alt="venueImg" className="img-fluid" width="400" height="400" src={TeamInformation.venueImage} />
//                                     </div>
                                    

                                    
                                    
//                                 </div>
//                                 <div className='row '>
//                                     <div className='col-md-6'>
//                                         <p className="tablehead">{TeamInformation.venueName}</p>
//                                     </div>

                                    
//                                 </div>
                               
//                             </div>                        
//                           </div>




                        
    
//                         </div>
//                     </div>
                    
                    
    
    
    
    
//             </div>
//               </div>  
          
//         )
        
//       }
    
// }

// };

export default SingleTeam;

