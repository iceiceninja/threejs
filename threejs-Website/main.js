import './style.css'
import * as THREE from 'three';
import { GridHelper, PointLight } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'



// import { transformWithEsbuild } from 'vite';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

// const controls = new OrbitControls( camera, renderer.domElement );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10 , 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x03fcfc,
  //wireframe: true //disables the rendering of actual object
});

const torus = new THREE.Mesh(geometry,material);
const antitorus = new THREE.Mesh(geometry,material);

scene.add(torus,antitorus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff,.5);
ambientLight.position.set(30,30,30)

const lightHelper = new THREE.PointLightHelper(pointLight)

const gridHelper = new THREE.GridHelper(200,50);

scene.add(pointLight, gridHelper,ambientLight, lightHelper);

camera.position.set( 0, 20, 35 );

// controls.update();

const controls = new OrbitControls(camera, renderer.domElement);

const points = [];

function addStar()
{
  points.push( new THREE.Vector3( - 10, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 10, 0 ) );
  points.push( new THREE.Vector3( 10, 0, 0 ) );

  const geometry = new THREE.SphereGeometry(1,15,15)
  const material = new THREE.MeshStandardMaterial({color: 0xFF0000})
  const star = new THREE.Mesh(geometry, material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  points.push(new THREE.Vector3(x,y,z));
  star.position.set(x,y,z);
  scene.add(star);
  scene.add( new THREE.Line( new THREE.BufferGeometry().setFromPoints( points ), new THREE.LineBasicMaterial( { color: 0x0000ff } ) ) );

}

Array(20).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('tron.jpg')
scene.background = spaceTexture;

function animate ()
{
  requestAnimationFrame(animate);

  torus.rotateZ(.01);
  torus.rotateX(.005);
  torus.rotateY(.005);

  antitorus.rotateZ(.005);
  antitorus.rotateX(.005);
  antitorus.rotateY(.005);

  controls.update();
  renderer.render(scene, camera)
}



animate()