import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/loaders/RGBELoader.js';

let renderer, scene, camera, controls;

renderer = new THREE.WebGLRenderer({canvas: document.querySelector(".scene canvas"), antialias: true, alpha: true}); 

camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 8000 );
camera.position.x = 30;

controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 20;
controls.maxDistance = 40;
controls.autoRotate = true;

scene = new THREE.Scene();
scene.add(camera)

const background = new RGBELoader();
background.load('school_quad_4k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;

});

const geometry = new THREE.SphereGeometry( 5, 64, 32 );
const material = new THREE.MeshStandardMaterial( {
  color: 0x070707,
  metalness: 0,
  roughness: 0,
} );

const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh)
mesh.add(camera)

function resizeCanvasToDisplaySize() {

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width ||canvas.height !== height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

}

function animate() {

    requestAnimationFrame(animate);
    resizeCanvasToDisplaySize();

    renderer.render(scene, camera);
    controls.update()
}

requestAnimationFrame(animate);