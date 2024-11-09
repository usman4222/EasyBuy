class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i"
                }
            }
            : {};

        console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit", "minPrice", "maxPrice"];

        removeFields.forEach(key => delete queryCopy[key]);

        if (this.queryStr.minPrice || this.queryStr.maxPrice) {
            const priceFilter = {};

            if (this.queryStr.minPrice) {
                priceFilter.$gte = this.queryStr.minPrice; 
            }

            if (this.queryStr.maxPrice) {
                priceFilter.$lte = this.queryStr.maxPrice; 
            }

            queryCopy.price = priceFilter;
        }

        this.query = this.query.find(queryCopy);
        return this;
    }


    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default ApiFeatures;
