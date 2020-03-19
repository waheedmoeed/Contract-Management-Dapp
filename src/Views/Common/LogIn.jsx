import React, {Component} from 'react';

// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContractIcon from '@material-ui/icons/Assignment';
import Key from '@material-ui/icons/VpnKey'
// core components
import GridContainer from "../../Components/GridContainer.jsx";
import GridItem from "../../Components/GridItem.jsx";
import Card from "../../Components/Card/Card.jsx";
import CardHeader from "../../Components/Card/CardHeader.jsx";
import CardBody from "../../Components/Card/CardBody.jsx";
import CardFooter from "../../Components/Card/CardFooter.jsx";
import Button from "../../Components/Button.jsx";
import CustomInput from "../../Components/CustomInput.jsx";


import loginPageStyle from "../../Components/assests/styles/loginPage"

class LogIn extends Component{
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      account: "",
      pberror:false,
      conterror: false
    };
    //form processing
    this.publicAddress = ""
    this.contractAddress= ""
    this.helperText1="* Public address of account"
    this.helperText2="* Smart contract address"
    this.formSubmit = this.formSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this) 
    //web3 related obj
    this.web3 = window.web3
    this.validateAddress = this.validateAddress.bind(this)
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

  async UNSAFE_componentWillMount() {
      await this.loadBlockchainData()
  }
  //
  async loadBlockchainData() {
    this.setState({
      account: await this.web3.eth.getAccounts().then(result=>result)
    })
  }

  handleChange(event){
    if(event.target.id === "publicAddress"){
      this.publicAddress = event.target.value
    }else{
      this.contractAddress = event.target.value
    }
  }

  //Return ture only if both address are valid otherwise return false and modifed state to show error
  validateAddress(){
      if(this.web3.utils.isAddress(this.publicAddress)){
        if(this.web3.utils.isAddress(this.contractAddress)){
          return  this.web3.eth.getAccounts().then((result)=>{
            //If account with given public key is not enabled in metamask, then it must be enable first
            // in order to do transactions
            if(result[0] === this.publicAddress){
              return true;
            }else{
              alert("Given public address is not enabled in metamask,\nto proceed forward enable account with provided public key")
              return false;
            }
          })         
        }else{
          this.helperText2= "Invalid Contract Address"
          this.setState({
            conterror:true
          })
        }
      }else{
        this.helperText1= "Invalid Public Address"
        this.setState({
          pberror:true
        })
      }
      return false
  }

  async formSubmit(event){
    event.preventDefault()
    if(this.web3 === undefined){
      alert("Meta Mask not founded")
    }else{
      if(await this.validateAddress()){
              this.props.authenticateUser(this.publicAddress, this.contractAddress)
      }
    }
  }

  render() {
    const { classes} = this.props;
    return (       
          <div className={classes.container}>
            <GridContainer justify="center">            
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} onSubmit={this.formSubmit}>
                    <CardHeader  color="info"  className={classes.cardHeader}>
                      <h4 className ={classes.tlt}>Company Login Panel</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Public Address"                        
                        id="publicAddress"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "alphnumeric",
                          onChange:this.handleChange,
                          autoFocus:true,
                          helpertext:"Incorrect Public Address.",
                          required:true,
                          placeholder:this.state.account[0],
                          startAdornment: (
                            <InputAdornment position="end" >
                              <Key className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                        error={this.state.pberror}
                        helperText={this.helperText1}
                      />
                      <CustomInput
                        labelText="Contact Address"
                        id="contractAddress"
                        formControlProps={{
                          fullWidth: true
                        }}                    
                        inputProps={{
                          type: "alphnumeric",
                          onChange:this.handleChange,
                          required:true,                                 
                          placeholder:'0x8d0b9A0c746E78CB3d73D0c5DB8464Eb35BA6A49',
                          startAdornment: (
                            <InputAdornment position="end">
                              <ContractIcon className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                        error={this.state.conterror}
                        helperText={this.helperText2}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="info" size="lg" type="submit">
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.object
};

export default withStyles(loginPageStyle)(LogIn);