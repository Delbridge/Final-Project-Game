var sceneWidth;
var sceneHeight;
var camera;
var scene;
var loader;
var renderer;
var dom;
var sun;
var ground;
//var orbitControl;
var rollingGroundSphere;
var characterSphere;
var rollingSpeed=0.005;
var characterRollingSpeed;
var worldRadius=26;
var characterRadius=0.2;
var sphericalHelper;
var pathAngleValues;
var characterBaseY=1.9;
var bounceValue=0.1;
var gravity=0.005;
var leftLane=-1;
var rightLane=1;
var middleLane=0;
var currentLane;
var clock;
var jumping;
var obstacleReleaseInterval=0.5;
var lastObstacleReleaseTime=0;
var obstaclesInPath;
var obstaclesLoop;
var particleGeometry;
var particleCount=20;
var explosionPower =1.06;
var particles;
//var stats;
var scoreText;
var score;
var hasCollided;

init();

function init() {
	// set up the scene
	createScene();
    audio();
	//call game loop
	update();
}

function audio(){
// / create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load( "audio/The Tenacious.mp3", function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});
}

function createScene(){
	hasCollided=false;
	score=0;
	obstaclesInPath=[];
	obstaclesLoop=[];
	clock=new THREE.Clock();
	clock.start();
	characterRollingSpeed=(rollingSpeed*worldRadius/characterRadius)/5;
	sphericalHelper = new THREE.Spherical();
	pathAngleValues=[1.52,1.57,1.62];
    sceneWidth=window.innerWidth;
    sceneHeight=window.innerHeight;
	scene = new THREE.Scene();//the 3d scene
	// loader = new THREE.TextureLoader();
    scene.fog = new THREE.FogExp2( 0x777, 0.14 );
    camera = new THREE.PerspectiveCamera( 60, sceneWidth / sceneHeight, 0.1, 1000 );//perspective camera
    renderer = new THREE.WebGLRenderer({alpha:true});//renderer with transparent backdrop
    renderer.setClearColor(0x000000, 0.2); 
    renderer.shadowMap.enabled = true;//enable shadow
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( sceneWidth, sceneHeight );
    dom = document.getElementById('container');
	dom.appendChild(renderer.domElement);
	//stats = new Stats();
	//dom.appendChild(stats.dom);
	createObstaclesLoop();
	addWorld();
	addcharacter();
	addLight();
	addExplosion();
	
	camera.position.z = 6.5;
	camera.position.y = 2.5;
	/*orbitControl = new THREE.OrbitControls( camera, renderer.domElement );//helper to rotate around in scene
	orbitControl.addEventListener( 'change', render );
	orbitControl.noKeys = true;
	orbitControl.noPan = true;
	orbitControl.enableZoom = false;
	orbitControl.minPolarAngle = 1.1;
	orbitControl.maxPolarAngle = 1.1;
	orbitControl.minAzimuthAngle = -0.2;
	orbitControl.maxAzimuthAngle = 0.2;
	*/
	window.addEventListener('resize', onWindowResize, false);//resize callback

	document.onkeydown = handleKeyDown;
	
	scoreText = document.createElement('div');
	scoreText.style.position = 'absolute';
	//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
	scoreText.style.width = 100;
	scoreText.style.height = 100;
	scoreText.style.color = "yellow";
	scoreText.innerHTML = "0";
	scoreText.style.top = 50 + 'px';
	scoreText.style.left = 10 + 'px';
	scoreText.style.fontSize = "40px";

	document.body.appendChild(scoreText);
  
//   var infoText = document.createElement('div');
// 	infoText.style.position = 'absolute';
// 	infoText.style.width = 100;
// 	infoText.style.height = 100;
// 	infoText.style.backgroundColor = "gold";
// 	infoText.innerHTML = "W - Jump, A/D - Move";
// 	infoText.style.top = 10 + 'px';
// 	infoText.style.left = 10 + 'px';
// 	document.body.appendChild(infoText);
}
function addExplosion(){
	particleGeometry = new THREE.Geometry();
	for (var i = 0; i < particleCount; i ++ ) {
		var vertex = new THREE.Vector3();
		particleGeometry.vertices.push( vertex );
	}
	var pMaterial = new THREE.ParticleBasicMaterial({color: 0x05b236, size: 0.2});
	particles = new THREE.Points( particleGeometry, pMaterial );
	scene.add( particles );
	particles.visible=false;
}
function createObstaclesLoop(){
	var maxObstaclesInLoop = 10;
	var newObst; 
	for(var i=0; i<maxObstaclesInLoop;i++){
		newObst=createObstacles();
		obstaclesLoop.push(newObst);
	}
}
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

