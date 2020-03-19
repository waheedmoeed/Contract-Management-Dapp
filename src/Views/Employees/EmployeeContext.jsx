import React ,{Component} from "react"

//Holds list of employees address having contract registered in comp contract
const AppContext = React.createContext();

class AppProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            employeesAdress : undefined,
            publicAddres: "",
            contractAddress:"",
            companyName:"",
            //To change data in context(all data or only provided data)
            setempAddress: (data) => {
                    this.setState({ 
                        employeesAdress: data.empAddress === undefined? this.state.employeesAdress : data.empAddress,
                        publicAddres: data.publicAddress === undefined? this.state.publicAddress : data.publicAddress,
                        contractAddress: data.contractAddress === undefined? this.state.contractAddress : data.contractAddress,
                        companytName: data.companyName === undefined? this.state.companyName : data.companyName                  
                    });
            }            
        };
    }
    render() {
      return (
        <AppContext.Provider context={this.state}>
          {this.props.children}
        </AppContext.Provider>
      );
    }
  }

export default AppProvider;