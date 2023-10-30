import { createContext } from "react";
import { IGlobalState, IAsigantureState } from "../interfaces/interfaces";
export const GlobalContext = createContext<IGlobalState | null>(null);
export const AsignaturesContext = createContext<IAsigantureState | null>(null)