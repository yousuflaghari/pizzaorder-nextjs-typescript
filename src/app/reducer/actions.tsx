import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzaData = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const response = await axios.get("https://dummyjson.com/recipes");
    return response.data.recipes;
  }
);
