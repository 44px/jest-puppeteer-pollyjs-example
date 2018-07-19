import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    iframe: null,
    post: null
  };

  fetchData = async () => {
    this.state.iframe.postMessage(JSON.stringify({
      method: 'GET',
      url: 'http://localhost:3001/posts/1'
    }), '*');
  };

  updateData = async () => {
    this.state.iframe.postMessage(JSON.stringify({
      method: 'PUT',
      url: 'http://localhost:3001/posts/1',
      data: {title: 'NewTitle'}
    }), '*');
  };

  componentDidMount() {
    const body = document.querySelector('body');
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:3001/services.html';
    iframe.style.display = 'none';
    body.appendChild(iframe);

    this.setState({
      iframe: iframe.contentWindow
    });

    window.addEventListener('message', async (e) => {
      if (typeof e.data === 'string') {
        const response = await JSON.parse(e.data);
        this.setState({post: response});
      }
    })
  }

  render() {
    return (
      <div className="App">
        <br/>
        <div>
          <button id="fetchData"
                  type="button"
                  onClick={this.fetchData}>
            Fetch data
          </button>
          <span>&nbsp;</span>
          <button id="updateData"
                  type="button"
                  onClick={this.updateData}>
            Update data
          </button>
        </div>
        <br/>
        <div>
          Post title: <span id="postTitle">{this.state.post ? this.state.post.title : '–'}</span>
        </div>
      </div>
    );
  }
}

export default App;
