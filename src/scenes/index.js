import * as THREE from 'three';
import scene01 from './01_color';

const scene00 = {
    name: 'Box',
    group: 'Geometry',
    scene: () => {
        const scene = new THREE.Scene();
    
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 5),
            new THREE.MeshStandardMaterial({
                color: 0xFFFFFF,
            }));
        box.position.set(0, 10, 0);
        box.castShadow = true;
        box.receiveShadow = true;
        
        scene.add(box);
    
        return scene;
    }
}

const scenes = [ scene00, scene01 ];

export { scenes };