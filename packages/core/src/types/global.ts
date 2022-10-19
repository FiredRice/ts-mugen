import { 
    root as Root, 
    time as Time
} from '../triggers';

declare global {
    const root: typeof Root;
    const time: typeof Time;
}