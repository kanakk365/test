"use client";

import { useEffect } from "react";
import { useMenuStore } from "@/app/hooks/menu";
import MenuCard from "../feature/menus/menu-card";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/app/hooks/dashboard";
import { getAllMenus } from "@/app/actions/menus";

export default function ViewMenus() {
  const { menus, setMenus } = useMenuStore();
  const { setActive } = useDashboard();

  useEffect(() => {
    const fetchMenus = async () => {
      const data = await getAllMenus();
      if (data) {
        setMenus(data);
      }
    };
    fetchMenus();
  }, [setMenus]);

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-3xl font-bold mb-8">Available Menus</h1>
      <div className="flex gap-1">
        <Button
          className="mx-8 my-4"
          variant="secondary"
          onClick={() => setActive("create-menu")}
        >
          Create Menu
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  );
}
