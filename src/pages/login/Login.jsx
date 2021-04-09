import './login.css'
import {useAuth} from '../../auth-context'

const Login = () => {
    
    const {loginUserWithCredentials,isLoading} = useAuth();        
    
    const formSubmit = async(event) => {         
        event.preventDefault()
        event.stopPropagation()
        if(!event.target.checkValidity()){                
            event.target.classList.add('was-validated')
        }
        else{
            const email = event.target[0].value;
            const password = event.target[1].value;
            loginUserWithCredentials(email, password);            
        }        
    }

    return (
        <div className="flex h-center">
            <form class="form needs-validation" noValidate onSubmit={(event) => formSubmit(event)}>
                <div class="form-row">
                    <p class="form-field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Email" name="email" required/>  
                        <span class="error-msg">Please enter valid email</span>
                        <span class="success-msg">Looks Good</span>
                    </p>                     
                </div>   
                <div class="form-row">              
                    <p class="form-field">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Password" required/>
                        <span class="error-msg">Please enter valid password</span>
                        <span class="success-msg">Looks Good</span>
                    </p>
                </div>                           
                <div>
                    {!isLoading && <button class="btn-solid primary">Login</button>}
                    {isLoading && <button class="btn-solid secondary">Validating Inputs...</button>}
                </div>                                  
            </form>
        </div>
    )
}

export default Login