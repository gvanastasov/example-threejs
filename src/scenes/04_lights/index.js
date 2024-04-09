import * as THREE from 'three';

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
        // scene.traverse( child => {
        //     if (child.isLight) {
        //         scene.remove(child);
        //     }
        // });

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
        light.target.position.set(0, 0, 0);
        light.castShadow = true;


        scene.add(light);
    }

    this.createLight = (args) => {
        const light = new THREE[this.name + 'Light'](...args);
        this.refs.light = light;
        return light;
    }
}

const props = {
    DirectionalLight: [
        { label: 'Color', name: 'color', type: 'color', value: '#FFFFFF', valueParser: (value) => new THREE.Color(value)},
        { label: 'Intensity', name: 'intensity', type: 'number', value: 1, min: 0, max: 1 },
    ],
}

const directionalLight = new light({
    name: 'Directional',
    props: props.DirectionalLight,
});

export default [
    directionalLight,
];