import {save,getAll, Delete, update} from '../services/category.service.js'

export async function saveCategory(req,res,next){
    try{
        const categoryData = req.body
        const result = await save(categoryData)
        console.log('result',result)
        res.status(200).send({message:"successfully added category"})
    }catch(err){
        console.log(err);
        next(err)
    }    
}

export async function getAllCategory(req,res,next){
    try{
        const result = await getAll()
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}

export async function updateCategory(req,res,next){
    try{
        const categoryId = req.params.id
        const categoryData = req.body
        const result = await update(categoryId,categoryData)
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}

export async function deleteCategory(req,res,next){
    try{
        const categoryId = req.params.id
        const result = await Delete(categoryId)
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}