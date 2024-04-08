import Geometry from './01_geometry';
import Materials from './02_materials';
import Models from './03_models';
import Lights from './04_lights';
import Helpers from './10_helpers';

const scenes = [ 
    ...Geometry, 
    ...Materials,
    ...Models,
    ...Lights,
    ...Helpers,
];

export { scenes };