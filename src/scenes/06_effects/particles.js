import * as THREE from 'three';
import sceneView from '../scene-view';

var particleCount = 1000;
var minLifespan = 1;
var maxLifespan = 2;
var minSize = 4;
var maxSize = 10;
var emitterCenter = new THREE.Vector3(0, 0, 0);
var emitterSize = 20;
var minSpeed = 0.1;
var maxSpeed = 0.5;

function randomPointInSquare(center, size) {
    var randomPoint = new THREE.Vector3(
        center.x + (Math.random() - 0.5) * size,
        center.y,
        center.z + (Math.random() - 0.5) * size
    );
    return randomPoint;
}

const view = new sceneView({
    name: 'Particles',
    group: 'Effects',
    refs: {
        /**
         * @type {THREE.Points}
         */
        particleSystem: null,
    },
    start: function(scene) {
        var positions = new Float32Array(particleCount * 3);
        var sizes = new Float32Array(particleCount);
        var velocities = new Float32Array(particleCount * 3);
        var lifespans = new Float32Array(particleCount);

        for (var i = 0; i < particleCount; i++) {
            var randomPoint = randomPointInSquare(emitterCenter, emitterSize);

            var x = randomPoint.x;
            var y = randomPoint.y;
            var z = randomPoint.z;

            var velocity = new THREE.Vector3(0, 1, 0);
            velocity.normalize();
            velocity.multiplyScalar((Math.random()) * (maxSpeed - minSpeed));

            var lifespan = Math.random() * (maxLifespan - minLifespan) + minLifespan;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            sizes[i] = minSize;

            velocities[i * 3] = velocity.x;
            velocities[i * 3 + 1] = velocity.y;
            velocities[i * 3 + 2] = velocity.z;

            lifespans[i] = lifespan;
        }

        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geometry.setAttribute('lifespan', new THREE.BufferAttribute(lifespans, 1));

        var particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xffffff) }
            },
            vertexShader: `
                attribute float size;
                attribute float lifespan;
                attribute vec3 velocity;

                varying float vLifespan;

                void main() {
                    vLifespan = lifespan;
                    vec3 newPosition = position + velocity;
                    gl_PointSize = size;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color;

                varying float vLifespan;

                void main() {
                    gl_FragColor = vec4(color, 1.0);
                    gl_FragColor.a = vLifespan;
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        var particleSystem = new THREE.Points(geometry, particleMaterial);

        this.refs.particleSystem = particleSystem;
        scene.add(particleSystem);

        var squareSize = emitterSize;
        var squareGeometry = new THREE.BufferGeometry();
        var vertices = new Float32Array([
            -squareSize / 2, 0, -squareSize / 2,
            squareSize / 2, 0, -squareSize / 2,
            squareSize / 2, 0, squareSize / 2,
            -squareSize / 2, 0, squareSize / 2,
            -squareSize / 2, 0, -squareSize / 2
        ]);
        squareGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        var squareMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        var square = new THREE.Line(squareGeometry, squareMaterial);
        scene.add(square);
    },

    methods: {
        updateParticles: function() {
            var particleSystem = this.refs.particleSystem;
            var positions = particleSystem.geometry.attributes.position.array;
            var sizes = particleSystem.geometry.attributes.size.array;
            var velocities = particleSystem.geometry.attributes.velocity.array;
            var lifespans = particleSystem.geometry.attributes.lifespan.array;

            for (var i = 0; i < particleCount; i++) {
                var index3 = i * 3;
                var index1 = i;

                positions[index3] += velocities[index3];
                positions[index3 + 1] += velocities[index3 + 1];
                positions[index3 + 2] += velocities[index3 + 2];

                lifespans[index1] -= 0.01;
                if (lifespans[index1] <= 0) {
                    var randomPoint = randomPointInSquare(emitterCenter, emitterSize);

                    positions[index3] = randomPoint.x;
                    positions[index3 + 1] = randomPoint.y;
                    positions[index3 + 2] = randomPoint.z;
                    lifespans[index1] = Math.random() * (maxLifespan - minLifespan) + minLifespan;
                    sizes[index1] = minSize;

                    var velocity = new THREE.Vector3(0, 1, 0);
                    velocity.normalize();
                    velocity.multiplyScalar((Math.random()) * (maxSpeed - minSpeed));

                    velocities[index3] = velocity.x;
                    velocities[index3 + 1] = velocity.y;
                    velocities[index3 + 2] = velocity.z;
                } else {
                    sizes[index1] = minSize + (maxSize - minSize) * (1 - lifespans[index1] / (maxLifespan - minLifespan));
                }
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;
            particleSystem.geometry.attributes.size.needsUpdate = true;
            particleSystem.geometry.attributes.lifespan.needsUpdate = true;
        }
    },

    update() {
        this.updateParticles();
    }
});

export default view;