export function subcategoryValidator(req, res, next) {
  
    if (req.body) {
      let {categoryId,subcategoryName} = req.body;
  
      if (!categoryId){
        res.send({message:"category is required"});
        return
      } 
    if (!subcategoryName){
      res.send({message:"subcategory name is required"});
      return
    }      
}
    next()
}