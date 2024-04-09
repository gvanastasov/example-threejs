import * as THREE from 'three';
import sceneView from '../scene-view';

const raycast = new sceneView({
    name: 'Raycast',
    group: 'Cameras',
    refs: {
        /**
         * @type {THREE.Raycaster}
         */
        raycaster: null,
        /**
         * @type {THREE.Vector2}
         */
        pointer: null,
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
        mesh.position.set(0, 10, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.layers.enable(1);
        scene.add(mesh);

        const geometry2 = new THREE.SphereGeometry(3, 16, 16);
        const material2 = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
        });
        const mesh2 = new THREE.Mesh(geometry2, material2);
        mesh2.position.set(0, 10, 20);
        mesh2.castShadow = true;
        mesh2.receiveShadow = true;
        mesh2.layers.enable(1);
        scene.add(mesh2);

        const geometry3 = new THREE.ConeGeometry(3, 5, 16);
        const material3 = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
        });
        const mesh3 = new THREE.Mesh(geometry3, material3);
        mesh3.position.set(0, 10, -20);
        mesh3.castShadow = true;
        mesh3.receiveShadow = true;
        mesh3.layers.enable(1);
        scene.add(mesh3);

        this.refs.raycaster = new THREE.Raycaster();
        this.refs.raycaster.layers.set(1);
        this.refs.pointer = new THREE.Vector2();

        document.addEventListener( 'click', (event ) => {
            event.preventDefault();
            this.refs.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.refs.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            this.refs.raycaster.setFromCamera( this.refs.pointer, scene.camera );
            const intersects = this.refs.raycaster.intersectObjects( scene.children, true );
            if ( intersects.length > 0 ) {
                this.select(intersects[0])
            } else {
                this.deselect();
            }
        } );
    },
    methods: {
        select: function(intersect) {
            if (this.refs.selected) {
                this.refs.selected.material.emissive.setHex(0x000000);
            }
            this.refs.selected = intersect.object;
            this.refs.selected.material.emissive.setHex(0x00FF00);
        },
        deselect: function() {
            if (this.refs.selected) {
                this.refs.selected.material.emissive.setHex(0x000000);
            }
            this.refs.selected = null;
        }
    }
});

export default raycast;