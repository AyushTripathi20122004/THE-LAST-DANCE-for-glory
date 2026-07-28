import * as THREE from 'three';
import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import trophy from './assets/trophy.glb?url';
import { Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, -0.2, 3);

// Renderer
let canvas = document.querySelector('.draw');
if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = 'draw';
    document.body.appendChild(canvas);
}

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
renderer.setPixelRatio(pixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// ensure correct output encoding to avoid darkening
if ('outputColorSpace' in renderer) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
} else {
    renderer.outputEncoding = THREE.sRGBEncoding;
}

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    3.2,
    0.9,
    0.1
);
composer.addPass(bloomPass);




renderer.shadowMap.enabled = false;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;


// Add lights: create arrays for top lights (y positive) and bottom lights (y negative)
const topLights = [];
const bottomLights = [];

// directions around the object (x,z) to place lights from every direction
const directions = [
    new THREE.Vector3(4, 2, 0),
    new THREE.Vector3(-4, 2, 0),
];

directions.forEach((dir) => {
    const top = new THREE.DirectionalLight(0xffffff, 0.4);
    top.position.set(dir.x, dir.y, dir.z);
    scene.add(top);
    topLights.push(top);

});


const baseCameraFov = 45;

function updateResponsiveModel() {
    const isMobile = window.innerWidth < 768;
    camera.fov = isMobile ? 55 : baseCameraFov;
    camera.updateProjectionMatrix();

    if (model) {
        const scale = isMobile ? 0.8 : 1;
        model.scale.setScalar(scale);
        model.position.set(0, isMobile ? -0.15 : 0, 0);
    }
}

// Geometry: Sphere
const radius = 0.0000002;
const widthSegments = 32;
const heightSegments = 32;

const geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
);

// Load DamagedHelmet.glb model
let model;
const loader = new GLTFLoader();

// Cache for loaded models
const modelCache = new Map();

loader.load(trophy, (glb) => {
    model = glb.scene;

    let meshes = 0;
    let triangles = 0;

    model.traverse((child) => {
        if (child.isMesh) {
            
            meshes++;

            triangles += child.geometry.index
                ? child.geometry.index.count / 3
                : child.geometry.attributes.position.count / 3;
        }
    });

    console.log("Meshes:", meshes);
    console.log("Triangles:", triangles);






    const setModelOpacity = (opacity) => {
        model.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.transparent = true;
                child.material.opacity = opacity;
            }
        });
    };

    model.traverse((child) => {
        if (child.isMesh) {
            child.material.color.set('#D6BA66');
            child.material.envMapIntensity = 1.5;
            child.material.metalness = 1;
            child.material.roughness = 0.40;
            child.material.transparent = true;
            child.material.opacity = 1;
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(model);
    updateResponsiveModel();
    modelCache.set(trophy, model);

    const modelTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.ModelBase',
            start: 'top top',
            end: 'bottom top',
            markers: false,
            pin: true,
            scrub: 1,
        }
    });

    modelTl.to(model.scale, {
        x: 1.25,
        y: 1.25,
        z: 1.25,
    }, 'start');


    modelTl.to(model.position, {
        keyframes: [
            { x: 1.5, duration: 0.2 },
            { x: -1.5, duration: 0.1, onStart: () => {setModelOpacity(0.5)}, onReverseComplete: () => setModelOpacity(1) },
            { x: 0, duration: 0.1, onStart: () => {setModelOpacity(1) ; setModelScale(6)}, onReverseComplete: () => setModelOpacity(0.5) }
        ],
    }, 'start');



});


// Material
const material = new THREE.MeshStandardMaterial({
    color: 'white',
    roughness: 0,
    metalness: 0.9
});

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.0095;
    composer.render();
}

animate();

// Handle resize
window.addEventListener('resize', () => {
    const newPixelRatio = Math.min(window.devicePixelRatio || 1);
    renderer.setPixelRatio(newPixelRatio);
    composer.setPixelRatio(newPixelRatio);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    updateResponsiveModel();
});




