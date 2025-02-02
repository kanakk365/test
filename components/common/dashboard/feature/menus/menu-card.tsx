import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
// import Image from "next/image";
import { Menu, useMenuStore } from "@/app/hooks/menu";
import { useDashboard } from "@/app/hooks/dashboard";

interface MenuCardProps {
  menu: Menu;
}

export default function MenuCard({ menu }: MenuCardProps) {
  const { setActive } = useDashboard();
  const { setMenuData } = useMenuStore();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl">{menu.name}</h3>
          <Badge variant={menu.is_active ? "secondary" : "destructive"}>
            {menu.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {menu.description}
        </p>

        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Type:</span> {menu.type}
          </p>
          <p className="text-sm">
            <span className="font-medium">Items:</span> {menu.items.length}
          </p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Menu Items:</h4>
          <div className="space-y-1">
            {menu.items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium">${item.price}</span>
              </div>
            ))}
            {menu.items.length > 3 && (
              <p className="text-sm text-muted-foreground">
                +{menu.items.length - 3} more items
              </p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setMenuData(menu);
            setActive("update-menu");
          }}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Update Menu
        </Button>
      </CardFooter>
    </Card>
  );
}
