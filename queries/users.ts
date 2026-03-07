import { User } from "@/model/user-model";
export async function createUser(user: InstanceType<typeof User>){
    try{
        await User.create(user);
    }catch (e) {
        throw new Error(typeof e === "string" ? e : (e instanceof Error ? e.message : JSON.stringify(e)))
    }
}