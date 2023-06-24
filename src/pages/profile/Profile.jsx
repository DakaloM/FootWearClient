import React, { useEffect, useState } from 'react';
import "./profile.scss";
import CloseIcon from '@mui/icons-material/Close';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { publicRequest, userRequest } from '../../requestMethods';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { update } from '../../redux/apiCalls';
import { updateUser } from '../../redux/userRedux';
import { useParams } from 'react-router-dom';
import { accessToken } from '../../requestMethods';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

const Profile = () => {

    const [file, setFile] = useState("")
    const [success, setSuccess] = useState(false)
    const [updateProgress, setUpdateProgress] = useState(0);
    const [updateMessage, setUpdateMessage] = useState("");
    const user = useSelector(state => state.user.currentUser)
    const [inputs, setInputs] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        image: user.image,
        streetAddress: user.streetAddress,
        city: user.city,
        state: user.state,
        zip: user.zip,
        country: user.country,
        accessToken: accessToken
    });
    const dispatch = useDispatch();

    console.log("token", accessToken);

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.id] : e.target.value}));
    }

    const upload = async () => {
        try {
          const formData = new FormData();
          formData.append("image", file);
          const res = await userRequest.post(`upload`, formData);
          return res.data
          
        } catch (error) {
          console.log(error)
        }
      }

      const handleUpdate = (e) => {
        e.preventDefault();
      
        const fileName = new Date().getTime() + file.name
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
      
        const uploadTask = uploadBytesResumable(storageRef, file);
      
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setUpdateProgress(progress)
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                setUpdateMessage('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                setUpdateMessage('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log('File available at', downloadURL);
      
                
                const userUpdates = {
                    firstname: inputs.firstname,
                    lastname: inputs.lastname,
                    phone: inputs.phone,
                    image: file? downloadURL : inputs.image,
                    streetAddress: inputs.streetAddress,
                    city: inputs.city,
                    state: inputs.state,
                    country: inputs.country,
                    zip: inputs.zip
                }
                
                try {
                    const res = await userRequest.put(`users/${user._id}`, userUpdates)
                    
                    dispatch(updateUser(res.data))
                    setSuccess(true)
                    setFile();
                    console.log(res.data)
                } catch (error) {
                    console.log(error)
                }
            });
        }
        );
        
      }
  

  
    
    return (
        <div className='Profile'>
           
            <div className="profile-container display">
                
                    <div className="wrapper">
                        <div className="heading top">
                            <h1 className="title">Edit Profile Info</h1>
                            <p className="desc">This is where you can make changes to your profile. Its good to know you better</p>
                        </div>

                        <div className="formContainer">

                            {success && <span className="message">Profile updated successfully!</span>}
                            <div className="contain">

                            
                                <div className="info">

                                    <div className="infoItem">

                                        <span className="title">Your Personal Details</span>
                                        {file? (<img src={URL.createObjectURL(file)} alt="" />) 
                                        :(<img src={user.image ?  user.image : "/img/avatar.jpeg"} alt="" />)}
                                        <span className="name"><BadgeOutlinedIcon className='icon' /> {user.firstname} {user.lastname}</span>
                                        <span className="name"><EmailOutlinedIcon className='icon' /> {user.email}</span>
                                        <span className="name"><PhoneInTalkOutlinedIcon className='icon' />{user.phone}</span>
                                    </div>

                                    <div className="infoItem">

                                        <span className="title">Your Shipping Address</span>
                                        
                                        <div className="item">
                                            <LocationOnOutlinedIcon className='icon'/>
                                            <span>{user.streetAddress} {user.city} {user.state} {user.zip} {user.country}</span>
                                        </div>
                                    </div>
                                </div>
                                <form action="" onChange={handleChange}>
                                    
                                    <div className="wrapper">
                                        
                                        <span className="title">Edit Personal Information</span>
                                        <div className="formWrapper">
                                            <div className="inputGroup">
                                                <label htmlFor="firstname">First name:</label>
                                                <input type="text" id='firstname' placeholder={user.firstname} />
                                            </div>
                                            
                                            <div className="inputGroup">
                                                <label htmlFor="lastname">Last name:</label>
                                                <input type="text" id='lastname' placeholder={user.lastname} />
                                            </div>
                                            
                                            <div className="inputGroup">
                                                <label htmlFor="phone">Phone:</label>
                                                <input type="number" id='phone' placeholder={user.phone} />
                                            </div>
                                            <div className="inputGroup file">
                                                <label className="file" htmlFor="file">Change your profile picture: <UploadFileIcon  className='icon'/></label>
                                                <input type="file" id='file' placeholder='file'  style={{display: "none"}}
                                                    onChange={e => setFile(e.target.files[0])}
                                                />
                                            </div>
                                        

                                            


                                        </div>
                                    </div>
                                    
                                                
                                    <div className="wrapper">
                                        <span className="title">Edit Shipping Information</span>
                                        <div className="formWrapper">
                                            <div className="inputGroup">
                                                <label htmlFor="streetAddress">Street address</label>
                                                <input type="text" id='streetAddress' placeholder={user.streetAddress} />
                                            </div>
                                            <div className="inputGroup">
                                                <label htmlFor="city">City:</label>
                                                <input type="text" id='city' placeholder={user.city} />
                                            </div>
                                            <div className="inputGroup">
                                                <label htmlFor="state">State:</label>
                                                <input type="state" id='state' placeholder={user.state} />
                                            </div>
                                            <div className="inputGroup">
                                                <label htmlFor="country">Country:</label>
                                                <input type="country" id='country' placeholder={user.country} />
                                            </div>
                                            <div className="inputGroup">
                                                <label htmlFor="zip">Zip code:</label>
                                                <input type="zip" id='zip' placeholder={user.zip} />
                                            </div>
                                            {
                                                updateProgress > 0 && (
                                                    <div className="inputGroup progress">
                                                        {updateProgress < 100 ? <span className="progress">{updateMessage} {updateProgress}</span> : <span className="progress">Done</span>}
                                                    </div>
                                                )  
                                            }
                                            
                                            

                                            

                                        

                                        </div>
                                    </div>

                                    <button type='submit' onClick={handleUpdate}>Save</button>
                                </form>
                            </div>

                        </div>


                        
                    </div>
               
            </div>

            <Footer />
        </div>
    )
}

export default Profile