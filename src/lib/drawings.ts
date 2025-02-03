export type DrawingCategory = {
    id: string;
    name: string;
    folder: string;
    prefix: string;
}

export const stationDrawingCategories: { [key: string]: DrawingCategory } = {
    'plot-plan': { id: 'A', name: 'Plot Plan', folder: 'plot-plan', prefix: 'PP' },
    'pid': { id: 'B', name: 'Piping and Instrumentation Diagram', folder: 'pid', prefix: 'PID' },
    'gad': { id: 'C', name: 'Piping GAD', folder: 'gad', prefix: 'GAD' },
    'hac': { id: 'D', name: 'Hazardous and Classification', folder: 'hac', prefix: 'HAC' },
    'esd': { id: 'E', name: 'Electrical Signalling Diagram', folder: 'esd', prefix: 'ESD' },
    'elpd': { id: 'F', name: 'Earthing / Lightning Protection GRID', folder: 'elpd', prefix: 'ELPD' },
    'cpsd': { id: 'G', name: 'CP System Drawing', folder: 'cpsd', prefix: 'CPSD' },
    'bpe': { id: 'H', name: 'Building Plan & Elevations', folder: 'bpe', prefix: 'BPE' },
    'iso': { id: 'I', name: 'Isometrics', folder: 'iso', prefix: 'ISO' },
    // Add other categories...
};

export const junctionDrawingCategories: { [key: string]: DrawingCategory } = {
    'sld': { id: 'A', name: 'Single Line Diagram', folder: 'sld', prefix: 'SLD' },
    'route': { id: 'B', name: 'Route Map', folder: 'route', prefix: 'RTE' },
    'alignment': { id: 'C', name: 'Alignment Sheet', folder: 'alignment', prefix: 'ALN' },
    'pipe-book': { id: 'D', name: 'Pipe Book', folder: 'pipe-book', prefix: 'PB' },
    'crossing-section': { id: 'E', name: 'Crossing Section Drawings', folder: 'crossing-section', prefix: 'CSD' },
    'original-cadastral': { id: 'F', name: 'Original / Design cadastral Drawing', folder: 'original-cadastral', prefix: 'OCD' },
    'as-build-cadastral': { id: 'G', name: 'As on Date / As Build Cadastral Drawing', folder: 'as-build-cadastral', prefix: 'ABCD' },
    // Add other categories...
};

export function getDrawingPath(location: string, category: DrawingCategory, drawingNumber: string = '001') {
    const sanitizedLocation = location.replace(/\s+/g, '-').toUpperCase();
    const fileName = `${sanitizedLocation}-${category.prefix}-${drawingNumber}.pdf`;
    return `${category.folder}/${fileName}`;
}

export function transformToBucketName(stationName: string): string {
    return stationName
        .toLowerCase()                 // Convert to lowercase
        .trim()                       // Remove leading/trailing spaces
        .replace(/\s+/g, '-')         // Replace one or more spaces with single hyphen
        .replace(/[^a-z0-9-]/g, '')   // Remove special characters except hyphens
        .replace(/-+/g, '-')          // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, '');       // Remove leading/trailing hyphens
}
/*   { name: "A. Single Line Diagram", status: "green" },
  { name: "B. Route Map", status: "yellow" },
  { name: "C. Alignment Sheet", status: "orange" },
  { name: "D. Pipe Book", status: "green" },
  { name: "E. Crossing Section Drawings", status: "yellow" },
  { name: "F. Original / Design cadastral Drawing", status: "orange" },
  { name: "G. As on Date / As Build Cadastral Drawing", status: "orange" }, */