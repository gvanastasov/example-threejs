const control = function(object) {
    createTransformationGroup = (transformation, label) => {
        const group = document.createElement('div');
        const title = document.createElement('label');
        title.textContent = label;

        group.appendChild(title);

        ['x', 'y', 'z'].forEach(axis => {
            const field = createFieldElement(object[transformation][axis], 0.1, () => {
                object[transformation][axis] = parseFloat(field.value);
            });

            group.appendChild(field);
        });

        return group;
    }

    createFieldElement = (value, step, onChange) => {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = value;
        input.step = step;
        input.addEventListener('input', onChange);

        return input;
    }

    const transformControls = document.createElement('div');

    const title = document.createElement('h3');
    title.textContent = 'Transform';
    const transformationGroup = createTransformationGroup('position', 'Position');
    const rotation = createTransformationGroup('rotation', 'Rotation');
    const scale = createTransformationGroup('scale', 'Scale');

    transformControls.appendChild(title);
    transformControls.appendChild(transformationGroup);
    transformControls.appendChild(rotation);
    transformControls.appendChild(scale);

    return transformControls;
}

export default control;