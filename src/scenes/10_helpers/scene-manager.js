import * as THREE from 'three';
import sceneView from '../scene-view';
import objectHierarchy from '../../controls/object-hierarchy';

const view = new sceneView({
    name: 'Scene Manager',
    group: 'Helpers',
    refs: {
        /**
         * @type {THREE.Object3D}
        */
        selected: null,
    },
    start: function(scene) {
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'Cube';
        mesh.position.set(0, 10, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    
        this.refs.object = mesh;
    },
    onSceneGUI: function(scene, rootElement) {
        const title = document.createElement('h3');
        title.innerHTML = 'Scene Manager';
        const widget = objectHierarchy(scene, (e) => { this.select(e) });

        rootElement.appendChild(title);
        rootElement.appendChild(widget);
    },
    methods: {
        select({ object, target }) {
            if (this.refs.selected && this.refs.selected.isMesh) {
                this.refs.selected.material.emissive.setHex(0x000000);
            }

            if (object.isMesh) {
                object.material.emissive.setHex(0x00FF00);
            }

            this.refs.selected = object;
        }
    }
});

export default view;