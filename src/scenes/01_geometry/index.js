import * as THREE from 'three';

const geometry = function ({ name, props, transform, animate }) {
    this.name = name;
    this.group = '3D Geometries';
    this.refs = {
        /**
         * @type {THREE.Mesh}
         */
        geometry: null,
    }
    this.start = (scene) => {
        const args = props.map(prop => prop.valueParser ? prop.valueParser(prop.value) : prop.value);
        const geometry = this.createGeometry(args);
        scene.add(geometry);
    }
    this.onSceneGUI = (scene, rootElement) => {
        const recreateGeometry = () => {
            scene.remove(this.refs.geometry);

            const args = props.map(prop => {
                if (prop.type === 'checkbox') {
                    return guiDiv.querySelector(`#${prop.name}`).checked;
                } else {
                    var value = parseFloat(guiDiv.querySelector(`#${prop.name}`).value);

                    return prop.valueParser ? prop.valueParser(value) : value;
                }
            })

            const newGeometry = this.createGeometry(args);
            scene.add(newGeometry);
        }

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
            input.addEventListener('input', recreateGeometry);

            guiDiv.appendChild(label);
            guiDiv.appendChild(input);
            guiDiv.appendChild(document.createElement('br'));
        });

        rootElement.appendChild(guiDiv);
    }
    this.createGeometry = (args) => {
        const mesh = new THREE.Mesh(
            new THREE[this.name + 'Geometry'](...args),
            new THREE.MeshStandardMaterial({
                color: 0xFF0000,
            })
        );

        mesh.position.set(0, 10, 0);

        if (transform) {
            if (transform.position) {
                mesh.position = transform.position;
            }

            if (transform.rotation) {
                mesh.rotation.setFromVector3(transform.rotation);
            }
        }

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.refs.geometry = mesh;
        
        return mesh;
    }
    this.update = () => {
        if (animate && animate.rotation) {
            this.refs.geometry.rotateOnAxis(animate.rotation, 0.01);
        }
    }
    return this;
}

const box = {
    name: 'Box',
    props: [
        { label: 'Width', name: 'width', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Height', name: 'height', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Depth', name: 'depth', value: 5, type: 'range', min: 1, max: 10 },
    ],
    animate: {
        rotation: new THREE.Vector3(0, 1, 0),
    }
}

