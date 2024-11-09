import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import Product from "../models/productModel.js";
import ApiFeatures from "../utils/apiFeatures.js";


export const createProduct = catchAsyncError(async (req, res, next) => {
    const { name, description, price, category, stock, ratings, image, numOfReviews, reviews } = req.body;

    if (!name || !description || !price || !category || stock === undefined) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const slugBase = `${name}-${category}`.toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const slug = `${slugBase}-${Math.random().toString(36).substr(2, 6)}`;

    const newProduct = new Product({
        name,
        description,
        price,
        ratings: ratings || 0,
        slug,
        image: image || "product-img",
        category,
        stock,
        numOfReviews: numOfReviews || 0,
        reviews: reviews || [],
        user: req.user.id,  
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json({
            success: true,
            product: savedProduct,
        });
    } catch (error) {
        next(error);
    }
});



export const getProducts = async (req, res, next) => {
    try {
        const resultPerPage = 10;

        const minPrice = req.query.minPrice || null;
        const maxPrice = req.query.maxPrice || null;

        const apiFeaturesForCount = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter(); 

        const filteredProductsCount = await apiFeaturesForCount.query.countDocuments();

        const apiFeatures = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter() 
            .pagination(resultPerPage);

        const products = await apiFeatures.query;

        res.status(200).json({
            success: true,
            message: "Route is working fine",
            products,
            totalProductsCount: await Product.countDocuments(),
            resultPerPage,
            filteredProductsCount
        });
    } catch (error) {
        next(error);
    }
};



