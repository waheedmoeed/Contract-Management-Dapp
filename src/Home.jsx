import React, {Component} from 'react';

import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import GridContainer from './Components/GridContainer';
import GridItem from './Components/GridItem';
import Card from './Components/Card/Card';
import Button from './Components/Button';

import PrimaryAppBar from './Components/App';

import homeStyle from './Components/assests/styles/homeStyle'
import image from "./Components/assests/images/bg7.jpg";

class Home extends Component{
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
          cardAnimation: "cardHidden"
        };
    }

    

    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        setTimeout(
          function() {
            this.setState({ cardAnimation: "" });
          }.bind(this),
          700
        );
    }



    render(){
        const {classes} = this.props;
        return(
            <div>
                <PrimaryAppBar/>
                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                }}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[this.state.cardAnimation]}>                                
                                        <Button simple color="info" size="lg" onClick={(event)=>{this.props.history.push("company/")}}>
                                            Company Panel
                                        </Button>
                                        <Button simple color="info" size="lg" onClick={(event)=>{this.props.history.push("employee/")}}>
                                            Employee Panel
                                        </Button>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                </div>
            </div>
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object
  };

export default withStyles(homeStyle)(Home);