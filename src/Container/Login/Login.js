import React, { Component } from 'react';

import axios from '../../axios';
import { Redirect} from "react-router-dom";
import GitHubLogin from 'react-github-login';
import  "./Login.css";
class App extends Component {
  state={
 redirect:false
  }
    componentDidMount(){
     const token=localStorage.getItem('bearertoken');
     console.log(token)
     if(token!=null ){
       this.setState({redirect:true})
     }

    }
  render() {

    const onSuccessGithub = (response) => {
      console.log(response)
      let token=response.code;
  
      axios.get(`https://shivamappknit.herokuapp.com/home?code=${token}`, {
        
        
      }).then((response) => {
        console.log(response.data.access_token)
        localStorage.setItem('bearertoken',response.data.access_token)
        this.setState({redirect:true})
      })
  
    } 
    var login = 
    <div className="wrapper" >
    <div className="section1">
      <h1 className="card_header">Authenticate With Github</h1>
     <div className="gitbtn" >
    
     <GitHubLogin clientId="05b2c06ebeba2245e71d"
                onSuccess={onSuccessGithub}
                buttonText="Login with Github"
                className="git-login"
                valid={true}
                redirectUri="http://localhost:3000/Repo"
              />
            
    </div>
        
        
    
    </div>
    
    </div>;
     if (this.state.redirect) {
      return <Redirect to="/repo"/>;
    }
    
    
    return login
      


  
  }
}

export default App;



