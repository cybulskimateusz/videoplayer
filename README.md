# React Videoplayer
## with THREE.JS 360°

![example](https://i.imgur.com/onBg3Xc.gif)

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
