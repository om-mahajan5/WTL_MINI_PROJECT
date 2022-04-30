import React, { useContext, useState } from 'react'
import {auth} from '../Firebase/firebase';
import {signOut} from 'firebase/auth'

import styles from './DashBoard.module.css';
import { DataContext, UserContext } from '../DataContext';
import axios from 'axios';


function DashBoard() {

    const {userDetails,setUserDetails} = useContext(UserContext);
    const [noticeBoardOpen, setNoticeBoardOpen] = useState(false);
    const [notices,setNotices] = useState([]);
    const [groups,setGroups] = useState([]);

    axios.get('https://jsonplaceholder.typicode.com/albums').then((res)=>{
        setGroups(res.data);
    })
    const signoutWithFirebase = ()=>{

        signOut(auth).then((re)=>{
            console.log(re);
        }).catch((err)=>{
            console.log(err);
        })
        
    }
    
  return (
    <div className={styles.mainContainer} >
            <button onClick={signoutWithFirebase} > SignOut </button>
            <h1>{ userDetails.displayName }</h1>
        <div className={styles.dashBoard} >
            <DataContext.Provider value={{noticeBoardOpen,setNoticeBoardOpen,notices,setNotices,groups,setGroups}}>

            {
                !noticeBoardOpen?<GroupContainer/>:<NoticeContainer/>
                
            }
            </DataContext.Provider>

        </div>
    </div>
  )

 

}



function GroupContainer(props){
    const {groups,setGroups} = useContext(DataContext) 
    return(
        <div className={styles.groupContainer}>
                
                {groups.map((item)=>{
                    return (<GroupComponent id={item['id']} name={item['title32q1   BNM,']} />)
                })}

            </div>
    )
}
function GroupComponent(props){
    const { noticeBoardOpen , setNoticeBoardOpen,notices,setNotices} = useContext(DataContext);
    const {id, name} = props;
    return(
        <div onClick={()=>{
                axios.get('https://jsonplaceholder.typicode.com/posts').then((res)=>{
                console.log(res.data);
                setNotices(res.data);
                setNoticeBoardOpen(true)
            })
            }}  className={styles.groupComponent} >
            <h3>{name}</h3>

        </div>
    )
}

function NoticeContainer(props){
    
    const { noticeBoardOpen , setNoticeBoardOpen,notices,setNotices} = useContext(DataContext);
    return(
        <div>
                <button onClick={()=>{setNoticeBoardOpen(false)}} >x</button>
                {notices.map((item)=>{
                    return (<NoticeComponent id={item['id']} title={item['title']}content={item['body']} timestamp={item['timestamp']} />)
                })} 
        </div>
    )
}

function NoticeComponent(props){
    
    const {id,content,title,timestamp} = props;
    return(
        <div className={styles.noticeComponent}>
            <h3>{title}</h3>
            <p> {content} </p>
        </div>
    )
}



export default DashBoard