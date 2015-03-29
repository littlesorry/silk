var d3 = (function() {
	var PI = 3.1415926535898;
	var deg90 = PI/2;
	var deg60 = PI/3;
	var deg30 = PI/6;
	var degD9 = PI/9;

	return {
		meshes: [],
		silkWidth: 8,
		offsetAnchorX: 3,
		material: new THREE.MeshPhongMaterial({color: 0xff33aa, shading: THREE.FlatShading, side: THREE.DoubleSide}),
		init: function(elem, props) {
			this.elem = elem = elem || "canvas";
			this.props = props = props || {};
			this.meshes.length = 0;
			var scene = this.scene = new THREE.Scene();
			var renderer = this.renderer = new THREE.WebGLRenderer();
			var width = props.width || window.innerWidth;
			var height = props.height || window.innerHeight
			this.offsetX = props.d2Width/2;
			this.offsetY = props.d2Height/2;

			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( props.width || window.innerWidth, props.height || window.innerHeight );
			renderer.setClearColor(0xeeeeee);
			renderer.domElement.id = elem;
			$(props.container || "body").append($(renderer.domElement));

			var camera = new THREE.CombinedCamera( 
									width / 2, 
									height / 2, 
									70, 
									1, 
									1000, 
									- 500, 
									1000 );
			camera.position.x = 0;
			camera.position.y = this.offsetY/2;
			camera.position.z = 200;
			camera.toOrthographic();
			camera.setZoom(1.66);

			scene.add( new THREE.AmbientLight( 0x999999 ) );
			var directionalLight = new THREE.DirectionalLight( 0.95* 0xffffff );
			directionalLight.position.x = 1;
			directionalLight.position.y = 1;
			directionalLight.position.z = 1;
			directionalLight.position.normalize();
			scene.add( directionalLight );

			animate();
			function animate() {
			  	requestAnimationFrame(animate);
			  	render();
			};

			function render() {
				camera.lookAt( scene.position );

				renderer.render( scene, camera );
			}
		},
		
		addMesh: function(start, end) {

			var vertexPositions = [
				[start.x, - start.y, 0],
				[end.x, - end.y, 0],
				[start.x + this.offsetAnchorX, - start.y, this.silkWidth],
				[start.x + this.offsetAnchorX, - start.y, this.silkWidth],
				[end.x + this.offsetAnchorX, - end.y, this.silkWidth],
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
			var mesh = new THREE.Mesh( geometry, this.material );
			this.scene.add( mesh );
			this.meshes.push(mesh);
		}, 

		addMeshes: function(points) {
			function translate(point, offsetX, offsetY) {
				return {
					x: point.x - offsetX,
					y: point.y - offsetY
				};
			};

			if (points && points.length > 1) {
				for (var i = 0; i < points.length - 1; i++) {
					this.addMesh(translate(points[i], this.offsetX, this.offsetY)
								, translate(points[i + 1], this.offsetX, this.offsetY));		
				}
			}
		}
	};
})();
