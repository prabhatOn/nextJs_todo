import prisma from "./db";
import FormElement from "./components/Form";
import SaveButton from "./components/saveButton";
import DeleteButton from "./components/DeleteButton";
import { deleteItem, edit } from "./action";
async function getData(){
  const data= await prisma.todo.findMany({
    select:{
      input: true,
      id: true,
    },
    orderBy:{
      createdAt: "desc",
    },
  });
  return data;
}
export default async function Home() {
  const data = await getData();
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="border rounded-lg shadow-xl p-10 w-fit">
               <FormElement/>
                <div className="mt-5 flex flex-col gap-y-2">
                    {data.map((todo) => (
                        <div key={todo.id} className="w-full h-full flex items-center flex-wrap">
                            <form action={edit} className="flex flex-wrap">
                                <input type="hidden" name="inputId" value={todo.id} />
                                <input type="text" name="input" defaultValue={todo.input} className="border p-1 max-w-full" />
                                <SaveButton />
                            </form>
                            <form action={deleteItem}>
                            <input type="hidden" name="inputId" value={todo.id} />
                            <DeleteButton/>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
