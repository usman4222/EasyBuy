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



export const getAdminProducts = async (req, res, next) => {
    try {

        const products = await Product.find({ user: req.user.id });

        if (!products || products.length === 0) {
            // return res.status(404).json({
            //     success: false,
            //     message: "No products found for this admin."
            // });
            return next(new ErrorHandler("No products found for this admin.", 40));
        }

        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        next(error); 
    }
};



export const updateProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, category, stock, image } = req.body;

    const product = await Product.findById(id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (image) product.image = image;


    if (name || category) {
        const slugBase = `${name || product.name}-${category || product.category}`.toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
        product.slug = `${slugBase}-${Math.random().toString(36).substr(2, 6)}`;
    }

    const updatedProduct = await product.save();

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
    });
});


export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});
