import {save,getAll, Delete, update} from '../services/subcategory.service.js'

export async function saveSubcategory(req,res,next){
    try{
        const subcategoryData = req.body
        const result = await save(subcategoryData)
        console.log('result',result)
        res.status(200).send({message:"successfully added subcategory"})
    }catch(err){
        console.log(err);
        next(err)
    }    
}

export async function getAllSubcategory(req,res,next){
    try{
        const page = req.query.page
        const limit = req.query.limit || '10'
        const categoryId = req.query.categoryId
        const result = await getAll(categoryId, page, limit)
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}


export async function updateSubcategory(req,res,next){
    try{
        const subcategoryId = req.params.id
        const subcategoryData = req.body
        const result = await update(subcategoryId,subcategoryData)
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}

export async function deleteSubcategory(req,res,next){
    try{
        const subcategoryId = req.params.id
        const result = await Delete(subcategoryId)
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}