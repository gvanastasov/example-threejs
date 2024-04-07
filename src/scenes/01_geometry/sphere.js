import * as THREE from 'three';

const scene = { 
    name: 'Sphere',
    group: '3D Geometries',
    scene: () => {
        const scene = new THREE.Scene();

        const box = new THREE.Mesh(
            new THREE.SphereGeometry(5, 32, 32),
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