function addcharacter(){
	
	var sphereTexture = new THREE.TextureLoader().load( 'images/redsky.jpg' );
	sphereTexture.wrapS = sphereTexture.wrapT = THREE.RepeatWrapping; 
	// sphereTexture.repeat.set( 2, 2 )
	var sphereMaterial = new THREE.MeshBasicMaterial( { map: sphereTexture, side: THREE.DoubleSide } ); 
	var sphereGeometry = new THREE.DodecahedronGeometry( characterRadius, 1);
	// var sphereMaterial = new THREE.MeshStandardMaterial( {  color: 0x05b236, shading:THREE.FlatShading});
		// sphereTexture.needsUpdate = true; // important!
		// window.onload = init;


// var objLoader = new THREE.OBJLoader();
// // new THREE.PlaneGeometry(100, 100, 100, 100),
// objLoader.setMaterials(materials);
// // objLoader.setPath('/examples/3d-obj-loader/assets/');
// objLoader.load("androidBot.obj", function(object){

// 	scene.add(object);
// 	// mesh.position.set(5, 0, 4);
// 			// Model/material loading!
// var mtlLoader = new THREE.MTLLoader();
// // mtlLoader.setTexturePath('/models3d-obj-loader/assets/');
// // mtlLoader.setPath('/examples/3d-obj-loader/assets/');
// mtlLoader.load("androidBot.mtl", function(materials){
	
// 	materials.preload();
	
// });

// });

	jumping=false;
	characterSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	characterSphere.receiveShadow = true;
	characterSphere.castShadow=true;
	scene.add( characterSphere );
	characterSphere.position.y=characterBaseY;
	characterSphere.position.z=4.8;
	currentLane=middleLane;
	characterSphere.position.x=currentLane;



}

function addWorld(){
	var sides=30;
	var tiers=40;
	var sphereGeometry = new THREE.SphereGeometry( worldRadius, sides,tiers);
	var sphereTexture = new THREE.TextureLoader().load( 'images/galaxy.jpg' );
	sphereTexture.wrapS = sphereTexture.wrapT = THREE.RepeatWrapping; 
	sphereTexture.repeat.set( 20, 20 )
	var sphereMaterial = new THREE.MeshBasicMaterial( { map: sphereTexture, side: THREE.DoubleSide } ); 
	// var sphereMaterial = new THREE.MeshPhongMaterial( {  color: 0x2007331a, shading:THREE.FlatShading} )
	
	// var vertexIndex;
	// var vertexVector= new THREE.Vector3();
	// var nextVertexVector= new THREE.Vector3();
	// var firstVertexVector= new THREE.Vector3();
	// var offset= new THREE.Vector3();
	// var currentTier=1;
	// var lerpValue=0.5;
	// var heightValue;
	// var maxHeight=0.07;
	// for(var j=1;j<tiers-2;j++){
	// 	currentTier=j;
	// 	for(var i=0;i<sides;i++){
	// 		vertexIndex=(currentTier*sides)+1;
	// 		vertexVector=sphereGeometry.vertices[i+vertexIndex].clone();
	// 		if(j%2!==0){
	// 			if(i==0){
	// 				firstVertexVector=vertexVector.clone();
	// 			}
	// 			nextVertexVector=sphereGeometry.vertices[i+vertexIndex+1].clone();
	// 			if(i==sides-1){
	// 				nextVertexVector=firstVertexVector;
	// 			}
	// 			lerpValue=(Math.random()*(0.75-0.25))+0.25;
	// 			vertexVector.lerp(nextVertexVector,lerpValue);
	// 		}
	// 		heightValue=(Math.random()*maxHeight)-(maxHeight/2);
	// 		offset=vertexVector.clone().normalize().multiplyScalar(heightValue);
	// 		sphereGeometry.vertices[i+vertexIndex]=(vertexVector.add(offset));
	// 	}
	// }
	rollingGroundSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	rollingGroundSphere.receiveShadow = true;
	rollingGroundSphere.castShadow=false;
	rollingGroundSphere.rotation.z=-Math.PI/2;
	scene.add( rollingGroundSphere );
	rollingGroundSphere.position.y=-24;
	rollingGroundSphere.position.z=2;
	addOffPathObstacles();
}

