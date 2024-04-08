import * as THREE from 'three';
import { GLTFLoader  } from "three/examples/jsm/Addons.js";

const loader = new GLTFLoader();

let url = new URL( './model.gltf', import.meta.url );

const loaderExample = function() {
    this.name = 'Model',
    this.group = 'Loaders',
    this.refs = {
        /**
         * @type {THREE.Mesh}
         */
        model: null,
    }
    this.start = (scene) => {
        loader.load(url.toString(), ( gltf ) => {
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

export default [ new loaderExample() ];