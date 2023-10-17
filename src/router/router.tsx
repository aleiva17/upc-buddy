import {createBrowserRouter} from "react-router-dom";
import {CalculatorPage} from "../grades-calculator/pages/Calculator.page";
import {SettingsPage} from "../settings/pages/Settings.page.tsx";
import {NotFoundPage} from "../public/pages/NotFound.page.tsx";
import {SummaryPage} from "../grades-calculator/pages/Summary.page.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CalculatorPage />
  },
  {
    path: "/settings",
    element: <SettingsPage />
  },
  {
    path: "/summary",
    element: <SummaryPage />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);