import * as THREE from 'three';

const scene = { 
    name: 'test1',
    group: 'Geometry',
    scene: () => {
        const scene = new THREE.Scene();

        const box = new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 5),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));
        box.position.set(0, 10, 0);
        box.castShadow = true;
        box.receiveShadow = true;
        scene.add(box);

        return scene;
    } 
};

export default scene;