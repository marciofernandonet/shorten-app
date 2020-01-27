import React, { Component } from 'react';
import api from './services/api';
import './App.css';

export default class App extends Component{
  
  state = {
    url: '',
    CUSTOM_ALIAS: '',
    url_sht: '',
    error: false
  };
  
  handleInputUrl = event =>{
    this.setState({ url: event.target.value });
  }

  handleInputAlias= event =>{
    this.setState({ CUSTOM_ALIAS: event.target.value });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { url, CUSTOM_ALIAS } = this.state;

    if(!url)
      return;

    const response = await api.put('/create?:url', { url, CUSTOM_ALIAS });   

    if(response.status === 201)
      return this.setState({ url: '', CUSTOM_ALIAS: '', url_sht: response.data.url, error: false });

    if(response.data.ERR_CODE === "001")
      this.setState({ error: true });
  }
  
  render(){
    return (
      <div className="form-section">
        <h1 className="page-title">Shorten URL</h1>
        <form onSubmit={this.handleSubmit} className="shorten-form">
          <input 
            className="inputs input-url"
            type="url" 
            placeholder="Insira a url"
            value={this.state.url}
            onChange={this.handleInputUrl}
            autoComplete="on"
            name="url"
            required
          />
          <input 
            type="text"
            className="inputs input-alias" 
            name="alias" 
            value={this.state.CUSTOM_ALIAS}
            onChange={this.handleInputAlias}
            maxLength="15"
            placeholder="Alias"/>
          <button type="submit" className="submit-button">Shorten</button>
        </form> 
        <a className="shorten-result" onClick={()=> window.open(this.state.url_sht, "_blank")} href={this.state.url_sht}>
          { this.state.url_sht }
        </a>
        {this.state.error && <div className="error">
          CUSTOM ALIAS ALREADY EXISTS
        </div>}
      </div>
    );
  }
}