const sphere = {
    name: 'Sphere',
    props: [
        { label: 'Radius', name: 'radius', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Width Segments', name: 'widthSegments', value: 32, type: 'range', min: 3, max: 32 },
        { label: 'Height Segments', name: 'heightSegments', value: 32, type: 'range', min: 3, max: 32 },
    ]
}

const cylinder = {
    name: 'Cylinder',
    props: [
        { label: 'Radius Top', name: 'radiusTop', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Radius Bottom', name: 'radiusBottom', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Height', name: 'height', value: 10, type: 'range', min: 1, max: 10 },
        { label: 'Radial Segments', name: 'radialSegments', value: 10, type: 'range', min: 1, max: 10 },
        { label: 'Height Segments', name: 'heightSegments', value: 1, type: 'range', min: 1, max: 10 },
        { label: 'Open Ended', name: 'openEnded', value: false, type: 'checkbox' },
        { label: 'Theta Start', name: 'thetaStart', value: 0, type: 'range', min: 0, max: 360, valueParser: (value) => value * Math.PI / 180 },
        { label: 'Theta Length', name: 'thetaLength', value: 360, type: 'range', min: 0, max: 360, valueParser: (value) => value * Math.PI / 180 },
    ],
    animate: {
        rotation: new THREE.Vector3(0, 1, 0),
    }
}

const cone = {
    name: 'Cone',
    props: [
        { label: 'Radius', name: 'radius', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Height', name: 'height', value: 10, type: 'range', min: 1, max: 10 },
        { label: 'Radial Segments', name: 'radialSegments', value: 10, type: 'range', min: 1, max: 10 },
        { label: 'Height Segments', name: 'heightSegments', value: 1, type: 'range', min: 1, max: 10 },
        { label: 'Open Ended', name: 'openEnded', value: false, type: 'checkbox' },
        { label: 'Theta Start', name: 'thetaStart', value: 0, type: 'range', min: 0, max: 360, valueParser: (value) => value * Math.PI / 180 },
        { label: 'Theta Length', name: 'thetaLength', value: 360, type: 'range', min: 0, max: 360, valueParser: (value) => value * Math.PI / 180 },
    ],
    animate: {
        rotation: new THREE.Vector3(0, 1, 0),
    }
}

const torus = {
    name: 'Torus',
    props: [
        { label: 'Radius', name: 'radius', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Tube', name: 'tube', value: 1, type: 'range', min: 1, max: 10 },
        { label: 'Radial Segments', name: 'radialSegments', value: 16, type: 'range', min: 3, max: 32 },
        { label: 'Tubular Segments', name: 'tubularSegments', value: 100, type: 'range', min: 3, max: 100 },
        { label: 'Arc', name: 'arc', value: 360, type: 'range', min: 0, max: 360, valueParser: (value) => value * Math.PI / 180 },
    ],
    animate: {
        rotation: new THREE.Vector3(0, 1, 0),
    }
}

const torusKnot = {
    name: 'TorusKnot',
    props: [
        { label: 'Radius', name: 'radius', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Tube', name: 'tube', value: 1, type: 'range', min: 1, max: 10 },
        { label: 'Tubular Segments', name: 'tubularSegments', value: 64, type: 'range', min: 3, max: 100 },
        { label: 'Radial Segments', name: 'radialSegments', value: 8, type: 'range', min: 3, max: 32 },
        { label: 'P', name: 'p', value: 2, type: 'range', min: 1, max: 10 },
        { label: 'Q', name: 'q', value: 3, type: 'range', min: 1, max: 10 },
    ],
}

const ring = {
    name: 'Ring',
    props: [
        { label: 'Inner Radius', name: 'innerRadius', value: 2, type: 'range', min: 1, max: 10 },
        { label: 'Outer Radius', name: 'outerRadius', value: 6, type: 'range', min: 1, max: 10 },
        { label: 'Theta Segments', name: 'thetaSegments', value: 8, type: 'range', min: 3, max: 32 },
        { label: 'Phi Segments', name: 'phiSegments', value: 8, type: 'range', min: 3, max: 32 },
        { label: 'Theta Start', name: 'thetaStart', value: 0, type: 'range', min: 0, max: 360, valueParser: (value) => value * Math.PI / 180 },
        { label: 'Theta Length', name: 'thetaLength', value: 360, type: 'range', min: 0, max: 360, valueParser: (value) => value * Math.PI / 180 },
    ],
    animate: {
        rotation: new THREE.Vector3(0, 1, 0),
    }
}

const plane = {
    name: 'Plane',
    props: [
        { label: 'Width', name: 'width', value: 5, type: 'range', min: 1, max: 20 },
        { label: 'Height', name: 'height', value: 5, type: 'range', min: 1, max: 20 },
        { label: 'Width Segments', name: 'widthSegments', value: 10, type: 'range', min: 1, max: 100 },
        { label: 'Height Segments', name: 'heightSegments', value: 10, type: 'range', min: 1, max: 100 },
    ],
    transform: {
        rotation: new THREE.Vector3(-Math.PI / 2, 0, 0),
    },
    animate: {
        rotation: new THREE.Vector3(0, 0, 1),
    }
}

const tetrahedron = {
    name: 'Tetrahedron',
    props: [
        { label: 'Radius', name: 'radius', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Detail', name: 'detail', value: 0, type: 'range', min: 0, max: 5 },
    ],
    animate: {
        rotation: new THREE.Vector3(0, 1, 0),
    }
}

const octahedron = {
    name: 'Octahedron',
    props: [
        { label: 'Radius', name: 'radius', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Detail', name: 'detail', value: 0, type: 'range', min: 0, max: 5 },
    ],
    animate: {
        rotation: new THREE.Vector3(0, 1, 0),
    }
}

const dodecahedron = {
    name: 'Dodecahedron',
    props: [
        { label: 'Radius', name: 'radius', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Detail', name: 'detail', value: 0, type: 'range', min: 0, max: 5 },
    ],
    animate: {
        rotation: new THREE.Vector3(0, 1, 0),
    }
}

const icosahedron = {
    name: 'Icosahedron',
    props: [
        { label: 'Radius', name: 'radius', value: 5, type: 'range', min: 1, max: 10 },
        { label: 'Detail', name: 'detail', value: 0, type: 'range', min: 0, max: 5 },
    ],
    animate: {
        rotation: new THREE.Vector3(0, 1, 0),
    }
}

export default [ 
    new geometry(box), 
    new geometry(sphere), 
    new geometry(cylinder), 
    new geometry(cone),
    new geometry(torus),
    new geometry(torusKnot),
    new geometry(ring),
    new geometry(plane),
    new geometry(tetrahedron),
    new geometry(octahedron),
    new geometry(dodecahedron),
    new geometry(icosahedron),
];