import * as THREE from 'three';

const scene = function () { 
    this.name = 'Box';
    this.group = '3D Geometries';
    this.refs = {
        box: null,
    }
    this.scene = () => {
        const scene = new THREE.Scene();
        const box = this.createBox(5, 5, 5);
        scene.add(box);
        return scene;
    },

    /**
     * 
     * @param {THREE.Scene} scene
     * @param {HTMLElement} rootElement
     */
    this.onSceneGUI = (scene, rootElement) => {
        const recreateBox = () => {
            let box = scene.children.find(child => child.uuid === this.refs.box);
            scene.remove(box);

            const width = parseFloat(guiDiv.querySelector('#width').value);
            const height = parseFloat(guiDiv.querySelector('#height').value);
            const depth = parseFloat(guiDiv.querySelector('#depth').value);

            const newBox = this.createBox(width, height, depth);
            scene.add(newBox);
        }

        const props = [
            { label: 'Width', name: 'width', value: 5, type: 'range', min: 1, max: 10 },
            { label: 'Height', name: 'height', value: 5, type: 'range', min: 1, max: 10 },
            { label: 'Depth', name: 'depth', value: 5, type: 'range', min: 1, max: 10 },
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
            input.addEventListener('input', recreateBox);

            guiDiv.appendChild(label);
            guiDiv.appendChild(input);
            guiDiv.appendChild(document.createElement('br'));
        });

        rootElement.appendChild(guiDiv);
    }

    this.createBox = (width, height, depth) => {
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            }));

        box.position.set(0, 10, 0);
        box.castShadow = true;
        box.receiveShadow = true;

        this.refs.box = box.uuid;
        return box;
    }
};

export default scene;