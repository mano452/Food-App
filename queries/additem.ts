// import { Additem } from "@/model/additem";
// export async function Addproduct(addproduct: InstanceType<typeof Additem>){
//     try{
//         await Additem.create(addproduct);
//     }catch (e) {
//         throw new Error(typeof e === "string" ? e : (e instanceof Error ? e.message : JSON.stringify(e)))
//     }
// }

import { Additem } from "@/model/additem";

// Fix: save correctly depending on whether it's a model instance or plain object
export async function Addproduct(addproduct: any) {
  try {
    if (addproduct.save) {
      // It's already a Mongoose document
      return await addproduct.save();
    } else {
      // It's a plain object
      return await Additem.create(addproduct);
    }
  } catch (e) {
    throw new Error(
      typeof e === "string"
        ? e
        : e instanceof Error
        ? e.message
        : JSON.stringify(e)
    );
  }
}