function addLight(){
	var hemisphereLight = new THREE.HemisphereLight(0xfffafa,0x000000, .9)
	scene.add(hemisphereLight);
	sun = new THREE.DirectionalLight( 0xcdc1c5, 0.9);
	sun.position.set( 12,6,-7 );
	sun.castShadow = true;
	scene.add(sun);
	//Set up shadow properties for the sun light
	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50 ;
}

function addPathObst(){
	var options=[0,1,2];
	var lane= Math.floor(Math.random()*3);
	addOnPathObstacle(true,lane);
	options.splice(lane,1);
	if(Math.random()>0.5){
		lane= Math.floor(Math.random()*2);
		addOnPathObstacle(true,options[lane]);
	}
}

// *adding obstacles off path to render in "bk" or rest of the "world"/platform
function addOffPathObstacles(){
	var numCylinders=100;
	var gap=10/100;
	for(var i=0;i<numCylinders;i++){
		addOnPathObstacle(false,i*gap, true);
		addOnPathObstacle(false,i*gap, false);
	}
}

function addOnPathObstacle(inPath, row, isLeft){// position of cylinders/obstacle
	var newObst;
	if(inPath){
		if(obstaclesLoop.length==0)return;
		newObst=obstaclesLoop.pop();
		newObst.visible=true;
		//console.log("add obstacle");
		obstaclesInPath.push(newObst);
		sphericalHelper.set( worldRadius-0.3, pathAngleValues[row], -rollingGroundSphere.rotation.x+4 );
	}else{
		newObst=createObstacles();
		var forestAreaAngle=0;//[1.52,1.57,1.62];
		if(isLeft){
			forestAreaAngle=1.68+Math.random()*0.1;
		}else{
			forestAreaAngle=1.46-Math.random()*0.1;
		}
		sphericalHelper.set( worldRadius-0.3, forestAreaAngle, row );
	}
	newObst.position.setFromSpherical( sphericalHelper );
	var rollingGroundVector=rollingGroundSphere.position.clone().normalize();
	var oVector=newObst.position.clone().normalize();
	newObst.quaternion.setFromUnitVectors(oVector,rollingGroundVector);
	newObst.rotation.x+=(Math.random()*(2*Math.PI/10))+-Math.PI/10;
	
	rollingGroundSphere.add(newObst);
}

