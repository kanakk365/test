import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Item } from "@/app/actions/foods";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <Card className="overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {item.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square w-full">
                <Image
                  src={image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <CardContent className="p-4">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="mt-2 text-sm text-gray-600">{item.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary">{item.category}</Badge>
          <Badge variant="secondary">{item.spice_level}</Badge>
          <Badge variant="secondary">{item.timing}</Badge>
        </div>

        <div className="mt-4">
          <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
          <p className="text-sm text-gray-600">
            {item.standard_serving_quantity} {item.standard_serving_unit}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
