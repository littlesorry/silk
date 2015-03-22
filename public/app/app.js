var PI = 3.1415926535898;
var deg90 = PI/2;
var deg60 = PI/3;

var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xdedede);
renderer.domElement.id = "threejs";
// document.body.appendChild( renderer.domElement );
$("body").prepend($(renderer.domElement));

// camera.position.z = 20;
// camera.position.x = 0;

var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10 );
camera.position.z = 5;


var light = new THREE.PointLight( 0xffffff, 1, 1000 );
light.position.set( 600, 050, 050 );
scene.add( light );

var light2 = new THREE.PointLight( 0xffffff, 5, 1200 );
light2.position.set( -700, -050, 500 );
scene.add( light2 );

var rectLength = 18, rectWidth = 0.5;

var rectShape = new THREE.Shape();
rectShape.moveTo( 0,0 ); 
rectShape.lineTo( 0, rectWidth );
rectShape.lineTo( rectLength, rectWidth );
rectShape.lineTo( rectLength, 0 );
rectShape.lineTo( 0, 0 );

var material = new THREE.MeshPhongMaterial({color: 0xff33aa, shading: THREE.FlatShading, side: THREE.DoubleSide});

var added = []
function addMesh(start, end) {
	var vertexPositions = [
		[start.x, start.y, 0],
		[end.x, end.y, 0],
		[start.x, start.y, -1],
		[start.x, start.y, -1],
		[end.x, end.y, -1],
		[end.x, end.y, 0]
	];
	var vertices = new Float32Array( vertexPositions.length * 3 ); 
	for ( var i = 0; i < vertexPositions.length; i++ ) { 
		vertices[ i * 3 + 0 ] = vertexPositions[i][0]; 
		vertices[ i * 3 + 1 ] = vertexPositions[i][1]; 
		vertices[ i * 3 + 2 ] = vertexPositions[i][2]; 
	} 
	var geometry = new THREE.BufferGeometry(); 
	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) ); 
	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	added.push(mesh);
}

addMesh({x: -1, y: -1}, {x: 1, y: 1});
addMesh({x: 1, y: 1}, {x: 2, y: 1});

var render = function () {
  requestAnimationFrame( render );

  added.forEach(function(mesh) {
  	mesh.rotation.y += 0.005;
  });

  renderer.render(scene, camera);
};

render();
