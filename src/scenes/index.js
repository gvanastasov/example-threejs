import Geometry from './01_geometry';
import Materials from './02_materials';
import Models from './03_models';
import Lights from './04_lights';
import Cameras from './05_cameras';
import Effects from './06_effects';	
import Helpers from './10_helpers';

const scenes = [ 
    ...Geometry, 
    ...Materials,
    ...Models,
    ...Lights,
    ...Cameras,
    ...Effects,
    ...Helpers,
];

export { scenes };