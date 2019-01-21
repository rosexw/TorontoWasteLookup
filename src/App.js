import React, { Component } from 'react';
import './App.css';
import WasteItem from './WasteItem.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ''};

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
  render() {
    const searching = this.state.searching && <div className="searching">Searching...</div>;
    const results = this.state.results && !this.state.searching && this.state.results.map(result => {
      return <WasteItem title={result.title} body={result.body}/>;
    });
    return (
      <div className="App">
      <link rel="icon" type="image/png" href="https://www.toronto.ca/wp-content/themes/cot/img/favicon-32x32.png" size="32x32" />
        <header className="mainHeader">Toronto Waste Lookup</header>
        <div className="search-container">
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Search for an item" value={this.state.searchTerm} onChange={this.handleChange} />
            <button type="submit"><i className="fa fa-search fa-sm fa-flip-horizontal"></i></button>
          </form>
        </div>
        <table className="results">
          {searching}
          {results}
        </table>
      </div>
    );
  }
}

export default App;
