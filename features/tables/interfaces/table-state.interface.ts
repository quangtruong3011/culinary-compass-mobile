import { Table } from "./table.interface";

export interface TableState {
  tables: Table[];
  currentTable: Table | null;
  isLoading: boolean;
  error: string | null;
}
