import * as THREE from 'three';

const scene = (function() { 
    this.name = 'Sphere';
    this.group = '3D Geometries';
    this.refs = {
        sphere: null,
    };

    this.scene = () => {
        const scene = new THREE.Scene();
        const sphere = this.createSphere(5, 32, 32);
        scene.add(sphere);
        return scene;
    };

    /**
     * 
     * @param {THREE.Scene} scene
     * @param {HTMLElement} rootElement
     */
    this.onSceneGUI = (scene, rootElement) => {
        const recreateSphere = () => {
            let sphere = scene.children.find(child => child.uuid === this.refs.sphere);
            scene.remove(sphere);
            
            const radius = parseFloat(guiDiv.querySelector('#radius').value);
            const widthSegments = parseFloat(guiDiv.querySelector('#widthSegments').value);
            const heightSegments = parseFloat(guiDiv.querySelector('#heightSegments').value);
            const newSpehere = this.createSphere(radius, widthSegments, heightSegments);
            scene.add(newSpehere);
        };

        const guiDiv = document.createElement('div');

        guiDiv.innerHTML = `
            <label for="radius">Radius:</label>
            <input type="range" id="radius" min="1" max="10" value="5">
            <br>
            <label for="radius">Width Segments:</label>
            <input type="range" id="widthSegments" min="3" max="32" value="32">
            <br>
            <label for="radius">Height Segments:</label>
            <input type="range" id="heightSegments" min="3" max="32" value="32">
        `;

        const radiusSlider = guiDiv.querySelector('#radius');
        radiusSlider.addEventListener('input', recreateSphere);

        const widthSegmentsSlider = guiDiv.querySelector('#widthSegments');
        widthSegmentsSlider.addEventListener('input', recreateSphere);

        const heightSegmentsSlider = guiDiv.querySelector('#heightSegments');
        heightSegmentsSlider.addEventListener('input', recreateSphere);

        rootElement.appendChild(guiDiv);
    }

    this.createSphere = (radius, widthSegments, heightSegments) => {
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(radius, widthSegments, heightSegments),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));
        sphere.position.set(0, 10, 0);
        sphere.castShadow = true;
        sphere.receiveShadow = true;

        this.refs.sphere = sphere.uuid;

        return sphere;
    };

    return this;
})();

export default scene;