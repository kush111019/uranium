const express = require('express');
const router = express.Router();
const mymovies = require('./movies');
const mymoviess=require('./films')

router.get('/movies/:aa', function(req, res) 
{   
    let i=0;
    let mov=mymovies.a();
    if(req.params.aa<=4)
    {    
        for(i;i<mov.length;i++)
        {
            if(i==req.params.aa)
            break;
        }
        console.log(mov[i]);
    }
    else
    {
        console.log("invalid input");
    }
});
router.get('/movies',function(req,res){

let mov=mymovies.b();
mov=mymovies.b();
console.log(mov);

});

router.get('/films',function(req,res){

     let my=mymoviess.d();
     console.log(my);
});

router.get('/films/:setter',function(req,res){
   
   let mo=mymoviess.b();
   if(req.setter<mo.length)
   {
   let x=req.params.setter-1;
   let z=mo[x];
   console.log(z);
   }
   else
   {
       console.log("No movie exists with this id");
   }
});
module.exports = router;
// adding this comment for no reason