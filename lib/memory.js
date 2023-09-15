import process from 'node:process';
import format from 'format-io';

export const getMemory = () => {
    const memory = process.memoryUsage();
    
    const rss = format.size(memory.rss);
    const heapUsed = format.size(memory.heapUsed);
    const heapTotal = format.size(memory.heapTotal);
    
    return {
        rss,
        heapUsed,
        heapTotal,
    };
};
