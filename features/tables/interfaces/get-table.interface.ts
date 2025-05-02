import { SingleResponse } from "@/shared/api-response";
import { Table } from "./table.interface";

export interface GetTableDto extends SingleResponse<Table> {}
