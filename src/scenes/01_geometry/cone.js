import * as THREE from 'three';

const scene = function () { 
    this.name = 'Cone';
    this.group = '3D Geometries';
    this.refs = {
        cone: null,
    }
    this.scene = () => {
        const scene = new THREE.Scene();
        const cone = this.createCone(5, 10, 10, 1, false, 0, Math.PI * 2);      
        scene.add(cone);
        return scene;
    },

    /**
     * 
     * @param {THREE.Scene} scene
     * @param {HTMLElement} rootElement
     */
    this.onSceneGUI = (scene, rootElement) => {
        const recreateCone = () => {
            let cone = scene.children.find(child => child.uuid === this.refs.cone);
            scene.remove(cone);

            const radius = parseFloat(guiDiv.querySelector('#radius').value);
            const height = parseFloat(guiDiv.querySelector('#height').value);
            const radialSegments = parseFloat(guiDiv.querySelector('#radialSegments').value);
            const heightSegments = parseFloat(guiDiv.querySelector('#heightSegments').value);
            const openEnded = guiDiv.querySelector('#openEnded').checked;
            const thetaStart = parseFloat(guiDiv.querySelector('#thetaStart').value) * Math.PI / 180;
            const thetaLength = guiDiv.querySelector('#thetaLength').value * Math.PI / 180;

            const newCone = this.createCone(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
            scene.add(newCone);
        }

        const props = [
            { label: 'Radius', name: 'radius', value: 5, type: 'range', min: 1, max: 10 },
            { label: 'Height', name: 'height', value: 10, type: 'range', min: 1, max: 10 },
            { label: 'Radial Segments', name: 'radialSegments', value: 10, type: 'range', min: 1, max: 10 },
            { label: 'Height Segments', name: 'heightSegments', value: 1, type: 'range', min: 1, max: 10 },
            { label: 'Open Ended', name: 'openEnded', value: false, type: 'checkbox' },
            { label: 'Theta Start', name: 'thetaStart', value: 0, type: 'range', min: 0, max: 360 },
            { label: 'Theta Length', name: 'thetaLength', value: 360, type: 'range', min: 0, max: 360 },
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
            input.addEventListener('input', recreateCone);

            guiDiv.appendChild(label);
            guiDiv.appendChild(input);
            guiDiv.appendChild(document.createElement('br'));
        });

        rootElement.appendChild(guiDiv);
    }

    this.createCone = (radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) => {
        const cone = new THREE.Mesh(
            new THREE.ConeGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));

        cone.position.set(0, 10, 0);
        cone.castShadow = true;
        cone.receiveShadow = true;

        this.refs.cone = cone.uuid;

        return cone;
    }
};

export default scene;