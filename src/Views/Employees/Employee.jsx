import React, {Component} from 'react';
import PrimaryAppBar from '../../Components/App';

import AppProvider from './EmployeeContext'
import EmployeeLogin from './EmployeeLogIn';
import EmployeeMainPanel from './EmployeeMainPanel'


class Employee extends Component{
    render(){
        return(            
            <div>  
                <AppProvider>    
                    {(context) => 
                        {
                           if(context.employeesAdress.length === undefined || context.companyName=== ""){
                                return(
                                    <div>
                                    <PrimaryAppBar contractAddress ={context.contractAddress} publicAddress={context.publicAddres} companyName= {context.companyName} image ={"https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}/>
                                    <EmployeeLogin/>
                                    </div>
                                )
                           }else{
                                return(
                                    <div>
                                    <PrimaryAppBar contractAddress ={context.contractAddress} publicAddress={context.publicAddres} companyName= {context.companyName} image ={"https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}/>
                                    <EmployeeMainPanel/>
                                    </div>
                               )
                           }                        
                        }
                    }                  
                </AppProvider>
          </div>
        )
    }
}


const obj = (Employee);
export default obj;