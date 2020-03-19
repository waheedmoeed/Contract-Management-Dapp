import React,{ Component } from "react";

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import AvatarIcon from '../../Components/assests/images/avatar.jpg'
//Contracts Abi
import {contractAbi} from '../../contracts-abi/abi.js'

 class EmployeeContract extends Component{
     constructor(props){
         super(props)
         this.state = {
             employeeName :"",
             ipfsDocumentHash : "",
             payInEther :0,
             expiryDate: 0,
             contractAddress :""
         }
         this.employeePublicAddress=props.publicAddress
         this.companyContract = props.companyContract
         this.companyPublicAddress = props.companyPublicAddress
         this.web3 = window.web3
     }

     //Getting employee data
     componentDidMount() {
         //Getting employees contract address from the company contract by providing employees public key
        let contract = new this.web3.eth.Contract(contractAbi.companyContract,this.companyContract)
        contract.methods.getEmployeeContract(this.employeePublicAddress).call({from:this.companyPublicAddress},(error, result)=>{
            if(error === null){
                let empContract = result;
                //Getting employeees contract detail by using addresss provided by the company contract
                let employeeContract = new this.web3.eth.Contract(contractAbi.employeeContract,result);
                employeeContract.methods.getContractDetail().call({from:this.companyPublicAddress},(error, result)=>{
                    if(error === null){ 
                        let exdate = new Date(result[3]*1000)
                        this.setState({
                            employeeName :result[0],
                            ipfsDocumentHash : result[1],
                            payInEther :result[2],
                            expiryDate: exdate.toDateString(),
                            contractAddress :empContract
                        })                        
                    }else{
                        console.log(error)
                    }
                })
            } else{
                console.log(error)                
            }           
        })
     }

     //Modal to perform operation related to employee contract by showing modal
     showControlModal(){

     }


     render(){
        return (               
                    <ListItem alignItems="flex-start" button divider key={this.props.key} onClick={this.showControlModal}>
                        <ListItemAvatar>
                        <Avatar alt="Image Not Found" src={AvatarIcon} style={{width:"80px", height:"80px"}}/>
                        </ListItemAvatar>
                        <ListItemText
                        style={{margin:"20px"}}
                        primary={"Employee Name: "+this.state.employeeName}
                        secondary={
                            <React.Fragment>                    
                            <br/>
                            <Typography
                                component="span"
                                variant="body2"
                                style={{display:"inline"}}
                                color="textPrimary"
                            >
                                {"Employee Publlic Address: "+this.props.publicAddress+" Employee Contract Address: "+this.state.contractAddress}
                                
                            </Typography>
                            </React.Fragment>
                        }
                        />
                        <Divider variant="inset"  component="li"/>
                    </ListItem>  
        )
     } 
 }

export default EmployeeContract;