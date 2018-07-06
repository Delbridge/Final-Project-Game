
// var camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.1, 3000 );

// function Input() {
//     self = this;

//     self.isLeftPressed = false;
//     self.isRightPressed = false;
//     self.isUpPressed = false;
//     self.isDownPressed = false;
//     self.isAwayPressed = false;
//     self.isTowardsPressed = false;


//     function handleKeyEvent(e, isKeyDown) {
//         if(e.keyCode == 37) {
//             self.isLeftPressed = isKeyDown;
//         }

//         if(e.keyCode == 39) {
//             self.isRightPressed = isKeyDown;
//         }

//         if(e.keyCode == 87) {
//             self.isUpPressed = isKeyDown;
//         }

//         if(e.keyCode == 83) {
//             self.isDownPressed = isKeyDown;
//         }
  
//         if(e.keyCode == 40) {
//             self.isAwayPressed = isKeyDown;
//         }

//         if(e.keyCode == 38) {
//             self.isTowardsPressed = isKeyDown;
//         }
//     }

//     document.addEventListener("keydown", function(e) {handleKeyEvent(e, true)});
//     document.addEventListener("keyup", function(e) {handleKeyEvent(e, false)});
// }
// var scene = new THREE.Scene();
// var input = new Input();

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// var geometry = new THREE.SphereGeometry(125);
//     var materialS = new THREE.MeshNormalMaterial({wireframe: false});// materials take differnet parameters based off the material used, I am using the mesh material which just makes solid colors on every side, differnt materials can be used to create differnt color shadings to  objs
//     var round = new THREE.Mesh(geometry,materialS) // like the polygon mesh: a collection of vertices, edges and faces that defines the shape of.. like a form or blob or hexaledral and geometry and material~like for texture is added to it.
//     round.position.z= -1000;
//     round.position.x= -300;
//     round.position.y= 10;

//     scene.add (round);

//     var geometry = new THREE.BoxGeometry(300, 300, 300);
//         var material = new THREE.MeshBasicMaterial({color: 0x777});// materials take differnet parameters based off the material used, I am using the mesh material which just makes solid colors on every side, differnt materials can be used to create differnt color shadings to  objs
//         var mesh = new THREE.Mesh(geometry,material) // like the polygon mesh: a collection of vertices, edges and faces that defines the shape of.. like a form or blob or hexaledral and geometry and material~like for texture is added to it.
//         mesh.position.z= -1000;
//         mesh.position.x= 300;
//         mesh.position.y= 500;
//         scene.add (mesh);

//         var geometry = new THREE.PlaneGeometry(10000, 10000, 100, 100);
//         		// MeshBasicMaterial does not react to lighting, so we replace with MeshPhongMaterial
//         	var materialF = new THREE.MeshBasicMaterial({color: 0x777777, transparent: true, opacity: 2.5, wireframe: false});
//             var meshFloor = new THREE.Mesh(geometry,materialF)	
//         	// meshFloor.position.set(0,0,-1000);
//             meshFloor.rotation.x = -90 * Math.PI / 180;
//         	meshFloor.position.y = -100;
//             scene.add(meshFloor);

//             // var cubeGeometry = new THREE.CubeGeometry(50,50,50,1,1,1);
//             // var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
//             // MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
//             // MovingCube.position.set(0, 25.1, 0);
//             // scene.add( MovingCube );	
            
//             // var wallGeometry = new THREE.CubeGeometry( 100, 100, 20, 1, 1, 1 );
//             // var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x8888ff} );
//             // var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe:true } );
            
           
         
//     var geometry = new THREE.CubeGeometry( 200, 300, 20, 1, 1, 1);
//     var material = new THREE.MeshBasicMaterial({color: 0x222});// materials take differnet parameters based off the material used, I am using the mesh material which just makes solid colors on every side, differnt materials can be used to create differnt color shadings to  objs
//     var mesh2 = new THREE.Mesh(geometry,material) // like the polygon mesh: a collection of vertices, edges and faces that defines the shape of.. like a form or blob or hexaledral and geometry and material~like for texture is added to it.
//     mesh2.position.z= -1000;
// mesh2.rotation.y = 3.14159 / 2;

//     mesh2.position.x= 300;
//     // mesh.position.y= 500;
//     scene.add (mesh2);


// camera.position.z = 5;

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
//     }

//     if(input.isAwayPressed) {
//         cube.position.z += movementSpeed;
//     }

//     if(input.isTowardsPressed) {
//         cube.position.z -= movementSpeed;
//     }

//     renderer.render(scene, camera);
// };

// requestAnimationFrame(render);
// // ===============================================