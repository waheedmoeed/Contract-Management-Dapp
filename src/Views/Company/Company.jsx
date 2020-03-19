import React, {Component} from 'react';
import PrimaryAppBar from '../../Components/App';

import {AppProvider} from './CompanyContext'
import {AppContext} from './CompanyContext'

import CompanyLogIn from './CompanyLogIn';
import CompanyMainPanel from './CompanyMainPanel'




class Company extends Component{
    render(){
        return(            
            <div>  
                <AppProvider>  
                    <AppContext.Consumer>  
                    {context => 
                        {
                           if(context.employeesAddress === undefined && context.companyName=== ""){
                                return(
                                    <div>
                                    <PrimaryAppBar contractAddress ={context.contractAddress} publicAddress={context.publicAddress} companyName= {context.companyName}/>
                                    <CompanyLogIn/>
                                    </div>
                                )
                           }else{
                                return(
                                    <div>
                                    <PrimaryAppBar contractAddress ={context.contractAddress} publicAddress={context.publicAddress} companyName= {context.companyName} />
                                    <CompanyMainPanel/>
                                    </div>
                               )
                           }                        
                        }
                    } 
                    </AppContext.Consumer>                 
                </AppProvider>
          </div>
        )
    }
}


const obj = (Company);
export default obj;