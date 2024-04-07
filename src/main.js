import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { scenes } from './scenes';

function app() {
    this._el = document.getElementById('app');

    this.renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    this._scene = null;
    this._camera = null;

    this.start = () => {
        this.configure();
        this.loadScene(scenes[0].scene);
        this.update();
    }

    this.configure = () => {
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        var menu = document.createElement('div');
        menu.id = 'menu';
        menu.appendChild(this.createMenu());

        this._el.appendChild(menu);
        this._el.appendChild(this.renderer.domElement);
    
        window.addEventListener('resize', () => {
            this._handleWindowResize();
        }, false);
    }

    this.createMenu = () => {
        const menu = document.createElement('ul');

        var groups = scenes.reduce((arr, scene) => {
            const existing = arr.find(group => group.name === scene.group);
            if (!existing) {
                arr.push({ name: scene.group, scenes: [ scene ] });
            }
            else {
                existing.scenes.push(scene);
            }
            return arr;
        }, []);

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            const groupElement = document.createElement('li');

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = group.name;

            const chevron = document.createElement('span');
            chevron.classList.add('chevron');

            const label = document.createElement('label');
            label.htmlFor = group.name;
            label.appendChild(chevron);
            label.appendChild(document.createTextNode(group.name));

            const groupScenesElement = document.createElement('ul');

            for (let j = 0; j < group.scenes.length; j++) {
                const scene = group.scenes[j];
                const sceneElement = document.createElement('li');

                const a = document.createElement('a');
                a.href = '#' + scene.name;
                a.innerHTML = scene.name;
                a.onclick = () => {
                    this.loadScene(scene.scene);
                }

                sceneElement.appendChild(a);
                groupScenesElement.appendChild(sceneElement);
            }
            
            groupElement.appendChild(input);
            groupElement.appendChild(label);
            groupElement.appendChild(groupScenesElement);

            menu.appendChild(groupElement);
        }

        return menu;
    }

    function mergeScenes(sourceScene, destinationScene) {
        sourceScene.children.forEach(child => {
            var clonedObject = child.clone();
    
            destinationScene.add(clonedObject);
        });
    }

    this.loadScene = (scene) => {
        this.resetScene();
        mergeScenes(scene(), this._scene);
    }

    this.resetScene = () => {
        this._scene = new THREE.Scene();
        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1.0;
        const far = 1000.0;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();

        this._scene = new THREE.Scene();

        let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(20, 100, 10);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        this._scene.add(light);

        light = new THREE.AmbientLight(0x101010);
        this._scene.add(light);

        const controls = new OrbitControls(
            this._camera, this.renderer.domElement);
        controls.update();

        this._camera.position.set(50, 50, -50);
        this._camera.lookAt(0, 0, 0);

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 0xFFFFFF,
            }
        ));
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        this._scene.add(plane);
    }

    this._handleWindowResize = () => {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    this.update = () => {
        requestAnimationFrame(() => {
            this.renderer.render(this._scene, this._camera);
            // console.log(this._camera.rotation);
            this.update();
        });
    }
}

new app().start();