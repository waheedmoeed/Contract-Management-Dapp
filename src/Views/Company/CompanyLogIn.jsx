import React, {Component} from 'react';

// nodejs library to set properties for components
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import image from "../../Components/assests/images/bg7.jpg";
//Bootstrap
import Alert from 'react-bootstrap/Alert'
import loginPageStyle from "../../Components/assests/styles/loginPage"

//Contracts Abi
import {contractAbi} from '../../contracts-abi/abi.js'

import LogIn from '../Common/LogIn'
import {AppContext} from './CompanyContext' //context consumer to update the context data after sccuessful authentication

//Web3
import Web3 from "web3"

class CompanyLogIn extends Component{
  constructor(props) {
    super(props);
    this.state={
      alertShow: false,
      alertMsg: ""
    }
    this.web3 = undefined
    this.compContract = undefined
    this.authenticateUser = this.authenticateUser.bind(this)
    this.setShow = this.setShow.bind(this)
    this.changeContext = undefined
  }

  async UNSAFE_componentWillMount() {
    if(await this.loadWeb3()){      
      this.web3 = window.web3
      this.setState({
        alertMsg:""
      })      
    }
  }

  //Checking web3 instance present or not
  async loadWeb3() {
    var found = true
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      found=false
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    return found
  }

  authenticateUser(publicAddress, contractAddress){
    let contract = new this.web3.eth.Contract(contractAbi.ownedUpgradeabilityProxy,contractAddress)
    contract.methods.checkOwnerShip(publicAddress).call({from:publicAddress},(error, result)=>{
      console.log(error)
      if(error!==null){
        this.setState({
          alertMsg:"Error occur during login",
          alertShow:true
        })
      }else{
        if(result){
          this.getCompanyDetail(publicAddress, contractAddress)
        }else{
          this.setState({
            alertMsg:"Either Public Address or Contract Address wrong",
            alertShow:true
          })
        }
      }
    })
  }

  async getCompanyDetail(publicAddress, contractAddress){
    this.compContract = new this.web3.eth.Contract(contractAbi.companyContract,contractAddress)
    let name = await this.compContract.methods.getCompanyName().call({from:publicAddress},(error, result)=>{
      if(error === null){
        return result
      }else{
        console.log(error)
        return ""        
      }      
    });
    let addresss = await this.compContract.methods.getEmployeesList().call((error, result)=>{
      if(error === null){
        return result
      }else{
        console.log(error)
        return ""        
      }
    });
    this.changeContext({
      employeesAddress : addresss,
      publicAddress: publicAddress,
      contractAddress: contractAddress,
      companyName:name
    })
  }

  setShow(status){
    console.log('io')
    this.setState({
      alertMsg:"",
      alertShow:status
    })
  }

  render() {
    const { classes} = this.props;
    if(this.web3 === undefined){
      return (
        <div>
          <p>Meta Mask not founded</p>
        </div>
      )
    }else{
      return (       
          <div
            className={classes.pageHeader}
            style={{
              backgroundImage: "url(" + image + ")",
              backgroundSize: "cover",
              backgroundPosition: "top center"
            }}
          >
            <AppContext.Consumer>  
              {context => 
                {
                  return(
                    <div>
                      <Alert variant="danger" show={this.state.alertShow} onClose={()=>this.setShow(false)} dismissible>
                        <Alert.Heading>{this.state.alertMsg}</Alert.Heading>
                      </Alert>
                      {this.changeContext = context.setempAddress}
                      <LogIn authenticateUser={this.authenticateUser}/>
                  </div>
                  )
                }
              }
            </AppContext.Consumer>                  
        </div>
      );
    }  
  }
}

CompanyLogIn.propTypes = {
  classes: PropTypes.object
};

export default withStyles(loginPageStyle)(CompanyLogIn);