import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { countActions } from "./countActions";

import { RootState } from "./types";
import { habitActions } from "./actions";

const useStore = create<RootState>()(
  devtools((...args) => ({
    ...persist(habitActions, { name: "habits" })(...args),
    ...countActions(...args),
    isLoading: false,
    error: null,
  }))
);

export default useStore;
