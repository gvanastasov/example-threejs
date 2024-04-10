const sceneView = function({ name, group, refs, start, onSceneGUI, update, methods, configurePostRender }) {
    this.name = name;
    this.group = group;
    this.refs = refs;
    this.start = start;
    this.onSceneGUI = onSceneGUI;
    this.update = update;
    this.configurePostRender = configurePostRender;

    if (methods) {
        Object.keys(methods).forEach(key => {
            this[key] = methods[key];
        });
    }

    return this;
}

export default sceneView;