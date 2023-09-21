import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Main from "../pages/main";
import Trash from "../pages/trash";
import ArchivePage from "../pages/arch-page";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/trash",
        element: <Trash />,
      },
      {
        path: "/archive",
        element: <ArchivePage />,
      },
    ],
  },
]);

export default router;
