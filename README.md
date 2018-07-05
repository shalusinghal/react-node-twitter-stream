This project demonstrates use of React.js and Node.js server to display tweet stream for perticular keywords, and generate tag cloud and heatmap from the stream.

## Structure

### Server

`server` folder contains a Node.js server. It reads tweets from Twitter's Streaming API and publishes them via Socket.io.

### Client

`client` folder contains a React.js application which displays tweets, heatmap and tag cloud.

## Running

 - Create `config.json` file in server and put Twitter's Application Credentials there.
 - Do `npm install` in both client and server.
 - Run the server using `node index.js`
 - Run client in seperate terminal using `npm start`

## Technologies Used

 - **React** - frontend
 - **Bootstrap** - frontend design
 - **Highcharts Maps** - Heatmap
 - **React-Redux** - For managing state
 - **Socket.io** - For streaming tweets from server
