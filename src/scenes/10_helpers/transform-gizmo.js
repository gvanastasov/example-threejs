import * as THREE from 'three';
import sceneView from '../scene-view';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

const view = new sceneView({
    name: 'Transform Gizmo',
    group: 'Helpers',
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

        scene.controls.activate('transform', { target: mesh });
    },
});

export default view;