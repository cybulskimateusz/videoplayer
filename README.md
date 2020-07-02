# React Videoplayer
## with THREE.JS 360°

![image](https://i.imgflip.com/4720ra.gif)

### Functions:

* smooth transition between routes
* custom hotspots 
* spherical videos with camera controller

### Instruction:

1. Clone repo
2. Put "video.mp4" file into src directory (cors-origin rules requires your file on the same server to work properly)
3. Set time, title, imageUrl and description as an object in array, and add the array as a "hotspots" prop in index.jsx App markup. (time and title is required)
4. If your video is spherical, you have to set "spherical" property on App markup.

### Example of code: 
```const hotspots = [{ time: 5, title: 'example1', imageUrl: 'https://cdn.pixabay.com/photo/2019/07/28/07/03/kitty-4368029_960_720.jpg' }, { time: 7, title: 'example2', description }];
ReactDOM.render(
  <App hotspots={hotspots} video={video} spherical />,
  document.querySelector('#root'),
);
```

### Commands:
* npm start - webpack-dev-server
* npm build - build dist
* npm run test - testing with jest
* npm run test:watch - test with watching
* npm run lint - check eslint
* npm run lint:fix - fix eslint
* npm run stylelint - check stylesheets formatting
* npm run stylelint:fix - fix stylesheets formatting
