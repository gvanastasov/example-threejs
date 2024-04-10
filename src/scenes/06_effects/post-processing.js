import * as THREE from 'three';
import sceneView from '../scene-view';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader';
import { FilmPass } from 'three/examples/jsm/Addons.js';

const view = new sceneView({
    name: 'Post Processing',
    group: 'Effects',
    refs: {
        /**
         * @type {ShaderPass}
         */
        luminocity: null,

        /**
         * @type {FilmPass}
         */
        film: null,
    },
    start: function(scene) {
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 10, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    },
    configurePostRender: function(composer) {
        this.refs.luminocity = new ShaderPass(LuminosityShader);
        composer.addPass(this.refs.luminocity);

        this.refs.film = new FilmPass(0.35, 0.025, 648, false);
        composer.addPass(this.refs.film);
    },
    onSceneGUI: function(scene, rootElement) {
        const guiDiv = document.createElement('div');

        const heading = document.createElement('h3');
        heading.textContent = 'Post Processing';

        const luminosityLabel = document.createElement('label');
        luminosityLabel.htmlFor = 'luminosity';
        luminosityLabel.textContent = 'Luminosity';

        const luminosity = document.createElement('input');
        luminosity.type = 'checkbox';
        luminosity.id = 'luminosity';
        luminosity.checked = true;
        luminosity.addEventListener('input', () => {
            this.refs.luminocity.enabled = !this.refs.luminocity.enabled;
        });

        const filmLabel = document.createElement('label');
        filmLabel.htmlFor = 'film';
        filmLabel.textContent = 'Film';

        const film = document.createElement('input');
        film.type = 'checkbox';
        film.id = 'film';
        film.checked = true;
        film.addEventListener('input', () => {
            this.refs.film.enabled = !this.refs.film.enabled;
        });

        guiDiv.appendChild(heading);
        guiDiv.appendChild(luminosityLabel);
        guiDiv.appendChild(luminosity);
        guiDiv.appendChild(document.createElement('br'));
        guiDiv.appendChild(filmLabel);
        guiDiv.appendChild(film);

        rootElement.appendChild(guiDiv);
    }
});

export default view;