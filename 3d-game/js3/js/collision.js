//     // var input;

// function renderCanvas(){

// var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("envir"), antialias: true});
// // document.body.appendChild(renderer.domElement)
// renderer.setClearColor(0x000000);// default color of scene bkgrnd
// renderer.setPixelRatio(window.devicePixelRatio); // Pixel Ratio for higher density display ??? using devicespixel aspect ratio for rendering
// renderer.setSize(window.innerWidth, window.innerHeight);//set size of renderer, size of our canvas element within the document
// // in order to draw content onto our canvas/ renderer 2 things/parameters, camera and scene: gives the perspective and view at/in which to draw things...
// var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
// // camera.position.set(0,0,0);
// // function Input() {
// //     self = this;

// //     self.isLeftPressed = false;
// //     self.isRightPressed = false;
// //     self.isUpPressed = false;
// //     self.isDownPressed = false;

// //     function handleKeyEvent(e, isKeyDown) {
// //         if(e.keyCode == 65) {
// //             self.isLeftPressed = isKeyDown;
// //         }

// //         if(e.keyCode == 68) {
// //             self.isRightPressed = isKeyDown;
// //         }

// //         if(e.keyCode == 87) {
// //             self.isUpPressed = isKeyDown;
// //         }

// //         if(e.keyCode == 83) {
// //             self.isDownPressed = isKeyDown;
// //         }
// //     }

// //     document.addEventListener("keydown", function(e) {handleKeyEvent(e, true)});
// //     document.addEventListener("keyup", function(e) {handleKeyEvent(e, false)});
// // }
// var scene = new THREE.Scene();
// // var input = new Input();


// // function boxes(){
//     var geometry = new THREE.BoxGeometry(100, 100, 100);
//     var material = new THREE.MeshLambertMaterial({color: 0x888, emissive: 0xff0000, emissiveIntensity: 0.1,
//         // map: new THREE.TextureLoader().load("js3/low_poly_game_scene/textures/water_down_emissive.png")
//     });// materials take differnet parameters based off the material used, I am using the mesh material which just makes solid colors on every side, differnt materials can be used to create differnt color shadings to  objs
//     var mesh = new THREE.Mesh(geometry,material) // like the polygon mesh: a collection of vertices, edges and faces that defines the shape of.. like a form or blob or hexaledral and geometry and material~like for texture is added to it.
//     mesh.position.z= -1000;
//     scene.add (mesh);

//     var geometry = new THREE.Geometry();
//     geometry.vertices.push(
//         new THREE.Vector3(-100, 100, 0),
//         new THREE.Vector3(-100, -100, 0),
//         new THREE.Vector3(100, -100, 0),
//     );
//     geometry.faces.push(new THREE.Face3(0, 1, 2));
//     var materialT = new THREE.MeshBasicMaterial();
//     var triangle = new THREE.Line(geometry,materialT)
//     triangle.position.z = -1000;
//     triangle.position.x = 300;

//     scene.add (triangle);

//     var geometry = new THREE.SphereGeometry(125);
//     var materialS = new THREE.MeshNormalMaterial({wireframe: true});// materials take differnet parameters based off the material used, I am using the mesh material which just makes solid colors on every side, differnt materials can be used to create differnt color shadings to  objs
//     var round = new THREE.Mesh(geometry,materialS) // like the polygon mesh: a collection of vertices, edges and faces that defines the shape of.. like a form or blob or hexaledral and geometry and material~like for texture is added to it.
//     round.position.z= -1000;
//     round.position.x= -300;

//     scene.add (round);

//     var geometry = new THREE.SphereGeometry(100);
//     var materialS = new THREE.MeshNormalMaterial({wireframe: true});// materials take differnet parameters based off the material used, I am using the mesh material which just makes solid colors on every side, differnt materials can be used to create differnt color shadings to  objs
//     var round2 = new THREE.Mesh(geometry,materialS) // like the polygon mesh: a collection of vertices, edges and faces that defines the shape of.. like a form or blob or hexaledral and geometry and material~like for texture is added to it.
//     round2.position.z= -1000;
//     round2.position.y= 200;
//     round2.position.x= -100;


//     scene.add (round2);

//     var geometry = new THREE.BoxGeometry( 100, 100, 100 );
//     var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
//     var cube = new THREE.Mesh( geometry, material );
//     cube.position.z= 1000;
//     // cube.position.y= 300;
//     scene.add( cube );


//     var geometry = new THREE.PlaneGeometry(10000, 10000, 100, 100);
// 		// MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
// 	var materialF = new THREE.MeshBasicMaterial({color: 0x777777, transparent: true, opacity: 2.5, wireframe: false});
//     var meshFloor = new THREE.Mesh(geometry,materialF)	
// 	// meshFloor.position.set(0,0,-1000);
//     meshFloor.rotation.x = -90 * Math.PI / 180;
// 	meshFloor.position.y = -100;
    
// 	scene.add(meshFloor);
// // }
// // boxes();

// requestAnimationFrame(animate);
// function animate() {
// mesh.rotation.x += 0.1;
// mesh.rotation.y += 0.1;
// // meshFloor.rotation.x -=0.2;
// // meshFloor.rotation.y -=0.2;
// triangle.rotation.x += 0.3;
// triangle.rotation.y += 0.2;
// round.rotation.x += 0.02;
// // round.rotation.y += 0.2;


// renderer.render (scene, camera);
// requestAnimationFrame(animate);

// }

// // var lastTs = 0;
// // var render = function (ts) {
// //     requestAnimationFrame( render );

// //     var timeDelta = (ts - lastTs)/1000;
// //     lastTs = ts;

// //     var movementSpeed = 5*timeDelta;

// //     if(input.isLeftPressed) {
// //         cube.position.x -= movementSpeed;
// //     }

// //     if(input.isRightPressed) {
// //         cube.position.x += movementSpeed;
// //     }

// //     if(input.isUpPressed) {
// //         cube.position.y += movementSpeed;
// //     }

// //     if(input.isDownPressed) {
// //         cube.position.y -= movementSpeed;
// //     }

// //     renderer.render(scene, camera);
// // };

// // requestAnimationFrame(render);

// }


// renderCanvas();

