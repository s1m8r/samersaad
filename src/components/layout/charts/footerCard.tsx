import { CardFooter } from "@/components/ui/card";

interface Props {
  description?: string;
}

export default function FooterCard({
  description = "Data updates automatically as new items are added",
}: Props) {
  return (
    <CardFooter className="text-sm text-muted-foreground">
      {description}
    </CardFooter>
  );
}
