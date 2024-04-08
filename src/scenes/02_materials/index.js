import * as THREE from 'three';

new THREE.MeshBasicMaterial()

const props = {
    MeshBasicMaterial: [
        { label: 'Color', name: 'color', type: 'color', value: '#FF0000', valueParser: (value) => new THREE.Color(value)},
    ],
}

const mat = function({ name, props }) {
    this.name = name;
    this.group = 'Materials';
    this.refs = {
        material: null,
    }
    this.start = (scene) => {
        const args = props.reduce((obj, prop) => {
            obj[prop.name] = prop.valueParser ? prop.valueParser(prop.value) : prop.value
            return obj;
        }, {});
        const material = this.createMaterial(args);
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 10, 0);

        scene.add(mesh);
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
            input.min = prop.min;
            input.max = prop.max;
            input.value = prop.value;
            input.addEventListener('input', () => {
                if (prop.name === 'transparent') {
                    this.refs.material.depthWrite = !input.checked;
                    this.refs.material.side = input.checked ? THREE.DoubleSide : THREE.FrontSide;
                }

                this.refs.material[prop.name] = prop.valueParser ? prop.valueParser(input.value) : input.value;
            });

            guiDiv.appendChild(label);
            guiDiv.appendChild(input);
            guiDiv.appendChild(document.createElement('br'));
        });

        rootElement.appendChild(guiDiv);
    }
    this.createMaterial = (args) => {
        if (args.transparent) {
            args.depthWrite = false;
            args.side = THREE.DoubleSide;
        }
        /**
         * @type {THREE.Material}
         */
        const material = new THREE[name](args);
        this.refs.material = material;
        return material;
    }
}

const meshBasicMaterial = new mat({ name: 'MeshBasicMaterial', props: props.MeshBasicMaterial });
const meshLambertMaterial = new mat({ name: 'MeshLambertMaterial', props: props.MeshBasicMaterial });
const meshPhongMaterial = new mat({ name: 'MeshPhongMaterial', props: props.MeshBasicMaterial });
const meshStandardMaterial = new mat({ name: 'MeshStandardMaterial', props: props.MeshBasicMaterial });
const meshDepthMaterial = new mat({ name: 'MeshDepthMaterial', props: [] });
const meshNormalMaterial = new mat({ name: 'MeshNormalMaterial', props: [] });

const points = function() {
    this.name = 'Points';
    this.group = 'Materials';
    this.refs = {
        material: null,
    }
    this.start = (scene) => {
        const vertices = [];

        for ( let i = 0; i < 10000; i ++ ) {
            const x = THREE.MathUtils.randFloatSpread( 2000 );
            const y = THREE.MathUtils.randFloatSpread( 2000 );
            const z = THREE.MathUtils.randFloatSpread( 2000 );

            vertices.push( x, y, z );
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        const material = new THREE.PointsMaterial( { color: 0xFF0000 } );
        const points = new THREE.Points( geometry, material );
        scene.add( points );
    }
}

export default [ 
    meshBasicMaterial, 
    meshLambertMaterial,
    meshPhongMaterial,
    meshStandardMaterial,
    meshDepthMaterial,
    meshNormalMaterial,
    new points(),
];