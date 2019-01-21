import React, { Component } from 'react';
import './App.css';
import WasteItem from './WasteItem.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      faves: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
    if (event.target.value === "") {
      this.setState({results: []});
    }
  }

  handleSubmit(event) {
    this.setState({searching: true});
    fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const results = data.filter((searchItem) =>
          searchItem.keywords.includes(this.state.searchTerm) || searchItem.title.includes(this.state.searchTerm)
      )
        this.setState({results, searching: false});
      });
    event.preventDefault();
  }

  isFave(wasteItem) {
    return this.state.faves.find(fave => fave.title === wasteItem.title);
  }

  toggleFave(wasteItem) {
    if (this.isFave(wasteItem)){
      this.setState((state) => ({
        faves: state.faves.filter(fave => fave.title !== wasteItem.title),
      }));
    } else {
      this.setState((state) => ({
        faves: [...state.faves, {...wasteItem}],
      }));
    }
  }

  render() {
    const searching = this.state.searching && <div className="searching">Searching...</div>;

    const results = this.state.results && !this.state.searching &&
      this.state.results.map(result => {
        return <WasteItem key={result.title} title={result.title} body={result.body} toggleFave={() => this.toggleFave(result)} isFave={this.isFave(result)}/>;
      });

    const faves = this.state.faves.map(fave => {
      return <WasteItem key={fave.title} title={fave.title} body={fave.body} toggleFave={() => this.toggleFave(fave)} isFave={this.isFave(fave)}/>;
    });

    return (
      <div className="App">
        <header className="mainHeader">Toronto Waste Lookup</header>
        <div className="search-container">
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Search for an item" value={this.state.searchTerm} onChange={this.handleChange} />
            <button type="submit"><i className="fa fa-search fa-sm fa-flip-horizontal"></i></button>
          </form>
        </div>
        {searching}
        <table className="results">
          <tbody>
            {results}
          </tbody>
        </table>
        <div className="faves">
          <h2>Favourites</h2>
          <table className="results">
            <tbody>
              {faves}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
