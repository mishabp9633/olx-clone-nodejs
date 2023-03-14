export function categoryValidator(req, res, next) {
  
    if (req.body) {
      let {categoryName} = req.body;
  
    if (!categoryName){
      res.send({message:"category name is required"});
      return
    }      
}
    next()
}