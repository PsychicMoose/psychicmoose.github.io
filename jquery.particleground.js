;(function(window, document) {
  "use strict";
  var pluginName = 'particleground';

  function extend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            deepExtend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }
    return out;
  };

  var $ = window.jQuery;




  function Plugin(element, options) {
    var canvasSupport = !!document.createElement('canvas').getContext;
    var canvas;
    var ctx;
    var particles = [];
    var raf;
    var paused = false;

    var particleColors = ['#FF5733', '#33FF57', '#5733FF', '#F5A623', '#9B59B6', '#2980B9', '#E74C3C'];

    options = extend({}, window[pluginName].defaults, options);

    function init() {
      if (!canvasSupport) { return; }

      // Create canvas
      canvas = document.createElement('canvas');
      canvas.className = 'pg-canvas';
      canvas.style.display = 'block';
      element.insertBefore(canvas, element.firstChild);
      ctx = canvas.getContext('2d');
      styleCanvas();

      // Create exactly 7 particles
      var numParticles = 50;

      for (var i = 0; i < numParticles; i++) {
        var x = (i + 1) * (canvas.width / (numParticles + 1));  // Spread particles horizontally
        var y = (i + 1) * (canvas.height / (numParticles + 1));
        var p = new Particle(x,y);
        p.color = particleColors[i % particleColors.length];
        p.setStackPos(i);
        particles.push(p);
      }

      window.addEventListener('resize', function() {
        resizeHandler();
      }, false);

      draw();
      hook('onInit');
    }


    document.addEventListener("DOMContentLoaded", function() {
      var textElement = document.getElementById('intro');
      var textRect = textElement.getBoundingClientRect();  // Get the text's bounding box
   });

    function styleCanvas() {
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;
      ctx.lineWidth = options.lineWidth;
    }

    function draw() {
      if (!canvasSupport) { return; }

      // Instead of clearing the entire canvas, we use a fade effect to keep the trails
      //ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';  // Adjust alpha for trail persistence
      //ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (var i = 0; i < particles.length; i++) {
        particles[i].updatePosition();
        particles[i].draw();
      }

      if (!paused) {
        raf = requestAnimationFrame(draw);
      }
    }

    function resizeHandler() {
      styleCanvas();
    }

    function pause() {
      paused = true;
    }

    function start() {
      paused = false;
      draw();
    }

    function Particle(x, y) {
      this.active = true;
      this.layer = Math.ceil(Math.random() * 3);
      this.position = {
        x: x,
        y: y
      };
    
      // Initialize previous position for trail
      this.previousPosition = { x: this.position.x, y: this.position.y };
    
      // Random speed for each particle
      this.speed = {
        x: (Math.random() * 2 - 1) * options.maxSpeedX * 2,
        y: (Math.random() * 2 - 1) * options.maxSpeedY * 2
      };
    }

    

    Particle.prototype.draw = function() {
      // Draw particle as a circle
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, options.particleRadius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    
      // Draw the trail as a line (with a different radius/width)
      ctx.beginPath();
      ctx.moveTo(this.previousPosition.x, this.previousPosition.y);  // Previous position for trail
      ctx.lineTo(this.position.x, this.position.y);  // Current position
      ctx.strokeStyle = this.color;
      ctx.lineWidth = options.trailWidth;  // Use a different width for the trail
      ctx.stroke();
    
      // Update previous position for the next frame
      this.previousPosition = { x: this.position.x, y: this.position.y };
    };

    Particle.prototype.updatePosition = function() {
      // Random chance to switch direction randomly
      if (Math.random() < 0.01) {
        this.speed.x = (Math.random() * 2 - 1) * options.maxSpeedX;
        this.speed.y = (Math.random() * 2 - 1) * options.maxSpeedY;
      }
    
      // Apply small curving to the motion
      this.speed.x += (Math.random() - 0.5)*3;
      this.speed.y += (Math.random() - 0.5)*3;
    
      // Update particle position
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
    
      // Randomize direction after bouncing
      if (this.position.x > canvas.width || this.position.x < 0) {
        this.speed.x = (Math.random() * 2 - 1) * options.maxSpeedX;
      }
      if (this.position.y > canvas.height || this.position.y < 0) {
        this.speed.y = (Math.random() * 2 - 1) * options.maxSpeedY;
      }
    };
    
    

    Particle.prototype.setStackPos = function(i) {
      this.stackPos = i;
    }

    function hook(hookName) {
      if (options[hookName] !== undefined) {
        options[hookName].call(element);
      }
    }

    init();

    return {
      start: start,
      pause: pause,
    };
  }

  window[pluginName] = function(elem, options) {
    return new Plugin(elem, options);
  };

  window[pluginName].defaults = {
    minSpeedX: 1.0,
    maxSpeedX: 5,
    minSpeedY: 1.0,
    maxSpeedY: 5,
    particleRadius: 3,  // Size of particles
    trailWidth: 1,       // Width of the trail
    lineWidth: 3        // Width of particle lines (for the actual particle)
  };

})(window, document);
