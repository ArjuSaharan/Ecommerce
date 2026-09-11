import express from 'express'
import productModel from '../config/models/products.js'

import { protect ,admin} from '../middleware/authmiddleware.js'


const router=express.Router();


// create a product post request 
// access of this route only private and admin
router.post('/',protect,admin ,async(req,res)=>{
    try{

        const {name,description,price,discountPrice,countInStock,category,brand,
            sizes,colors,material,collections,gender,images,isFeatured,isPublished,
            tags,dimensions,weight,sku}=req.body;

            const product=new productModel({name,description,price,discountPrice,countInStock,category,brand,
            sizes,colors,material,collections,gender,images,isFeatured,isPublished,
            tags,dimensions,weight,sku,
             user:req.user._id}) //refrence id of admin user creating product

             const createdProduct=await product.save();

             res.status(201).json(createdProduct);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"server error"});
    }

})


// add route put request to update the product by using id
// upadte in existing product by id access by authentication admin users
router.put("/:id",protect,admin,async(req,res)=>{
    try{
        const {name,description,price,discountPrice,countInStock,category,brand,
            sizes,colors,material,collections,gender,images,isFeatured,isPublished,
            tags,dimensions,weight,sku}=req.body;

            // find product in databse uding id
        const product=await productModel.findById(req.params.id);
        if(product){
            product.name= name || product.name;
            product.description = description || product.description;
            product.price= price || product.price;
            product.discountPrice= discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category= category || product.category;
            product.brand= brand || product.brand;
            product.sizes= sizes || product.sizes;
            product.collections= collections || product.collections;
            product.material= material || product.material;
            product.gender= gender || product.gender;
            product.images= images || product.images;
            product.isFeatured= isFeatured !== undefined ? isFeatured: product.isFeatured;
            product.isPublished= isPublished!==undefined ? isPublished: product.isPublished;
            product.tags= tags || product.tags;
            product.dimensions= dimensions || product.dimensions;
            product.weight= weight || product.weight;
            product.sku= sku || product.sku;


            const updatedProduct= await product.save();
            res.json({updatedProduct});
        }
        else{
            res.status(404).json({message:"product not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"server error"});
    }
})


// delete the product using id
//delete product by id from db and access by private authenticated admin
router.delete('/:id',protect,admin,async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id);
        if(product){
            // remove from db
            await product.deleteOne();
            res.json({message:"product deleted successfully"});
        }
        else{
            res.status(404).json({message:"product not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"server error"});
    }
})

// get request to filter the product acc to query serach
// access public 
router.get("/",async(req,res)=>{
    try{
        const {collection,size,color,gender,minPrice,maxPrice,sortBy,search,category,material,brand,limit}=req.query;

        let query={};
        // filter logic based on query
        if(collection && collection.toLocaleLowerCase()!=="all"){
            query.collections=collection;
        }
        if(category && category.toLowerCase()!=="all"){
            query.category=category;
        }
        if(material){
            query.material={$in:material.split(",")};
        }
        if(brand){
            query.brand={$in:brand.split(",")};
        }
        if(size){
            query.sizes={$in:size.split(",")};
        }
        if(color){
            query.colors={$in:color.split(",")};
        }
        if(gender){
            query.gender=gender;
        }
        if(minPrice || maxPrice){
            query.price={};
            if(minPrice) query.price.$gte=Number(minPrice);
            if(maxPrice) query.price.$lte=Number(maxPrice);
        }
        if(search){
            query.$or=[
                {name : {$regex : search, $options:"i"}},
                {description:{$regex:search, $options:"i"}},
            ];
        }
        let sort={};
        if(sortBy){
            switch(sortBy){
                case "priceAsc":
                    sort={price:1};
                    break;
                case "priceDesc":
                    sort={price:-1};
                    break;
                case "popularity":
                    sort={rating:-1};
                    break
                 default:
                        break;
            }
        }

        // fetch the product from database
        let products =await productModel.find(query)
        .sort(sort).limit(Number(limit) || 0);
        res.json(products);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"server error"});
    }
})

// best seller route get request 
// reterive the best seller product using rating

router.get('/best-seller', async (req, res) => {
    try {
        const bestSeller = await productModel
            .findOne()
            .sort({ rating: -1 });

        if (bestSeller) {
            return res.json(bestSeller);
        }

        return res.status(404).json({
            message: "No best seller found"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
});

// new arrivals get request 
// retervive product based on createion date
router.get("/new-arrivals",async(req,res)=>{
    try{
        const newArrivals=await productModel.find().sort({createdAt:-1}).limit(8);
        res.json(newArrivals);
        
    }
    catch(error){
        return res.status(500).json({message:"server error"});
    }
})


// get api/product by id reterive single product by id
// access public
router.get('/:id',async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id);
        if(product){
            res.json(product);
        }
        else{
            res.status(404).json({message:"product not found"});
        }
    }
    catch(error){
        res.status(500).send("server error");
    }

})

// api/product simlar id
// retervice product based on curremt reteivew product

router.get("/similar/:id",async(req,res)=>{
    const {id} =req.params
    try{
        const product=await productModel.findById(id);
        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        const similarProducts=await productModel.find({
            _id:{$ne:id},
            gender:product.gender,
            category:product.category
        }).limit(4);
        res.json(similarProducts);
    }
    catch(error){
        return res.status(500).json({message:"server error"});
    }
})


export default router;