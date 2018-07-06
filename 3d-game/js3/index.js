// import * as THREE from 'three'
// import {OBJLoader} from 'three'
// import {MTLLoader} from 'three'


// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// var input = new Input();

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;


// function animate() {
// 	requestAnimationFrame( animate );
// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;
// 	renderer.render( scene, camera );
// }
// animate();



// var lastTs = 0;
// var render = function (ts) {
//     requestAnimationFrame( render );

//     var timeDelta = (ts - lastTs)/1000;
//     lastTs = ts;

//     var movementSpeed = 5*timeDelta;

//     if(input.isLeftPressed) {
//         cube.position.x -= movementSpeed;
//     }

//     if(input.isRightPressed) {
//         cube.position.x += movementSpeed;
//     }

//     if(input.isUpPressed) {
//         cube.position.y += movementSpeed;
//     }

//     if(input.isDownPressed) {
//         cube.position.y -= movementSpeed;
// 	}
	
// 	if(input.SpacePressed){
// 		cube.position.x *= cube.position.y;
// 		cube.position.y *= movementSpeed;

// 	}
//     renderer.render(scene, camera);
// };

// requestAnimationFrame(render);

var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;
var box;


var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;
// var w = 1920;
// var h = 1080;
// var fullWidth = w * 3;
// var fullHeight = h * 2;


function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100);
	
	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);
	mesh.position.y += 1;
	// The cube can have shadows cast onto it, and it can cast shadows
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(mesh);
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(100, 100, 100, 100),
		// MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
		// See threejs.org/examples/ for other material types
	);
	meshFloor.rotation.x -= Math.PI / 2;
	// Floor can have shadows cast onto it
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);
	
	
	// LIGHTS
	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	// Will not light anything closer than 0.1 units or further than 25 units
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);

	box = new THREE.Mesh(
	  new THREE.BoxGeometry( 3, 3, 3 ),
	  new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe:USE_WIREFRAME})
);
scene.add(box);
box.position.set(2.5, 3/2, 2.5)
// =======================
	
// Model/material loading!
var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setTexturePath('/models3d-obj-loader/assets/');
// mtlLoader.setPath('/examples/3d-obj-loader/assets/');
mtlLoader.load("models/new_maze.mtl", function(materials){
	
	materials.preload();

	var objLoader = new THREE.OBJLoader();
	// new THREE.PlaneGeometry(100, 100, 100, 100),
	objLoader.setMaterials(materials);
	// objLoader.setPath('/examples/3d-obj-loader/assets/');
	objLoader.load("models/new_maze.obj", function(object){
	
		object.traverse(function(node){
			if( node instanceof THREE.Mesh ){
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});
	
		scene.add(object);
		object.position.set(5, 0, 4);
		
	});
	
});

=======================
	
	camera.position.set(25, player.height, 20);
	camera.lookAt(new THREE.Vector3(0,player.height,7));
	// camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
	renderer = new THREE.WebGLRenderer({antialias:true});

	renderer.setSize(1280, 800);

	// background color//sky
	renderer.setClearColor(0x000ea8);
	 
	// Enable Shadows in the Renderer
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	
	document.body.appendChild(renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	box.rotation.y += 0.02;
	// mesh.rotation.y = -Math.PI/4;
	
	
	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}
	
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
	// if(keyboard[38]){ // up arrow key
	// 	camera.rotation.x -= player.turnSpeed;
	// }
	// if(keyboard[40]){ // down arrow key
	// 	camera.rotation.x += player.turnSpeed;
	// }
	
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;




// function onSketchfabUtilityReady() {
// 	// var loader = new THREE.GLTFLoader();
// 	// loader.load(low_poly_game_scene/scene.gltf, function(gltf){
// 	// 	scene.add( gltf.scene );
// 	// }, undefined, function(error){
// 	// 	console.error( error );
// 	// });	}
// 	var sketchfabAPIUtility = new SketchfabAPIUtility('7db85b437d2044579c73690dc8aa8ca5', document.getElementById('api-frame'), onSketchfabUtilityReady);


// var scene, camera, renderer, mesh;
// var meshFloor, ambientLight, light;
// var box;

// function init(){
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// var renderer = new THREE.WebGLRenderer({antialias:true});
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
// keyLight.position.set(-100, 0, 100);
 
// var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
// fillLight.position.set(100, 0, 100);
 
// var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
// backLight.position.set(100, 0, -100).normalize();
 
// scene.add(keyLight);
// scene.add(fillLight);
// scene.add(backLight);

// // // Model/material loading!
// // var mtlLoader = new THREE.MTLLoader();
// // // mtlLoader.setTexturePath('/models3d-obj-loader/assets/');
// // // mtlLoader.setPath('/examples/3d-obj-loader/assets/');
// // mtlLoader.load("/models/maze.mtl", function(materials){
	
// // 	materials.preload();

// // 	var objLoader = new THREE.OBJLoader();
// // 	// new THREE.PlaneGeometry(100, 100, 100, 100),
// // 	objLoader.setMaterials(materials);
// // 	// objLoader.setPath('/examples/3d-obj-loader/assets/');
// // 	objLoader.load("/models/maze.obj", function(mesh){
	
// // 		scene.add(mesh);
// // 		mesh.position.set(5, 0, 4);
		
// // 	});
	
// // });

	
// 	meshFloor = new THREE.Mesh(
// 		new THREE.PlaneGeometry(500,500, 500, 500),
// 		// MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
// 		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
// 		// See threejs.org/examples/ for other material types
// 	);
// 	meshFloor.rotation.x -= Math.PI / 2;
// 	// Floor can have shadows cast onto it
// 	meshFloor.receiveShadow = true;
// 	scene.add(meshFloor);
	
	
// var animate = function () {
// 	requestAnimationFrame( animate );

// 	cube.rotation.x += 0.1;
// 	cube.rotation.y += 0.1;
// 	controls.update();
// 	renderer.render(scene, camera);
// };

// animate();
// }