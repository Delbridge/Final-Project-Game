// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// var scene = new THREE.Scene();

// var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

// // var controls = new THREE.OrbitControls( camera );

// //controls.update() must be called after any manual changes to the camera's transform
// camera.position.set( 0, 20, 100 );
// // controls.update();

// function animate() {

// 	requestAnimationFrame( animate );

// 	// required if controls.enableDamping or controls.autoRotate are set to true
// 	// controls.update();

// 	renderer.render( scene, camera );

// }


// // OrbitControls( object : Camera, domElement : HTMLDOMElement )

 
//     // // Scene
//     // var scene = new THREE.Scene();
 
//     // // Camera
//     // var camera = new THREE.PerspectiveCamera(45, 4/3, .5, 100);
//     // camera.position.set(2, 2, 2);
//     // camera.lookAt(0, 0, 0);
 
//     // // Orbit Controls
//     // var controls = new THREE.OrbitControls(camera);
//     // // Something to look at
//     // scene.add(new THREE.Mesh(
//     //     new THREE.BoxGeometry(1, 1, 1), 
//     //     new THREE.MeshBasicMaterial({
//     //         color: 0xff0000,
//     //         wireframe: true
//     //     })));
 
//     // // Render
//     // var renderer = new THREE.WebGLRenderer();
//     // renderer.setSize(320, 240);
//     // document.getElementById('demo').appendChild(renderer.domElement);
//     // // loop
//     // function animate() {
 
//     //     requestAnimationFrame(animate);
//     //     controls.update();
//     //     renderer.render(scene, camera);
 
//     // };
 
//     // animate();
 

var worldRadius=26;

var sides=40;
var tiers=40;
var sceneWidth;
var sceneHeight;
var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var rollingSpeed=0.005;
var characterRollingSpeed;
var cubeRadius=0.2;
characterRollingSpeed=(rollingSpeed*worldRadius/cubeRadius)/5;
var characterBaseY=1.9;
var bounceValue=0.1;
// var gravity=0.005;
var leftLane=-1;
var rightLane=1;
var middleLane=0;
var currentLane;
// var clock;
var jumping;



var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
			var renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setClearColor(0x777); 
            document.body.appendChild( renderer.domElement );
            sceneWidth=window.innerWidth;
            // document.onkeydown = handleKeyDown;


   
	var sphereGeometry = new THREE.SphereGeometry( worldRadius, sides,tiers);
	var sphereTexture = new THREE.TextureLoader().load( 'images/checkerboard.png' );
	sphereTexture.wrapS = sphereTexture.wrapT = THREE.RepeatWrapping; 
	sphereTexture.repeat.set( 20, 20 )
	var sphereMaterial = new THREE.MeshBasicMaterial( { map: sphereTexture, side: THREE.DoubleSide } ); 
	// var sphereMaterial = new THREE.MeshPhongMaterial( {  color: 0xffffff, shading:THREE.FlatShading} );
    rollingGroundSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    	rollingGroundSphere.rotation.z=-Math.PI/2;
        rollingGroundSphere.position.y=-24;
        rollingGroundSphere.position.z=2;
            scene.add(rollingGroundSphere);
            

var geometry = new THREE.SphereGeometry( 0.5, 0.5, 2 );
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
           jumping=false;
            var cube = new THREE.Mesh( geometry, material );
            cube.receiveShadow = true;
            cube.castShadow=true;
            scene.add( cube );
            cube.position.y=characterBaseY;
            cube.position.z=4.8;
            currentLane=middleLane;
            cube.position.x=currentLane;

            // cube.position.y= 2;
            // cube.position.x= 0;
            // cube.position.z= 4.5;

			
            

            camera.position.z = 6.5;
            camera.position.y = 2.5;
            animate();
			function animate() {
				requestAnimationFrame( animate );
                // rollingGroundSphere.rotation.x += rollingSpeed;
                // // obstacle.rotation.x +=0.1;
                // cube.rotation.x -= characterRollingSpeed;
                // if(cube.position.y<=characterBaseY){
                //     jumping=false;
                //     bounceValue=(Math.random()*0.04)+0.005;
                // }
                // cube.position.y+=bounceValue;
                // cube.position.x=THREE.Math.lerp(cube.position.x,currentLane, 2*clock.getDelta());//clock.getElapsedTime());
                // bounceValue-=gravity;
                // if(clock.getElapsedTime()>obstacleReleaseInterval){
                //     clock.start();
                //     addPathObst();
                //     if(!hasCollided){
                //         score+=2*obstacleReleaseInterval;
                //         scoreText.innerHTML=score.toString();
                //     }
                // }
				// cube.rotation.x += 0.01;
                // cube.rotation.y += 0.01;
         function handleKeyDown(keyEvent){
         if(jumping)return;
	var validMove=true;
	if ( keyEvent.keyCode === 65) {//left
		if(currentLane==middleLane){
			currentLane=leftLane;
		}else if(currentLane==rightLane){
			currentLane=middleLane;
		}else{
			validMove=false;	
		}
	} else if ( keyEvent.keyCode === 68) {//right
		if(currentLane==middleLane){
			currentLane=rightLane;
		}else if(currentLane==leftLane){
			currentLane=middleLane;
		}else{
			validMove=false;	
		}
	}else{
		if ( keyEvent.keyCode === 87){//up, jump
			bounceValue=0.1;
			jumping=true;
		}
		validMove=false;
	}
	//characterSphere.position.x=currentLane;
	if(validMove){
		jumping=true;
		bounceValue=0.06;
	}
            
         }
				renderer.render( scene, camera );
			};

            // function keyDown(event){
            //     keyboard[KeyEvent.keyCode] = true;
            // }
            
            // function keyUp(event){
            //     keyboard[keyEvent.keyCode] = false;
            // }
            
            // window.addEventListener('keydown', keyDown);
            // window.addEventListener('keyup', keyUp);
            
            // window.onload = init;
			

