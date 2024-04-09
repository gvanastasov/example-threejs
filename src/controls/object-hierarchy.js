import * as THREE from 'three';

/**
 * 
 * @param {THREE.Scene} scene 
 */
const objectHierarchy = function(scene, callback) {

    function renderObjectTree(object) {
        const ul = document.createElement('ul');
  
        for (const current of object.children) {
            const li = document.createElement('li');
            li.dataset.uuid = current.uuid;
            li.textContent = current.name == '' ? 'unnamed (' + current.type + ')' : current.name;
  
            if (current.children?.length > 0) {
                const childUl = renderObjectTree(current.children);
                li.appendChild(childUl);
            }
  
            ul.appendChild(li);
        }

        return ul;
    }

    const treeElement = renderObjectTree(scene, null);
    treeElement.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'LI') {
            const uuid = target.dataset.uuid;
            const object = scene.getObjectByProperty('uuid', uuid);
            if (object) {
                callback({ object, target });
            }
        }
    });

    return treeElement;
}

export default objectHierarchy;