function createObstacles(){
	var Texture = new THREE.TextureLoader().load( 'images/crater.jpg' );
	Texture.wrapS = Texture.wrapT = THREE.RepeatWrapping; 
	// // Texture.repeat.set( 2, 2 )
	var obstacleMaterial = new THREE.MeshBasicMaterial( { map: Texture, side: THREE.DoubleSide } ); 
	var obstacleGeometry = new THREE.BoxGeometry( 0.5, 0.5, 2);
	// var obstacleMaterial = new THREE.MeshStandardMaterial( { color: 0x000}) // shading:THREE.FlatShading  } );
	var obstacle = new THREE.Mesh( obstacleGeometry, obstacleMaterial );
	obstacle.position.y=0.25;
	var obstacles =new THREE.Object3D();	
	obstacles.add(obstacle);
	

    // var planeGeometry = new THREE.BoxGeometry(0.5, 0.5, 2);
	// var planeMaterial = new THREE.MeshBasicMaterial({color: 0x777})
	// var obstacle2 = new THREE.Mesh(planeGeometry, planeMaterial);
	// obstacle2.position.y=0.75;
	// var obstacles =new THREE.Object3D();	
	// obstacles.add(obstacle2);


    
	return obstacles ;

	
}


function update(){
	//stats.update();
    //animate
	rollingGroundSphere.rotation.x += rollingSpeed;
	// newObst.rotation.x +=0.1;
    characterSphere.rotation.x -= characterRollingSpeed;
    if(characterSphere.position.y<=characterBaseY){
    	jumping=false;
    	bounceValue=(Math.random()*0.04)+0.005;
    }
    characterSphere.position.y+=bounceValue;
    characterSphere.position.x=THREE.Math.lerp(characterSphere.position.x,currentLane, 2*clock.getDelta());//clock.getElapsedTime());
    bounceValue-=gravity;
    if(clock.getElapsedTime()>obstacleReleaseInterval){
    	clock.start();
    	addPathObst();
    	if(!hasCollided){
			score+=2*obstacleReleaseInterval;
			scoreText.innerHTML=score.toString();
		}
    }
    doOLogic();
    doExplosionLogic();
    render();
	requestAnimationFrame(update);//request next update
}

function doOLogic(){
	var oneObst;
	var obstaclePos = new THREE.Vector3();
	var obstaclesToRemove=[];
	obstaclesInPath.forEach( function ( element, index ) {
		oneObst=obstaclesInPath[ index ];
		obstaclePos.setFromMatrixPosition( oneObst.matrixWorld );
		if(obstaclePos.z>6 &&oneObst.visible){//gone out of our view zone
			obstaclesToRemove.push(oneObst);
		}else{//check collision
			if(obstaclePos.distanceTo(characterSphere.position)<=0.6){
				// console.log("hit");
				hasCollided=true;
				explode();
			}
		}
	});
	var fromWhere;
	obstaclesToRemove.forEach( function ( element, index ) {
		oneObst=obstaclesToRemove[ index ];
		fromWhere=obstaclesInPath.indexOf(oneObst);
		obstaclesInPath.splice(fromWhere,1);
		obstaclesLoop.push(oneObst);
		oneObst.visible=false;
		// console.log("remove obstacle");
	});
}

function doExplosionLogic(){
	if(!particles.visible)return;
	for (var i = 0; i < particleCount; i ++ ) {
		particleGeometry.vertices[i].multiplyScalar(explosionPower);
	}
	if(explosionPower>1.005){
		explosionPower-=0.001;
	}else{
		particles.visible=false;
	}
	particleGeometry.verticesNeedUpdate = true;
}
function explode(){
	particles.position.y=2;
	particles.position.z=4.8;
	particles.position.x=characterSphere.position.x;
	for (var i = 0; i < particleCount; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = -0.2+Math.random() * 0.4;
		vertex.y = -0.2+Math.random() * 0.4 ;
		vertex.z = -0.2+Math.random() * 0.4;
		particleGeometry.vertices[i]=vertex;
	}
	explosionPower=1.07;
	particles.visible=true;
}

function render(){
    renderer.render(scene, camera);//draw
}
function gameOver () {
  //cancelAnimationFrame( globalRenderID );
  //window.clearInterval( powerupSpawnIntervalID );
}
function onWindowResize() {
	//resize & align
	sceneHeight = window.innerHeight;
	sceneWidth = window.innerWidth;
	renderer.setSize(sceneWidth, sceneHeight);
	camera.aspect = sceneWidth/sceneHeight;
	camera.updateProjectionMatrix();
}