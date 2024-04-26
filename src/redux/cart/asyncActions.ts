import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { IFetchUSD } from "./types";

export const fetchUSD = createAsyncThunk<IFetchUSD[]>(
  "cart/fetchUSD",
  async () => {
    const { data } = await axios.get<IFetchUSD[]>(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json"
    );
    return data;
  }
);
