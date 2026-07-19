interface Props {
  images: string[];
  removeCategory: (index: number) => void;
}
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";

export default function ShowImages({ images, removeCategory }: Props) {
  return (
    <>
      <Carousel className="w-full max-h-24 overflow-hidden">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <div className="">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center">
                    <div className=" relative inline-block">
                      <span
                        className=" absolute cursor-pointer top-0 right-0 text-red-500/60 bg-gray-600/85 rounded-full hover:bg-gray-400/80"
                        onClick={() => removeCategory(index)}
                      >
                        <X />
                      </span>
                      <img
                        key={index}
                        onClick={() => removeCategory(index)}
                        src={src}
                        className="cursor-pointer object-cover rounded-md"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
