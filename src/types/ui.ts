import { type SlideData } from '../../types/elements';
import { type PanelType } from '../../types/ui'; // Changed from ../../app/page
import { FileText, LayoutDashboard, Settings, Layers, Palette } from 'lucide-react';

// Add the 'export' keyword here
export type PanelType = 'text' | 'elements' | 'design' | 'properties' | 'layers' | null;