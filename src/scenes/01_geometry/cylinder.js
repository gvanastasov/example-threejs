import * as THREE from 'three';

const scene = function() { 
    this.name = 'Cylinder';
    this.group = '3D Geometries';
    this.refs = {
        cylinder: null,
    };

    this.scene = () => {
        const scene = new THREE.Scene();
        const cylinder = this.createCylinder(5, 5, 5, 32, 32, false);
        scene.add(cylinder);
        return scene;
    };

    /**
     * 
     * @param {THREE.Scene} scene
     * @param {HTMLElement} rootElement
     */
    this.onSceneGUI = (scene, rootElement) => {
        const recreateCylinder = () => {
            let cylinder = scene.children.find(child => child.uuid === this.refs.cylinder);
            scene.remove(cylinder);
            
            const rediusTop = parseFloat(guiDiv.querySelector('#radiusTop').value);
            const radiusBottom = parseFloat(guiDiv.querySelector('#radiusBottom').value);
            const height = parseFloat(guiDiv.querySelector('#height').value);
            const radialSegments = parseFloat(guiDiv.querySelector('#radialSegments').value);
            const heightSegments = parseFloat(guiDiv.querySelector('#heightSegments').value);
            const openEnded = guiDiv.querySelector('#openEnded').checked;

            const newCylinder = this.createCylinder(rediusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
            scene.add(newCylinder);
        };

        const props = [
            { label: 'Radius Top', name: 'radiusTop', value: 5, type: 'range', min: 1, max: 10 },
            { label: 'Radius Bottom', name: 'radiusBottom', value: 5, type: 'range', min: 1, max: 10 },
            { label: 'Height', name: 'height', value: 5, type: 'range', min: 1, max: 10 },
            { label: 'Radial Segments', name: 'radialSegments', value: 32, type: 'range', min: 3, max: 32 },
            { label: 'Height Segments', name: 'heightSegments', value: 32, type: 'range', min: 3, max: 32 },
            { label: 'Open Ended', name: 'openEnded', value: false, type: 'checkbox' },
        ];

        const guiDiv = document.createElement('div');

        props.forEach(prop => {
            const label = document.createElement('label');
            label.htmlFor = prop.name;
            label.textContent = prop.label;

            const input = document.createElement('input');
            input.type = prop.type;
            input.id = prop.name;
            input.min = prop.min;
            input.max = prop.max;
            input.value = prop.value;

            input.addEventListener('input', recreateCylinder);

            guiDiv.appendChild(label);
            guiDiv.appendChild(input);
            guiDiv.appendChild(document.createElement('br'));
        });

        rootElement.appendChild(guiDiv);
    }

    this.createCylinder = (rediusTop, radiusBottom, height, radialSegments, heightSegments, openEnded) => {
        const cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(rediusTop, radiusBottom, height, radialSegments, heightSegments, openEnded),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));
        cylinder.position.set(0, 10, 0);
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;

        this.refs.cylinder = cylinder.uuid;

        return cylinder;
    };

    return this;
};

export default scene;