const sceneView = function({ name, group, refs, start, onSceneGUI }) {
    this.name = name;
    this.group = group;
    this.refs = refs;
    this.start = start;
    this.onSceneGUI = onSceneGUI;

    return this;
}

export default sceneView;