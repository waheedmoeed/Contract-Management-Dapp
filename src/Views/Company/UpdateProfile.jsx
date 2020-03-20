import React from 'react'
import Container  from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Column from 'react-bootstrap/Col'
import Icon from "@material-ui/core/Icon";
import People from '@material-ui/icons/People'
import Date from '@material-ui/icons/DateRange'
import Key from '@material-ui/icons/VpnKey'
import Email from "@material-ui/icons/Email";

import Card from "../../Components/Card/Card.jsx";
import CardHeader from "../../Components/Card/CardHeader.jsx";
import CardBody from "../../Components/Card/CardBody.jsx";
import Button from "../../Components/Button.jsx";
import CustomInput from '../../Components/CustomInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import  '../../Components/assests/styles/Company/UpdateProfile.css'
import Avatar from '../../Components/assests/images/avatar.jpg'

class UpdateProfile extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            imageUrl :Avatar,
            cardAnimaton: "cardHidden"
          };
        this.handleClick = this.handleClick.bind(this);
        this.fileChange = this.fileChange.bind(this);
    }

    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        setTimeout(
          function() {
            this.setState({ cardAnimaton: "" });
          }.bind(this),
          700
        );
      }

    handleChange(event){
        if(event.target.id === "publicAddress"){
          this.publicAddress = event.target.value
        }else{
          this.contractAddress = event.target.value
        }
    }

    render(){
        return(
            <Container>
                <Row>
                    <Column lg="2"></Column>
                    <Column lg="8">
                        <Card className={this.state.cardAnimaton}>    
                            <CardHeader  color="info"  className="cardHeader">
                                <h4 className ="tlt">Create New Contract</h4>
                            </CardHeader>
                            <CardBody>
                                <form className="form">
                                    <CustomInput
                                        labelText="Employee Name"
                                        id="employeeName"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        onChange:this.handleChange,
                                        type: "text",                                        
                                        required:true,
                                        startAdornment: (
                                            <InputAdornment position="end">
                                            <People/>
                                            </InputAdornment>
                                        )
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Cnic Number"
                                        id="cnic"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        type: "text",
                                        onChange:this.handleChange,                                                                      
                                        required:true,
                                        startAdornment: (
                                            <InputAdornment position="end">
                                            <People className="inputIconsColor" />
                                            </InputAdornment>
                                        )
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Company Secret"
                                        id="companySecret"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        type: "alphanumeric",
                                        onChange:this.handleChange,                                                                      
                                        required:true,
                                        startAdornment: (
                                            <InputAdornment position="end">
                                            <Icon className="inputIconsColor">
                                                lock_outline
                                            </Icon>
                                            </InputAdornment>
                                        ),
                                        autoComplete: "off"
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Employee Address"
                                        id="employeeAddress"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        type: "alphanumeric",
                                        onChange:this.handleChange,                                                                      
                                        required:true,
                                        startAdornment: (
                                            <InputAdornment position="end">
                                            <Key></Key>
                                            </InputAdornment>
                                        ),
                                        autoComplete: "off"
                                        }}
                                    /> 
                                    <CustomInput
                                        labelText="Control Authority Address"
                                        id="controlAuthority"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        type: "alphanumeric",
                                        onChange:this.handleChange,                                                                      
                                        required:true,
                                        startAdornment: (
                                            <InputAdornment position="end">
                                            <Key></Key>
                                            </InputAdornment>
                                        )
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Pay In Ether"
                                        id="pay"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        type: "number",
                                        onChange:this.handleChange,                                                                      
                                        required:true,
                                        startAdornment: (
                                            <InputAdornment position="end">
                                            <Email className="inputIconsColor" />
                                            </InputAdornment>
                                        )
                                        }}
                                    />                                    
                                    <CustomInput
                                        labelText="Expiry Date"
                                        id="expiryDate"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        type: "date",
                                        onChange:this.handleChange,                                                                      
                                        required:true,
                                        startAdornment: (
                                            <InputAdornment position="end">
                                            <Date/>                                         
                                            </InputAdornment>
                                        ),
                                        autoComplete: "off"
                                        }}
                                    />
                                    <Button color="info" size="lg" className="submitProfileData" type="submit">
                                    Get it done
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </Column>    
                </Row>     
            </Container>
        )
    }
}

export default UpdateProfile;