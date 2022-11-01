import React, { Component } from 'react';
import { createClient } from 'pexels';
import './App.css';
import Background from './components/Background/Background';
import Footer from './components/Footer/Footer';
import Input from './components/Input/Input';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';

const client = createClient(process.env.REACT_APP_PEXELS_API_KEY);

class App extends Component {
  constructor() {
    super();
    this.state = {
      background_url: "https://images.pexels.com/photos/14099311/pexels-photo-14099311.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      input: "https://images.pexels.com/photos/14099311/pexels-photo-14099311.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      image_url: "",
    };
  }

  // componentDidMount() {
  //   client.photos.curated({ per_page: 1 })
  //     .then(photos => {
  //       const photo_url = photos.photos[0].src.landscape;
  //       this.setState({ background_url: photo_url });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  handleButtonClick = () => {
    this.setState({ image_url: this.state.input });
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
