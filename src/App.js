import React, { Component } from 'react';
import { createClient } from 'pexels';
import './App.css';
import Background from './components/Background/Background';
import Footer from './components/Footer/Footer';
import Input from './components/Input/Input';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';

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
      input: "",
      image_url: "",
      concepts: [],
    };
  }

  componentDidMount() {
    pexelsClient.photos.curated({ per_page: 1 })
      .then(photos => {
        const photo_url = photos.photos[0].src.landscape;
        this.setState({ background_url: photo_url, input: photo_url});
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  handleButtonClick = () => {
    this.setState({ image_url: this.state.input });

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
          const concepts = result.outputs[0].data.concepts.map(concept => concept.name);
          this.setState({ concepts: concepts });
          console.log(concepts);
        })
        .catch(error => console.log('error', error));
  }

  render() {
    const { background_url, image_url } = this.state;
    return (
      <div className="App">
        <Background url={background_url} />
        <div className="content">
          <h1>Image Labeler</h1>
          <Input 
            defaultValue={background_url} 
            onInputChange={this.handleInputChange}
            onButtonClick={this.handleButtonClick}
          />
          <ImageDisplay image_url={image_url} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
