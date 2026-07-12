import { Link, useRouterState } from "@tanstack/react-router";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
interface items {
  name: string;
  path: string;
}
interface Props {
  items: items[];
}

export default function TabsRouter({ items }: Props) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <>
      <Tabs value={pathname} className="mb-4">
        <TabsList>
          {items.map((item) => (
            <TabsTrigger value={item.path} key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
}
