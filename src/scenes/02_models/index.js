import * as THREE from 'three';
import { GLTFLoader  } from "three/examples/jsm/Addons.js";

const loader = new GLTFLoader();

const loaderExample = function() {
    this.name = 'Loader',
    this.group = 'Models',
    this.refs = {
        /**
         * @type {THREE.Mesh}
         */
        model: null,
    }
    this.start = (scene) => {
        loader.load('static/cybertruck.gltf', ( gltf ) => {
            const material = new THREE.MeshPhongMaterial({color: 0xFF0000});
            const model = gltf.scene.children.find( child => child.name === 'Tesla' );
            model.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            model.scale.set(5, 5, 5);
            scene.add( model );
            this.refs.model = model;
        }, undefined, function ( error ) {
            console.error( error );
        } );
    }
    this.update = () => {
        if (this.refs.model) {
            this.refs.model.rotateOnAxis(new THREE.Vector3(0,0,1), 0.01);
        }
    }
    return this;
}

const textureExample = function() {
    this.name = 'Texture',
    this.group = 'Models',
    this.refs = {
        /**
         * @type {THREE.Mesh}
         */
        model: null,
    }
    this.start = (scene) => {
        loader.load('static/crate/scene.gltf', ( gltf ) => {
            const model = gltf.scene.children[0];
            if (!model) {
                return;
            }
            model.scale.set(2, 2, 2);
            model.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(model);
            this.refs.model = model;
        }, undefined, function ( error ) {
            console.error( error );
        } );
    }
    this.update = () => {
        if (this.refs.model) {
            this.refs.model.rotateOnAxis(new THREE.Vector3(0,0,1), 0.01);
        }
    }
    this.onSceneGUI = (scene, rootElement) => {
        const licenseMarkup = '<p>This work is based on <a href="https://sketchfab.com/3d-models/crate-15581c596def402db1196f92de5c5757">"Crate"</a> by <a href="https://sketchfab.com/cooper">cooper</a> licensed under CC-BY-4.0.</p>';
        const licenseDiv = document.createElement('div');
        licenseDiv.innerHTML = licenseMarkup;
        rootElement.appendChild(licenseDiv);
    }
    return this;
}

const animationExample = function() {
    this.name = 'Animation';
    this.group = 'Models';
    this.refs = {
        /**
         * @type {THREE.Mesh}
         */
        model: null,
        /**
         * @type {Function}
         */
        animation: null,
    }
    this.start = (scene) => {
        loader.load('static/robot_walk_animation/scene.gltf', ( gltf ) => {
            const model = gltf.scene.children[0];
            if (!model) {
                return;
            }
            model.scale.set(0.5, 0.5, 0.5);
            model.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            this.refs.model = model;

            const animations = gltf.animations;
            if (animations && animations.length) {
                const mixer = new THREE.AnimationMixer(gltf.scene);

                animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                });

                const clock = new THREE.Clock();
                this.refs.animation = () => {
                    const delta = clock.getDelta();
                    mixer.update(delta);
                };
            }

            scene.add(gltf.scene);
        }, undefined, function ( error ) {
            console.error( error );
        } );
    }
    this.update = () => {
        this.refs.animation?.call();
        this.refs.model?.rotateOnAxis(new THREE.Vector3(0,0,1), 0.01);
    }
    this.onSceneGUI = (scene, rootElement) => {
        const licenseMarkup = '<p>This work is based on <a href="https://sketchfab.com/3d-models/robot-walk-animation-40e2de1d942f43eca60e2344c5e91d12">"Robot walk animation"</a> by <a href="https://sketchfab.com/AntijnvanderGun">AntijnvanderGun</a> licensed under CC-BY-4.0.</p>';
        const licenseDiv = document.createElement('div');
        licenseDiv.innerHTML = licenseMarkup;
        rootElement.appendChild(licenseDiv);
    }
    return this;
}

export default [ new loaderExample(), new textureExample(), new animationExample()];