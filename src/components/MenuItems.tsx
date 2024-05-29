import { uniqueId } from "lodash";
import languange from "@/lang/languange";

const MenuItems = () => {
  const MenuItems = [
    {
      id: uniqueId(),
      name: "Beranda",
      url: "/",
      locale: "home"
    },
  ];

  return MenuItems;
};

export default MenuItems;
