import type { Localized } from "../i18n";
import data from "./projects.json";

export type ProjectLink =
  | { type: "fdroid"; url: string; label?: Localized }
  /** Lee `index` (index-v2.json de F-Droid) en el navegador para apuntar a la última versión. */
  | { type: "apk"; index: string; package: string; abi?: string; fallback: string; label?: Localized }
  | { type: "release" | "repo" | "link"; url: string; label?: Localized; hint?: Localized };

export interface Project {
  id: string;
  name: string;
  icon?: string;
  platform?: Localized;
  status?: Localized;
  private?: boolean;
  description: Localized;
  features?: Localized<string[]>;
  tags?: string[];
  links?: ProjectLink[];
}

export const projects = data as Project[];
