import Geometry from './01_geometry';
import Models from './02_models';
import Helpers from './10_helpers';

const scenes = [ 
    ...Geometry, 
    ...Models,
    ...Helpers,
];

export { scenes };