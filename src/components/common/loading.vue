<template>
  <div class="loadingHome contents-bck">
    <canvas class="loadingHomeCanvas"></canvas>
  </div>
</template>
<script>
export default {
  name:"loading",
  data(){
    return{

    }
  },
  created() {

  },
  mounted() {
    this.loading()
  },
  methods:{
    loading(){
      var $ = {};

      $.Particle = function( opt ) {
        this.radius = 7;
        this.x = opt.x;
        this.y = opt.y;
        this.angle = opt.angle;
        this.speed = opt.speed;
        this.accel = opt.accel;
        this.decay = 0.01;
        this.life = 1;
      };

      $.Particle.prototype.step = function( i ) {
        this.speed += this.accel;
        this.x += Math.cos( this.angle ) * this.speed;
        this.y += Math.sin( this.angle ) * this.speed;
        this.angle += $.PI / 64;
        this.accel *= 1.01;
        this.life -= this.decay;

        if( this.life <= 0 ) {
          $.particles.splice( i, 1 );
        }
      };

      $.Particle.prototype.draw = function( i ) {
        $.ctx.fillStyle = $.ctx.strokeStyle = 'hsla(' + ( $.tick + ( this.life * 120 ) ) + ', 100%, 60%, ' + this.life + ')';
        $.ctx.beginPath();
        if( $.particles[ i - 1 ] ) {
          $.ctx.moveTo( this.x, this.y );
          $.ctx.lineTo( $.particles[ i - 1 ].x, $.particles[ i - 1 ].y );
        }
        $.ctx.stroke();

        $.ctx.beginPath();
        $.ctx.arc( this.x, this.y, Math.max( 0.001, this.life * this.radius ), 0, $.TWO_PI );
        $.ctx.fill();

        var size = Math.random() * 1.25;
        $.ctx.fillRect( ~~( this.x + ( ( Math.random() - 0.5 ) * 35 ) * this.life ), ~~( this.y + ( ( Math.random() - 0.5 ) * 35 ) * this.life ), size, size );
      }

      $.step = function() {
        $.particles.push( new $.Particle({
          x: $.width / 2 + Math.cos( $.tick / 20 ) * $.min / 2,
          y: $.height / 2 + Math.sin( $.tick / 20 ) * $.min / 2,
          angle: $.globalRotation + $.globalAngle,
          speed: 0,
          accel: 0.01
        }));

        $.particles.forEach( function( elem, index ) {
          elem.step( index );
        });

        $.globalRotation += $.PI / 6;
        $.globalAngle += $.PI / 6;
      };

      $.draw = function() {
        $.ctx.clearRect( 0, 0, $.width, $.height );

        $.particles.forEach( function( elem, index ) {
          elem.draw( index );
        });
      };

      $.init = function() {
        // let divElement = document.createElement('div');
        // divElement.className = 'loadingHome'
        // $.canvas = document.createElement( 'canvas' );
        $.canvas = document.getElementsByClassName( 'loadingHomeCanvas' )[0];
        $.ctx = $.canvas.getContext( '2d' );
        $.width = 300;
        $.height = 300;
        $.canvas.className = 'loadingHomeCanvas';
        $.canvas.width = $.width * window.devicePixelRatio;
        $.canvas.height = $.height * window.devicePixelRatio;
        $.canvas.style.width = $.width + 'px';
        $.canvas.style.height = $.height + 'px';
        $.canvas.style.position = 'fixed';
        $.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        $.min = $.width * 0.5;
        $.particles = [];
        $.globalAngle = 0;
        $.globalRotation = 0;
        $.tick = 0;
        $.PI = Math.PI;
        $.TWO_PI = $.PI * 2;
        $.ctx.globalCompositeOperation = 'lighter';
        // document.body.insertBefore(divElement,document.body.firstChild)
        // divElement.appendChild( $.canvas)
        $.loop();
      };

      $.loop = function() {
        requestAnimationFrame( $.loop );
        $.step();
        $.draw();
        $.tick++;
      };

      $.init();
    }
  }

}
</script>
<style >
  .loadingHome{
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 50;
    background-color: #202223;
  }
  .loadingHomeCanvas{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
