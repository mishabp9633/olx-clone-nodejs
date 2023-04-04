import { counts } from "../services/static.service.js"


export async function getAllCount(req,res,next){
    try{
        const result = await counts()
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}