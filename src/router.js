import App from "./App";
import AddProducts from "./Components/AddProducts";

export const routers = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/add-product",
        element: <AddProducts />,
      },
    ],
  },
];
