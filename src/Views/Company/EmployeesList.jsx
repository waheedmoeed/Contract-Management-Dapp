import React from 'react';
import List from '@material-ui/core/List';

import EmployeeContract from './EmployeeContractItem'


class EmployeesList extends React.Component {
    constructor(props){
        super(props);
        this.employeesAddressList = props.employeeAddress
        this.companyPubaddress= props.companyPublicAddress
        this.companyContract = props.companyContract
    }

  render(){
      let listItems =[]
        this.employeesAddressList.forEach(element => {
            listItems.push(<EmployeeContract publicAddress={element} companyPublicAddress={this.companyPubaddress} companyContract={this.companyContract}/>)
        })   
        return (
            <List alignItems="flex-start">
                {listItems}
            </List>
            
        );
    }
}

export default EmployeesList;