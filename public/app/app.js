var PI = 3.1415926535898;
var deg90 = PI/2;
var deg60 = PI/3;
var deg30 = PI/6;
var degD9 = PI/9;


var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xdedede);
renderer.domElement.id = "threejs";
$("body").prepend($(renderer.domElement));

var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 2, 900 );
camera.position.z = 12;
camera.position.x = window.innerWidth / 2;
camera.position.y = -(window.innerHeight / 2);

var light = new THREE.PointLight( 0xffffff, 1, 1920 );
light.position.set( window.innerWidth, window.innerHeight, 20 );
scene.add( light );

// var light2 = new THREE.PointLight( 0xffffff, 1, window.innerWidth * 1.4 );
// light2.position.set( window.innerWidth / 2, 50, 0 );
// scene.add( light2 );

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
		[start.x, - start.y, 0],
		[end.x, - end.y, 0],
		[start.x, - start.y, -5],
		[start.x, - start.y, -5],
		[end.x, - end.y, -5],
		[end.x, - end.y, 0]
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

function addMeshes(points) {
	if (points && points.length > 1) {
		for (var i = 0; i < points.length - 1; i++) {
			addMesh(points[i], points[i + 1]);		
		}
	}
}

// addMeshes([{x: -1, y: 1}, {x: -1, y: -1}, {x: 1, y: 1}, {x: 2, y: 1}]);
var rotationY = 0;
var render = function () {
  requestAnimationFrame( render );

  added.forEach(function(mesh) {
  	mesh.rotation.y = degD9;
  });

  renderer.render(scene, camera);
  rotationY += 0.005;
  rotationY > deg30 && (rotationY = 0);
};

render();
