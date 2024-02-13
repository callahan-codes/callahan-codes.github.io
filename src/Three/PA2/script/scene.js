// IMPORTS

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';
import { Flow } from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/modifiers/CurveModifier.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/loaders/GLTFLoader.js';

//

// INITIALIZE VARIABLES

const curveHandles = [];
let spotLight, lightHelper;
let flow, objectToCurve;
let rows = 60, columns = 60, index = 0, instances = 3500;
let originalPOS = false;
let renderer, scene, camera;
let importedModel;

//

// CONFIGURE SCENE

//renderer
renderer = new THREE.WebGLRenderer({canvas: document.querySelector(".scene #canvas"), antialias: true, alpha: true});          

//camera
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 200 );
camera.position.set( 4.5, 0, 0 );

//scene
scene = new THREE.Scene();

//lights
spotLight = new THREE.SpotLight( 0xCD7F32, 10 );
spotLight.position.set( 2.5, 5, 2.5 );
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 1;
spotLight.decay = 2;
spotLight.distance = 0;

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 10;
spotLight.shadow.focus = 1;
scene.add( spotLight );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
controls.enablePan = false;
controls.maxPolarAngle =  Math.PI * 0.5;
controls.minPolarAngle =  Math.PI * 0.5;


//

// GLTF MODEL | CREDS TO: https://sketchfab.com/3d-models/handpainted-watercolor-cake-7f205e2fbfc14d209de9061be603b462
const modelLoader = new GLTFLoader();
modelLoader.load('./model/scene.gltf', (gltfScene) => {
    gltfScene.scene.scale.set( 0.8, 0.8, 0.8 );
    gltfScene.scene.position.set( 0, -0.3, 0.2 );
    gltfScene.scene.rotateY(Math.PI / 180 * 45);
    scene.add(gltfScene.scene);
    importedModel = gltfScene.scene;
});

//


// mesh material
const geometry = new THREE.BoxGeometry( 0.99, 0.99, 0.99 ); 
const material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
const mesh = new THREE.InstancedMesh( geometry, material, 3500 ); 
scene.add( mesh );

// mesh dummy instance
const dummy = new THREE.Object3D();
const instancePositions = [];

for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++){

        instancePositions.push({
            x: (i - rows / 2), 
            y: -1, 
            z: (j - rows / 2) + 2,
        });

        dummy.updateMatrix();
        mesh.setMatrixAt(index++, dummy.matrix);
        mesh.setColorAt(i, new THREE.Color(Math.random() * 0x000000));
    }
}

for (let i = 0; i < instances; i++) {
    const position = instancePositions[i];
    mesh.setMatrixAt(i, new THREE.Matrix4().makeTranslation(position.x, position.y, position.z));
}

/// 3D TEXT AND CURVATURE
//curve path points
const initialPoints = [
    { x: 1, y: -0.3, z: -1 },
    { x: 1, y: -0.3, z: 1 },
    { x: -1, y: -0.3, z: 1 },
    { x: -1, y: -0.3, z: -1 },
];

//curve box geometry & material
const boxGeometry = new THREE.BoxGeometry( 25, 25, 25 );
const boxMaterial = new THREE.MeshBasicMaterial();

//get points from handle and push to curveHandles
for ( const handlePos of initialPoints ) {

    const handle = new THREE.Mesh( boxGeometry, boxMaterial );
    handle.position.copy( handlePos );
    curveHandles.push( handle );

}

//create curve
const curve = new THREE.CatmullRomCurve3(

    //map curve
    curveHandles.map( ( handle ) => handle.position )

);

//set curve type
curve.curveType = 'centripetal';
curve.closed = true;

//intialize font & text
const loader = new FontLoader();
loader.load( './font/FONT.json', function ( font ) {

    //fonts material
    const material = new THREE.MeshStandardMaterial( {
        color: 0xffffff,
        metalness: 0.85,
        roughness: 0,
        wireframe: false
    } );

    //maintext geometry
    const geometry = new TextGeometry( 'Bake My Day!  Bake My Day! ', {
        font: font,
        size: 0.45,
        height: 0.05,
    } );

    //maintext rotation
    geometry.rotateX( Math.PI );
    geometry.rotateY( Math.PI );

    //maintext mesh, name
    objectToCurve = new THREE.Mesh( geometry, material );
    objectToCurve.name = 'maintext';

    //flow curved text & add to scene
    flow = new Flow( objectToCurve );
    flow.updateCurve( 0, curve );
    scene.add( flow.object3D );
});

//
// let originalPosition;
// let campos;
// let smoothness = 0.1;
// // CAMERA ANIMATION ON MOUSE MOVE 

//     const canvas = document.getElementById("canvas");
//     canvas.addEventListener("mouseup", function() {
//         // where the original position will be stored
//         originalPosition = new THREE.Vector3( 4.5, 0, 0);
//         campos = controls.object.position;

//             // store the position to "originalPosition"
//         originalPosition.copy(campos.position) // this should be done once
//         updateCameraPOS();
//     })

//     function updateCameraPOS(){

//         // if the object is on hover this should be "true" else "false"
//         if(true) object.position.lerp(originalPosition , smoothness); 
//      }

//


// resize function
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

// main function
function animate() {

    requestAnimationFrame(animate);
    resizeCanvasToDisplaySize();


    // move text along curve
    if ( flow ) {

        flow.moveAlongCurve( 0.0005 );

    }

    // if ( !originalPOS ) {
    //     const smoothness= 0.1
    //     const targetPosition = controls.object.position.clone()
    //     targetPosition.z -= 0.5;
    // } else {

    // }

    // console.log( controls.object.position )

    // console.log(originalPOS)
    const time = performance.now() * 0.001;

    if( importedModel ) {
        importedModel.position.y = Math.sin( time ) * 0.2
    }

    controls.update()

    renderer.render(scene, camera);
}
requestAnimationFrame(animate);