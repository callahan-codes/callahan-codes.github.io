import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/controls/OrbitControls.js';

let renderer, scene, camera, controls,
    light, light2, light3,
    light_helper, light2_helper, light3_helper ;

renderer = new THREE.WebGLRenderer({canvas: document.querySelector(".scene canvas"), antialias: true, alpha: true}); 
renderer.shadowMap.enabled = true;

camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 8000 );
camera.position.set( 15, 20, 0 );

controls = new OrbitControls( camera, renderer.domElement );

light = new THREE.PointLight( 0xffffff, 1, 50 );
light.position.set( 0, 20, 0 );
light.castShadow = true; 
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;

light2 = new THREE.PointLight( 0x00ff00, 1, 50 );
light2.position.set( 0, 20, 10 );
light2.castShadow = true; 
light2.shadow.mapSize.width = 2048;
light2.shadow.mapSize.height = 2048;

light3 = new THREE.PointLight( 0xff0000, 1, 50 );
light3.position.set( 0, 20, -10 );
light3.castShadow = true; 
light3.shadow.mapSize.width = 2048;
light3.shadow.mapSize.height = 2048;

light_helper = new THREE.PointLightHelper( light, 3 );
light2_helper = new THREE.PointLightHelper( light2, 3 );
light3_helper = new THREE.PointLightHelper( light3, 3 );

scene = new THREE.Scene();
scene.add(camera, light, light2, light3);
scene.add(light_helper, light2_helper, light3_helper)

const sphere_geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
const sphere_material = new THREE.MeshNormalMaterial(); 
const sphere = new THREE.Mesh( sphere_geometry, sphere_material ); 
scene.add( sphere );
sphere.position.y = 10;
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default

const plane_geometry = new THREE.PlaneGeometry( 125, 125 );
const plane_material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( plane_geometry, plane_material );
scene.add( plane );
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;


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

    const time = performance.now() * 0.003;
    sphere.position.y = Math.sin( time ) * 4 + 5;

    renderer.render(scene, camera);
    controls.update()
}

requestAnimationFrame(animate);