import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

const light = function ({ name, props }) {
    this.name = name;
    this.group = 'Lights';
    this.refs = {
        /**
         * @type {THREE.Light}
         */
        light: null,
    }

    /**
     * 
     * @param {THREE.Scene} scene 
     */
    this.start = (scene) => {
        const lights = scene.getObjectsByProperty('isLight', true);
        if (lights !== undefined && lights.length > 0) {
            lights.forEach(light => { scene.remove(light); });
        }

        const material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 10, 0);
        scene.add(mesh);

        const args = props.map(prop => {
            return prop.valueParser ? prop.valueParser(prop.value) : prop.value;
        });
        const light = this.createLight(args);
        light.position.set(0, 20, 0);
        if (light.type === 'DirectionalLight') {
            light.target.position.set(0, 0, 0);
        }
        light.castShadow = true;
        scene.add(light);

        this.refs.light = light;

        const gizmo = new THREE[name + 'LightHelper'](light, 5);
        scene.add(gizmo);

        scene.controls.activate('transform', { target: light });
    }

    this.createLight = (args) => {
        const light = new THREE[this.name + 'Light'](...args);
        this.refs.light = light;
        return light;
    }

    this.onSceneGUI = (scene, rootElement) => {
        const guiDiv = document.createElement('div');

        props.forEach(prop => {
            const label = document.createElement('label');
            label.htmlFor = prop.name;
            label.textContent = prop.label;

            const input = document.createElement('input');
            input.type = prop.type;
            input.id = prop.name;
            input.step = prop.step;
            input.min = prop.min;
            input.max = prop.max;
            input.value = prop.value;
            input.addEventListener('input', () => {
                this.refs.light[prop.name] = prop.valueParser ? prop.valueParser(input.value) : input.value;
            });

            guiDiv.appendChild(label);
            guiDiv.appendChild(input);
            guiDiv.appendChild(document.createElement('br'));
        });

        rootElement.appendChild(guiDiv);
    }

    return this;
}

const props = {
    DirectionalLight: [
        { label: 'Color', name: 'color', type: 'color', value: '#FFFFFF', valueParser: (value) => new THREE.Color(value)},
        { label: 'Intensity', name: 'intensity', type: 'number', value: 1, min: 0, max: 10, step: 0.1 },
    ],
    PointLight: [
        { label: 'Color', name: 'color', type: 'color', value: '#FFFFFF', valueParser: (value) => new THREE.Color(value)},
        { label: 'Intensity', name: 'intensity', type: 'number', value: 3, min: 0, max: 10, step: 0.1 },
        { label: 'Distance', name: 'distance', type: 'number', value: 0, min: 0, max: 100, step: 0.1 },
        { label: 'Decay', name: 'decay', type: 'number', value: 1, min: 0, max: 100, step: 0.1 },
    ],
    SpotLight: [
        { label: 'Color', name: 'color', type: 'color', value: '#FFFFFF', valueParser: (value) => new THREE.Color(value)},
        { label: 'Intensity', name: 'intensity', type: 'number', value: 3, min: 0, max: 10, step: 0.1 },
        { label: 'Distance', name: 'distance', type: 'number', value: 0, min: 0, max: 100, step: 0.1 },
        { label: 'Decay', name: 'decay', type: 'number', value: 1, min: 0, max: 100, step: 0.1 },
        { label: 'Angle', name: 'angle', type: 'number', value: Math.PI / 3, min: 0, max: Math.PI, step: 0.1 },
        { label: 'Penumbra', name: 'penumbra', type: 'number', value: 0, min: 0, max: 1, step: 0.1 },
    ],
}

const directionalLight = new light({
    name: 'Directional',
    props: props.DirectionalLight,
});

const pointLight = new light({
    name: 'Point',
    props: props.PointLight,
});

const spotLight = new light({
    name: 'Spot',
    props: props.SpotLight,
});

export default [
    directionalLight,
    pointLight,
    spotLight,
];