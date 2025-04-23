import { createSlice } from "@reduxjs/toolkit";
import { TableState } from "../interfaces/table-state.interface";
import { tableApi } from "../api/table.api";

const initialState: TableState = {
  tables: [],
  currentTable: null,
  isLoading: false,
  error: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTables: (state, action) => {
      state.tables = action.payload;
    },
    setCurrentTable: (state, action) => {
      state.currentTable = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Find one table
    builder.addMatcher(
      tableApi.endpoints.findOneTable.matchPending,
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    ),
      builder.addMatcher(
        tableApi.endpoints.findOneTable.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.currentTable = payload.data;
        }
      );
  },
});

export const { setTables, setCurrentTable, setLoading, setError } =
  tableSlice.actions;
export const tableReducer = tableSlice.reducer;
