import React ,{Component} from "react"

//Holds list of employees address having contract registered in comp contract
export const AppContext = React.createContext();

export class AppProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            employeesAddress : undefined,
            publicAddress: "",
            contractAddress:"",
            companyName:"",
            //To change data in context(all data or only provided data)
            setempAddress: (data) => {
                    this.changeContextdata(data)
            }            
        };
    }

    changeContextdata(data){
        this.setState({ 
            employeesAddress: data.employeesAddress === undefined? this.state.employeesAddress : data.employeesAddress,
            publicAddress: data.publicAddress === undefined? this.state.publicAddress : data.publicAddress,
            contractAddress: data.contractAddress === undefined? this.state.contractAddress : data.contractAddress,
            companyName: data.companyName === undefined? this.state.companyName : data.companyName                  
        });
    }
    render() {
      return (
        <AppContext.Provider value={this.state}>
          {this.props.children}
        </AppContext.Provider>
      );
    }
}