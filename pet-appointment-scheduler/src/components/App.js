import React from 'react';
import { without , findIndex} from 'lodash';
import AddAppointmens from './AddAppointments'
import '../css/App.css';
import SearchAppointmens from './SearchAppointments';
import ListAppointments from './ListAppointments';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myName: 'Ngozi',
      formDisplay: false,
      lastIndex: 0,
      orderBy: 'petName',
      orderDir: 'desc',
      queryText: '',
      myAppointments: []
    }
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.SearchApts = this.SearchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  addAppointment(apt) {
    let tempApt = [...this.state.myAppointments];
    apt.aptId = this.state.lastIndex;
    tempApt.unshift(apt);
    this.setState({
      myAppointments: tempApt,
      lastIndex: this.state.lastIndex + 1
    });
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map((item) => {
          item.aptId = this.state.lastIndex;
          this.setState({
            lastIndex: this.state.lastIndex + 1
          })
          return item;
        })
        this.setState({
          myAppointments: apts
        })
      });
  }

  toggleForm() {
    this.setState(state => ({
      formDisplay: !state.formDisplay
    }))
  }
  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts
    })
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    })
  }

  SearchApts(query) {
    this.setState({
      queryText: query
    })
  }

  updateInfo(name, value, id){
    let tempApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {
      aptId: id
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myAppointments: tempApts
    })
  }

  render() {
    let order;
    let filteredApp = this.state.myAppointments;
    if (this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredApp = filteredApp.sort((a, b) => {
      if (a[this.state.orderBy].toLowerCase() <
        b[this.state.orderBy].toLowerCase()) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    }).filter(eachItem => {
      return (
        eachItem['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
      )
    })
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointmens formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment} />
                <SearchAppointmens
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  SearchApts={this.SearchApts} />
                <ListAppointments 
                appointments={filteredApp}
                deleteAppointment={this.deleteAppointment} 
                updateInfo={this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
