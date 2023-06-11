const { json } = require("express");

class APIFeatures {
  constructor(query, querStr) {
    this.querStr = querStr;
    this.query = query;
  }

  search() {
    const keyword = this.querStr.keyword
      ? {
          name: {
            $regex: this.querStr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.querStr };
    // Remove fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advance filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.querStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query
      .sort({ _id: -1 }) // Sort in descending order of ID
      .limit(resPerPage)
      .skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
