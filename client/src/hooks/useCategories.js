import { useContext } from "react";
import { BrowseCategoriesContext } from "../contexts/BrowseCategoriesContext";

export const useCategories = () => useContext(BrowseCategoriesContext);