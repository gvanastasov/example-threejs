import * as THREE from 'three';

const refs = {
    box: null,
};

const scene = { 
    name: 'Box',
    group: '3D Geometries',
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
        
        refs.box = box.uuid;
        
        scene.add(box);
        return scene;
    },
    /**
     * 
     * @param {THREE.Scene} scene
     * @param {HTMLElement} rootElement
     */
    onSceneGUI(scene, rootElement) {
        const box = scene.children.find(child => child.uuid === refs.box);

        const guiDiv = document.createElement('div');
        guiDiv.innerHTML = `
            <label for="width">Width:</label>
            <input type="range" id="width" min="1" max="10" value="5">
            <br>
            <label for="height">Height:</label>
            <input type="range" id="height" min="1" max="10" value="5">
            <br>
            <label for="depth">Depth:</label>
            <input type="range" id="depth" min="1" max="10" value="5">
        `;

        // Event listeners to update the box dimensions
        const widthSlider = guiDiv.querySelector('#width');
        const heightSlider = guiDiv.querySelector('#height');
        const depthSlider = guiDiv.querySelector('#depth');
        
        widthSlider.addEventListener('input', () => {
            const value = parseFloat(widthSlider.value);
            box.scale.x = value / 5;
        });
        
        heightSlider.addEventListener('input', () => {
            const value = parseFloat(heightSlider.value);
            box.scale.y = value / 5;
        });
        
        depthSlider.addEventListener('input', () => {
            const value = parseFloat(depthSlider.value);
            box.scale.z = value / 5;
        });

        rootElement.appendChild(guiDiv);
    }
};

export default scene;