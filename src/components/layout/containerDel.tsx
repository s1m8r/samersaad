interface Props {
  children: React.ReactNode;
}
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ContainerDel({ children }: Props) {
  return <div>{children}</div>;
}
// export default function ContainerDel({ children }: Props) {
//   return (
//     <Dialog>
//       {/* <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//         <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6"> */}
//       {children}
//       {/* </div>
//       </div> */}
//     </Dialog>
//   );
// }

//  <Dialog>
//   <form>
//     <DialogTrigger render={<Button variant="outline">Open Dialog</Button>} />
//     <DialogContent className="sm:max-w-sm">
//       <DialogHeader>
//         <DialogTitle>Edit profile</DialogTitle>
//         <DialogDescription>
//           Make changes to your profile here. Click save when you&apos;re
//           done.
//         </DialogDescription>
//       </DialogHeader>
//       <FieldGroup>
//         <Field>
//           <Label htmlFor="name-1">Name</Label>
//           <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
//         </Field>
//         <Field>
//           <Label htmlFor="username-1">Username</Label>
//           <Input id="username-1" name="username" defaultValue="@peduarte" />
//         </Field>
//       </FieldGroup>
//       <DialogFooter>
//         <DialogClose render={<Button variant="outline">Cancel</Button>} />
//         <Button type="submit">Save changes</Button>
//       </DialogFooter>
//     </DialogContent>
//   </form>
// </Dialog>
