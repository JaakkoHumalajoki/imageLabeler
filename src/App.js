import React, { Component } from 'react';
import { createClient } from 'pexels';
import './App.css';
import Background from './components/Background/Background';
import Footer from './components/Footer/Footer';
import Input from './components/Input/Input';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import LabelList from './components/LabelList/LabelList';

const pexelsAPI = process.env.REACT_APP_PEXELS_API_KEY;
const pexelsClient = createClient(pexelsAPI);

const PAT = process.env.REACT_APP_CLARIFAI_API_KEY;
const USER_ID = process.env.REACT_APP_CLARIFAI_USER_ID;
const APP_ID = process.env.REACT_APP_CLARIFAI_APP_ID;

class App extends Component {
  constructor() {
    super();
    this.state = {
      background_url: "",
      photographer: "",
      photographer_url: "",
      input: "",
      image_url: "",
      labels: [],
    };
  }

  componentDidMount() {
    pexelsClient.photos.curated({ per_page: 1 })
      .then(photos => {
        const background_url = photos.photos[0].src.landscape;
        const original_url = photos.photos[0].src.original;
        const photographer = photos.photos[0].photographer;
        const photographer_url = photos.photos[0].photographer_url;
        this.setState({ 
          background_url: background_url,
          input: original_url,
          photographer: photographer,
          photographer_url: photographer_url
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  handleButtonClick = () => {
    this.setState({ 
      image_url: this.state.input,
      labels: ["Loading..."],
    });

    // Asking Clarifai API for image labels

    const raw = JSON.stringify({
      "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
      },
      "inputs": [
      {
          "data": {
          "image": {
              "url": this.state.input,
          }
          }
      }
      ]
  });
  
  const requestOptions = {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
      },
      body: raw
  };

    fetch("https://api.clarifai.com/v2/models/general-image-recognition/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
          const labels = result.outputs[0].data.concepts.map(concept => concept.name);
          this.setState({ labels: labels });
        })
        .catch(error => console.log('error', error));
  }

  render() {
    const { background_url, image_url, input, labels, photographer, photographer_url } = this.state;
    return (
      <div className="App">
        <Background url={background_url} />
        <div className="content">
          <h1>Image Labeler</h1>
          <Input 
            defaultValue={input} 
            onInputChange={this.handleInputChange}
            onButtonClick={this.handleButtonClick}
          />
          <ImageDisplay image_url={image_url} />
          <LabelList labels={labels} />
        </div>
        <Footer photographer={photographer} photographer_url={photographer_url} />
      </div>
    );
  }
}

export default App;
