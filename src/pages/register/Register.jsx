import React, { useEffect, useState } from 'react';
import "./register.scss";
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { publicRequest } from '../../requestMethods';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

const Register = () => {
    const [file, setFile] = useState("")
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState("");
    const [confPass, setConfPass] = useState("");
    const [passmatch, setPassMatch] = useState(null);

    const [inputs, setInputs] = useState({
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone:"",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      

    })

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser);

    const handleChange = (e) => {
      setInputs(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    // const upload = async () => {
    //   try {
    //     const formData = new FormData();
    //     formData.append("image", file);
    //     const res = await publicRequest.post(`upload`, formData);
    //     return res.data
        
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // const handleRegister = async (e) => {
    //   e.preventDefault()
    //   let imgUrl = "";
    //   if(file) imgUrl = await upload();
    //   try {
    //     const res = publicRequest.post(`auth/register`, {...inputs, image: imgUrl})
    //     login(dispatch, {username: inputs.username, password: inputs.password});
    //     setInputs("");
    //     if(user === null) navigate("/login")
    //     navigate("/")
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const handleRegister = (e) => {
      e.preventDefault();

      const pass = inputs.password;

      if(pass === confPass){

      
    
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
            setUploadProgress(progress)
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                setUploadMessage('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                setUploadMessage('Upload is running');
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
      
                
                try {
                  const res = await publicRequest.post(`auth/register`, {...inputs, image: downloadURL})
                  login(dispatch, {username: inputs.username, password: inputs.password});
                  setInputs("");
                  if(user === null) navigate("/login")
                  navigate("/")
                } catch (error) {
                    console.log(error)
                }
            });
        }
        );
      
      } else {
        setPassMatch(false)
      }
    }



  return (
    <div className='register'>

            <div className="heading">
                <h1 className="title">Register</h1>
                <p className="desc">
                    Fill in the form below to create a new account with us
                </p>

                
            </div>

            <div className="container display">
              {
                file && <img src={URL.createObjectURL(file)} alt="" />
              }
              <form action="" onChange={handleChange}>
                <div className="inputGroup">
                  <label htmlFor="username">Username:</label>
                  <input type="text"  id='username' placeholder='johm22'/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="email">Email:</label>
                  <input type="email"  id='email' placeholder='john@gmail.com'/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="firstname">First name:</label>
                  <input type="text"  id='firstname' placeholder='John'/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="lastname">Last name:</label>
                  <input type="text"  id='lastname' placeholder='Doe'/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="phone">Phone number:</label>
                  <input type="number"  id='phone' placeholder='072 556 8974'/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="streetAddress">Street address:</label>
                  <input type="text"  id='streetAddress' placeholder='12 Rise Street'/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="city">City:</label>
                  <input type="text"  id='city' placeholder='Johannesburg'/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="state">State:</label>
                  <input type="text"  id='state' placeholder='Gauteng'/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="country">Country:</label>
                  <input type="text"  id='country' placeholder='South Africa'/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="zip">Zip code:</label>
                  <input type="number"  id='zip' placeholder='1800'/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="password">Password: {passmatch === false && <span className='passError'>Passwords do not match</span>}</label>
                  <input type="password"  id='password' placeholder=''/>
                </div>
                <div className="inputGroup">
                  <label htmlFor="confirmPassword">Confirm password: {passmatch === false && <span className='passError'>Passwords do not match</span>}</label>
                  <input type="password"  id='confirmPassword' placeholder='' onChange={(e) => setConfPass(e.target.value)}/>
                </div>
                <div className="inputGroup file">
                  <label htmlFor="file" id='files'>Upload profile image: <UploadFileOutlinedIcon className='icon'/></label>
                  <input type="file"  id='file' name="image" placeholder='Doe' style={{display: "none"}}
                    onChange={e => setFile(e.target.files[0])}
                  />
                </div>

                
                <div className="inputGroup">
                    <span className="link">Already have an account? <span>Login here</span></span>
                    <button onClick={handleRegister}>Register</button>
                </div>
              </form>
            </div>
        
    </div>
  )
}

export default Register