import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Column from 'react-bootstrap/Col'
import CustomInput from '../../Components/CustomInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import Search from '@material-ui/icons/Search'

import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom'

import EmployeesList from './EmployeesList';

import {AppContext} from './CompanyContext'


import '../../Components/assests/styles/Company/employeeContracts.css'


class EmployeeContracts extends React.Component{

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Column lg="3">
                        </Column>
                        <Column lg="7">
                            <div>                                 
                                                                    
                                <CustomInput
                                        labelText="Search Employee"
                                        id="searchEmployee"
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                        type: "alphnumeric",
                                        endAdornment: (
                                            <InputAdornment position="end">
                                            <Search/>
                                            </InputAdornment>
                                        )
                                        }}
                                    />                                  
                            </div>
                            <AppContext.Consumer>
                                {context =><EmployeesList employeeAddress={context.employeesAddress} companyPublicAddress={context.publicAddress} companyContract={context.contractAddress}/> 
                                }                                                           
                            </AppContext.Consumer>                                  
                            <Zoom in>
                                <Fab size="medium" color="primary" aria-label="add" className="fab">
                                    <AddIcon />
                                </Fab>
                            </Zoom>
                            
                                                       
                        </Column>
                        <Column lg="2">
                        </Column>
                    </Row>
                </Container>
             </div>
        )
    }
}

export default EmployeeContracts