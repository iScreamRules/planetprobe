const planetScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry();
const material1 = new THREE.Mesh();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, color: 0x5500ff } );
const sphere = new THREE.Mesh( geometry, material );
planetScene.add( sphere );

camera.position.z = 5;

var skyBox = new THREE.BoxGeometry(120, 120, 120);
var skyBoxMaterial = new THREE.MeshBasicMaterial({
    map: getRandomSkyBox(600, 2048, 2048),
	side: THREE.BackSide
});
var sky = new THREE.Mesh(skyBox, skyBoxMaterial);
planetScene.add(sky);

function getRandomSkyBox(numberOfStars, width, height) {
    var canvas = document.createElement('CANVAS');

	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext('2d');

	ctx.fillStyle="black";
	ctx.fillRect(0, 0, width, height);

	for (var i = 0; i < numberOfStars; ++i) {
		var radius = Math.random() * 2;
		var x = Math.floor(Math.random() * width);
		var y = Math.floor(Math.random() * height);

		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();
	}

	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	return texture;
};

function animate() {
	requestAnimationFrame( animate );

    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.02;

	renderer.render( planetScene, camera );
};
animate();



class Planet {
    constructor(geometry = new THREE.SphereGeometry(), material = new THREE.MeshBasicMaterial()) {
        this.type = 'Planet';
        this.geometry = geometry;
        this.material = material;
        this.updateMorphTargets();
    }

};