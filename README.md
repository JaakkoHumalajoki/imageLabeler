# Image Labeler App

A simple React app to practice state management and handling asynchronous API calls. The image labeler app uses Clarifai AI image recognition API to label any image URL. The app background image is Pexels curated wallpaper from their API which changes daily.

[Link to the App on GitHub Pages](https://jaakkohumalajoki.github.io/imageLabeler/).

## Setup

To install the App locally, run 

> npm install

and rename file .env.example to .env.local. You will need to fill the file with your own API keys from both Pexels and Clarifai, but they can be obtained for free. 

### Pexels

More info on getting Pexels API key can be found [here](https://www.pexels.com/api/).

### Clarifai

I'm using a legacy method of accessing Clarifai API, but anything else would've been far too complicated for this simple app. You can get USER_ID by making an account at https://www.clarifai.com/, you can then make a dummy app and get its APP_ID, and finally going into account -> security -> personal access token is your API_KEY.

## Learning outcome

While making the app from scratch, I learned valuable lessons about CSS layouting, React state management, handling asynchronous requests and problem-solving a complicated API system. The original plan was to also add a backend server to this app, but I decided to save that for a future project.
