import * as THREE from 'three';
import sceneView from '../scene-view';

const view = new sceneView({
    name: 'Edges',
    group: 'Helpers',
    refs: {
        /**
         * @type {THREE.LineSegments}
         */
        line: null,
    },
    start: function(scene) {
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 10, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);

        const edges = new THREE.EdgesGeometry( geometry );
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xFFFFFF } ) ); 
        line.position.set(0, 10, 0);
        scene.add( line );

        this.refs.line = line;
    },
    onSceneGUI: function(scene, rootElement) {
        const guiDiv = document.createElement('div');

        const label = document.createElement('label');
        label.htmlFor = 'color';
        label.textContent = 'Color';

        const input = document.createElement('input');
        input.type = 'color';
        input.id = 'color';
        input.value = '#ffffff';
        input.addEventListener('input', () => {
            this.refs.line.material.color.set(input.value);
        });

        guiDiv.appendChild(label);
        guiDiv.appendChild(input);
        guiDiv.appendChild(document.createElement('br'));

        rootElement.appendChild(guiDiv);
    }
});

export default view;