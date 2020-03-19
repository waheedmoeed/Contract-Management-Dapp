import React, {Component} from 'react';

// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Key from '@material-ui/icons/VpnKey'
import Email from "@material-ui/icons/Email";
import People from '@material-ui/icons/People';
// core components
import GridContainer from "../../Components/GridContainer.jsx";
import GridItem from "../../Components/GridItem.jsx";
import Card from "../../Components/Card/Card.jsx";
import CardHeader from "../../Components/Card/CardHeader.jsx";
import CardBody from "../../Components/Card/CardBody.jsx";
import CardFooter from "../../Components/Card/CardFooter.jsx";
import Button from "../../Components/Button.jsx";
import CustomInput from "../../Components/CustomInput.jsx";

import PrimaryAppBar from '../../Components/App'

import loginPageStyle from "../../Components/assests/styles/loginPage"

import image from "../../Components/assests/images/bg7.jpg";

class EmployeeSignUp extends Component{
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
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
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <PrimaryAppBar email ={"waheed"} publicAddress={"12214234"} companyName= {"EBManager"} image ={"https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}/>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader  color="info"  className={classes.cardHeader}>
                      <h4 className ={classes.tlt}>Employee SignUp</h4>
                    </CardHeader>
                    <CardBody>
                        <CustomInput
                            labelText="Full Name"
                            id="fullName"
                            formControlProps={{
                            fullWidth: true
                            }}
                            inputProps={{
                            type: "alphnumeric",
                            startAdornment: (
                                <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                                </InputAdornment>
                            )
                            }}
                        />
                        <CustomInput
                            labelText="Public Blockchain Address"
                            id="publicEthAddress"
                            formControlProps={{
                            fullWidth: true
                            }}
                            inputProps={{
                            type: "alphnumeric",
                            startAdornment: (
                                <InputAdornment position="end">
                                <Key className={classes.inputIconsColor} />
                                </InputAdornment>
                            )
                            }}
                        />
                        <CustomInput
                            labelText="Email Address"
                            id="emailAddress"
                            formControlProps={{
                            fullWidth: true
                            }}
                            inputProps={{
                            type: "alphnumeric",
                            startAdornment: (
                                <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
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
                                <Icon className={classes.inputIconsColor}>
                                    lock_outline
                                </Icon>
                                </InputAdornment>
                            ),
                            autoComplete: "off"
                            }}
                        />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="info" size="lg">
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

EmployeeSignUp.propTypes = {
  classes: PropTypes.object
};

export default withStyles(loginPageStyle)(EmployeeSignUp);