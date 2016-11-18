// adapted from 
// https://gamedevelopment.tutsplus.com/tutorials/an-introduction-to-spritesheet-animation--gamedev-13099
function Animation(path, frameW, frameH, frameSpeed, endFrame) {
  this.path = path;
  this.frameW = frameW;
  this.frameH = frameH;
  this.frameSpeed = frameSpeed;
  this.endFrame = endFrame;
 
  var currentFrame = 0;  // the current frame to draw
  var counter = 0;       // keep track of frame rate
 
  // Update the animation
  this.update = function() {
    // update to the next frame if it is time
    if (counter == (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % endFrame;
 
    // update the counter
    counter = (counter + 1) % frameSpeed;
  };
}