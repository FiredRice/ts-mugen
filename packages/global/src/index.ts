import * as allTriggers from '@tsmugen/core/lib/cjs/triggers';
import './types';

const excludeKeys = ['name', 'parent'];
Object.keys(allTriggers).forEach(key => {
    if (!excludeKeys.includes(key)) {
        global[key] = allTriggers[key];
    }
});
