import * as THREE from 'three';
import sceneView from '../scene-view';
import transformControl from '../../controls/transform-control';

const view = new sceneView({
    name: 'Transform Controls',
    group: 'Helpers',
    refs: {
        /**
         * @type {THREE.Object3D}
        */
        object: null,
    },
    start: function(scene) {
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 10, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    
        this.refs.object = mesh;
    },
    onSceneGUI: function(scene, rootElement) {
        const transform = transformControl(this.refs.object);
        rootElement.appendChild(transform);
    }
});

export default view;