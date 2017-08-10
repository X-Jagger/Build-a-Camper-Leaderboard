import React, {
  Component
} from 'react';
import './App.css';

const QUERY_30DAYS = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const QUERY_AllDAYS = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [{
        "username": "sjames1958gm"
      }],
      test: 1,
    }
    this.fetch30DaysStories = this.fetch30DaysStories.bind(this);
    this.fetchAllDaysStories = this.fetchAllDaysStories.bind(this);
    this.setStories = this.setStories.bind(this);
  }
  componentDidMount() {
    this.fetchAllDaysStories();
  }
  fetch30DaysStories() {
    fetch(QUERY_30DAYS)
      .then(response => response.json())
      .then(results => this.setStories(results))
      .catch(e => e)
  }
  fetchAllDaysStories() {
    fetch(QUERY_AllDAYS)
      .then(response => response.json())
      .then(results => this.setStories(results))
      .catch(e => e)
  }
  setStories(results) {
    //console.log('setState is running');
    //console.log(results);
    this.setState({
      results: results
    })
  }
  render() {
    return (
      <div className="App">
       <Table 
       results={this.state.results}
        fetch30DaysStories = {this.fetch30DaysStories}
        fetchAllDaysStories ={this.fetchAllDaysStories}
       ></Table>  
      </div>
    );
  }
}


class Table extends Component {
  render() {
    const {
      results,
      fetchAllDaysStories,
      fetch30DaysStories
    } = this.props;
    // console.log(results);
    const storiesRows = results.map(
      (result, index) => {
        //console.log(result, index);
        return <StoriesRow
        key = {
          index
        }
        result = {
          result
        }
        index = {
          index
        }
        />
      });

    return (
      <table className="table">
      <caption>Leaderboard</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Caper Name</th>
            <th onClick={() => fetch30DaysStories()}>Points in past 30 days</th>
            <th onClick={() => fetchAllDaysStories()}>All time points</th>
          </tr>
        </thead>
        <tbody>
          {storiesRows}
        </tbody>
        <tfoot className="tfoot">
          By X-Jagger
        </tfoot>
      </table>
    )
  }
}
class StoriesRow extends Component {

  render() {
    // console.log('StoriesRow is running')
    const {
      result,
      index
    } = this.props;
    return (
      <tr>
            <td>{index}</td>
            <td>{result.username}</td>
            <td>{result.recent}</td>
    <td>{result.alltime}</td>
          </tr>
    )
  }
}


export default App;