import ReactDOM from 'react-dom/client'
import './index.css'

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";

import Tailwind from "primereact/passthrough/tailwind";
import {PrimeReactProvider} from "primereact/api";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider value={
    {
      pt: Tailwind,
      ripple: true
    }
  }>
    <ToastContainer />
    <RouterProvider router={ router } />
  </PrimeReactProvider>
)
