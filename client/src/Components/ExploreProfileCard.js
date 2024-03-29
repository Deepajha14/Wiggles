import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ExploreProfileCard({id, name, breed, gender, bio, image, status}) {
  const navigate=useNavigate();
  const[button, setButton]=useState(status);

  const handleClick=(e)=>{
    navigate("/Profile/" + id);
  }

  const handleConnect=async(event)=>{
    event.stopPropagation();
    if(button==="Pending..."){
      toast.warn("Request already sent!");
      return;
    }
    const response= await fetch("http://localhost:3001/addFriend",{
      method:"POST",
      body : JSON.stringify({
        id,
      }),
      credentials:"include",
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((err)=>{
      console.log(err);
      toast.error("There was an error. Please try again or refresh the page.");
      return;
    })
    const data=await response.json();
    if(data.status==="ok"){
      toast.success("Request successfully sent.");
    }
    setButton("Pending...");
  }

  return (
    <div className='profile-card' onClick={handleClick}>
        <img className='profilePicture' src={image} alt="Profile" />
        <div id="profile-info">
          <div className="primary-info">
              <span id='gender'>{gender} | </span><span id='name'>{name}</span>
          </div>
          <div className="secondary-info">
              <div id='breed'>{breed}</div>
              <div id="bio">
              {bio || <p>Here we will show your bio.</p>}
              </div>
          </div>
          <button id='playdate' onClick={handleConnect}>{button}</button>
        </div>
    </div>
    
  )
}
