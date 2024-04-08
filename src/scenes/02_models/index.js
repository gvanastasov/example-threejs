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
        const licenseMarkup = '<p>This work is based on <a href="https://sketchfab.com/3d-models/crate-15581c596def402db1196f92de5c5757">"Crate"</a> by <a href="https://sketchfab.com/cooper">cooper</a>.</p>';
        const licenseDiv = document.createElement('div');
        licenseDiv.innerHTML = licenseMarkup;
        rootElement.appendChild(licenseDiv);
    }
    return this;
}

export default [ new loaderExample(), new textureExample()];