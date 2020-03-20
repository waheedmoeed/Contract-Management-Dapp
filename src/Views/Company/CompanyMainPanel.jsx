import React, {Component} from 'react';

import GridItem from '../../Components/GridItem';
import GridContainer from "../../Components/GridContainer";
import NavPills from "../../Components/NavPills";
import pillsStyle from "../../Components/assests/styles/navPillsStyle";

import updateIcon from "@material-ui/icons/Update";
import contractIcon from '@material-ui/icons/Drafts'
import withStyles from "@material-ui/core/styles/withStyles";

import UpdateProfile from './UpdateProfile'
import EmployeeContracts from './EmployeeContracts';

class CompanyMainPanel extends Component{
    render(){
        return(
          <div>                        
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                    <NavPills
                      color="info"
                      horizontal={{
                        tabsGrid: { xs: 12, sm: 4, md: 2, lg:2 },
                        contentGrid: { xs: 12, sm: 8, md: 8 ,lg:10}
                      }}
                      tabs={[
                        {
                          tabButton: "Employee Contracts",
                          tabIcon: contractIcon,
                          tabContent: (
                            <EmployeeContracts/>
                          )
                        },                        
                        {
                          tabButton: "New Employee Contract",
                          tabIcon: updateIcon,
                          tabContent: (
                            <UpdateProfile/>
                          )
                        }                
                      ]}
                    />
                  </GridItem>
                </GridContainer>
            </div>
        )
    }
}


const obj =  withStyles(pillsStyle)(CompanyMainPanel);
export default obj;