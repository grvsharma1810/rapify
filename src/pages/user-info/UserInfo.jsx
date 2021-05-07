import './user-info.css'
import {useState} from 'react'
import {useAuth} from '../../providers/AuthProvider'
import {useAxios} from '../../providers/AxiosProvider';

const UserInfo = () => {

    const {loggedInUser} = useAuth();
    const [isEditing,setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);        
    const [showPassword, setShowPassword] = useState(false);
    const [userUpdates,setUserUpdates] = useState(loggedInUser);
    const {updateUserData} = useAuth();        
    const {postData} = useAxios();
    
    const formSubmit = async(event) => {         
        event.preventDefault()
        event.stopPropagation()
        if(!event.target.checkValidity()){                
            event.target.classList.add('was-validated')
        }
        else{            
            setIsLoading(true);
            const response = await postData(`/users/${loggedInUser._id}`, userUpdates);
            if (response.status === 400) {
                alert(response.data.errorMessage)
            } else {
                const user = response.user;
                updateUserData(user)
            }
            setIsLoading(false);
        }        
    }

    return (
        <div className="flex h-center">            
                <div className="flex space-btw mb-1" style={{width:'80%'}}>    
                    <h4 className="text-size-2 mb-1">Hi, {loggedInUser.name}</h4> 
                    {!isEditing && <button onClick={() => setIsEditing(() => true)} className="btn-solid primary">Edit Profile</button>}
                    {isEditing && <button onClick={() => setIsEditing(() => false)} className="btn-solid secondary">Edit Mode On</button>}
                </div>
                <form className="form needs-validation" noValidate onSubmit={(event) => formSubmit(event)}>                     
                    <div className="form-row">
                        <p className="form-field">
                            <label htmlFor="name">Stage Name</label>
                            <input 
                            value={userUpdates.name} 
                            onChange={(event) => setUserUpdates(user => ({...user, name : event.target.value}))}
                            id="name" type="text" placeholder="Stage Name" name="name" 
                            required disabled={!isEditing}/>  
                            <span className="error-msg">Please enter valid name</span>
                            <span className="success-msg">Looks Good</span>
                        </p>                     
                    </div>   
                    <div className="form-row">
                        <p className="form-field">
                            <label htmlFor="avatarUrl">Avatar URL</label>
                            <input 
                            onChange={(event) => setUserUpdates(user => ({...user, avatarUrl : event.target.value}))}
                            value={userUpdates.avatarUrl} 
                            id="avatarUrl" type="url" placeholder="Avatar Url" name="avatarUrl" 
                            disabled={!isEditing}/>  
                            <span className="error-msg">Please enter valid url</span>
                            <span className="success-msg">Looks Good</span>
                        </p>                     
                    </div>   
                    <div className="form-row">
                        <p className="form-field">
                            <label htmlFor="email">Email</label>
                            <input 
                            onChange={(event) => setUserUpdates(user => ({...user,email : event.target.value}))}
                            value={userUpdates.email} 
                            id="email" type="email" placeholder="Email" name="email" 
                            required disabled={!isEditing}/>  
                            <span className="error-msg">Please enter valid email</span>
                            <span className="success-msg">Looks Good</span>
                        </p>                     
                    </div>   
                    <div className="form-row">              
                        <p className="password-field form-field">
                            <label htmlFor="password">Password</label>                            
                            <input 
                            onChange={(event) => setUserUpdates(user => ({...user, password : event.target.value}))}
                            value={userUpdates.password} 
                            id="password" type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="true" 
                            required disabled={!isEditing}/>
                            {!showPassword && <i onClick={() => setShowPassword(() => true)} className="fa fa-eye show-password-icon"></i>}
                            {showPassword && <i onClick={() => setShowPassword(() => false)} className="fa fa-eye-slash show-password-icon"></i>}
                            <span className="error-msg">Please enter valid password</span>
                            <span className="success-msg">Looks Good</span>
                        </p>                        
                    </div>                           
                    <div>
                        {!isLoading && <button className="btn-solid primary" disabled={!isEditing}>Save</button>}
                        {isLoading && <button className="btn-solid secondary" disabled={!isEditing}>Saving...</button>}                        
                    </div>                                                             
                </form>                                                            
        </div>
    )
}

export default UserInfo;