import fs from 'fs';
import path from 'path';

export interface PortfolioItem {
    id: string;
    category: string;
    image: string;
    title?: string;
    link?: string;
    tags?: string;
    clientId?: string;
    clientName?: string;
    subProjectId?: string;
    subProjectName?: string;
    priority?: number;
}

export function getProjects(): PortfolioItem[] {
    try {
        const filePath = path.join(process.cwd(), 'src/data/projects.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading projects.json:', error);
        return [];
    }
}

export const projects: PortfolioItem[] = getProjects();
