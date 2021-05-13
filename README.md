## Sudoku Solver

A simple web app that pulls today's New York Times sudoku games and provides a client showing a solution using a backtracking algorithm.

### Setup

If you would like to host this yourself - clone the repo and then navigate to the server folder. Change the .env.sample port to an open local port and rename the file to .env. Start the API by running -

```sh
npm install 
npm start
```

To run the client, just host the client folder on your CDN of choice and point the config.js url to your api!