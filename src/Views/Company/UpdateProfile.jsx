import React from 'react'
import Container  from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Column from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Icon from "@material-ui/core/Icon";
import People from '@material-ui/icons/People'
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

    fileChange(event){
        if(event.target.files[0] != null){
            this.setState({
                imageUrl : URL.createObjectURL(event.target.files[0])
            })
        }
    }

    handleClick(e) {
        this.refs.fileUploader.click();
    }

    render(){
        return(
            <Container>
                <Card className={this.state.cardAnimaton}>    
                    <CardHeader  color="info"  className="cardHeader">
                        <h4 className ="tlt">Update Profile</h4>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Column lg="4" sm="12">
                                <div className="profileImage">
                                    <input type="file" ref="fileUploader" onChange={(event)=>{this.fileChange(event)}} style={{display: "none"}}/>
                                    <Image src={this.state.imageUrl} roundedCircle thumbnail="true"  className="w3-hover-opacity image" />
                                    <div className="profileToolTip w3-circle" onClick={this.handleClick}>
                                        <h3 >Select Image</h3>
                                    </div>
                                </div>
                                <Button size="lg" color="info" style={{margin:"20px"}}>Upload Image</Button>
                            </Column>
                            <Column lg="6" sm="12">
                                <form className="form">
                                    <CustomInput
                                        labelText="Company name"
                                        id="companyName"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        type: "alphnumeric",
                                        startAdornment: (
                                            <InputAdornment position="end">
                                            <People/>
                                            </InputAdornment>
                                        )
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Email"
                                        id="email"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        type: "email",
                                        startAdornment: (
                                            <InputAdornment position="end">
                                            <Email className="inputIconsColor" />
                                            </InputAdornment>
                                        )
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Password"
                                        id="pass"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        type: "password",
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
                                    <Button color="info" size="lg" className="submitProfileData" type="submit">
                                       Get it done
                                    </Button>
                                </form>
                            </Column>
                        </Row>
                    </CardBody>
                </Card>      
            </Container>
        )
    }
}

export default UpdateProfile;