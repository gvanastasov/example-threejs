const sceneView = function({ name, group, refs, start, onSceneGUI, update, methods }) {
    this.name = name;
    this.group = group;
    this.refs = refs;
    this.start = start;
    this.onSceneGUI = onSceneGUI;
    this.update = update;

    if (methods) {
        Object.keys(methods).forEach(key => {
            this[key] = methods[key];
        });
    }

    return this;
}

export default sceneView;