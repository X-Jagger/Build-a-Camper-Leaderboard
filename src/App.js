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
      <Header></Header>
       <Table 
       results={this.state.results}
        fetch30DaysStories = {this.fetch30DaysStories}
        fetchAllDaysStories ={this.fetchAllDaysStories}
       ></Table> 
       <Footer></Footer> 
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
      <table >
      <caption>Leaderboard</caption>
        <thead>
          <tr>
            <th>#</th>
            <th className="caper-name">Caper Name</th>
            <th 
            className="points" 
            onClick={() => fetch30DaysStories()}>
            Points in past 30 days</th>
            <th 
            className="points" 
            onClick={() => fetchAllDaysStories()}>
            All time points</th>
          </tr>
        </thead>
        <tbody>
          {storiesRows}
        </tbody>
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
    let storiesColor = '#e7e8e9';
    if (!(index % 2)) {
      storiesColor = "white"
    }
    return (
      <tr style={{backgroundColor:storiesColor}}>
            <td className="text-center">{index+1}</td>
            <td className="caper-name"><img src={result.img} alt={result.username}/>{result.username}</td>
            <td className="text-center">{result.recent}</td>
    <td className="text-center">{result.alltime}</td>
          </tr>
    )
  }
}
const Footer = () => (

  <footer>
   <div className="footer">
      ***By<a href="https://github.com/X-Jagger">@X-Jagger</a> ***
  </div>

  </footer>

)
const Header = () => (
  <div className="header">
   <a src="https://www.freecodecamp.com"> freeCodeCamp</a>
  </div>
)


export default App;