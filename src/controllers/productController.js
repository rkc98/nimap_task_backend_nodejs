const { db } = require("../db/connection");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createProduct = (req, res, next) => {
  const query =
    "Insert into product(`productName`,`categoryName`,`categoryId`) values (?)";
  const values = [
    req.body.productName,
    req.body.categoryName,
    req.body.categoryId,
  ];
  db.query(query, [values], (err, result) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler(err.code));
    }
    return res.status(200).json({
      success: true,
      message: `Record Inserted Successfully`,
    });
  });
};

exports.getProducts = (req, res, next) => {
  const countquery = "Select count(*) as total from product";
  const paginationQuery =
    "Select * from product ORDER BY productId DESC limit ? OFFSET ?";
  db.query(countquery, (err, result) => {
    if (err) {
      return next(new ErrorHandler());
    }
    total = result[0].total;
    db.query(
      paginationQuery,
      [Number(req.query.limit), Number(req.query.offset)],
      (err, data) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler());
        }
        return res.status(200).json({ success: true, result: data, total });
      }
    );
  });
};

exports.getProductById = (req, res, next) => {
  const query = "select * from product where `productId`=?";
  const values = [req.params.id];
  db.query(query, values, (err, result) => {
    if (err) {
      return next(new ErrorHandler());
    }
    return res.status(200).json({ success: true, result:result[0] });
  });
};

exports.updateProduct = (req, res, next) => {
  const query = "Update product set `productName`=?,`categoryName`=? where `productId`=? ";
  const values = [req.body.productName,req.body.categoryName, req.body.productId];
  db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler());
    }
    if (result.changedRows === 1) {
      return res.status(200).json({
        success: true,
        message: `Record Updated Successfully`,
      });
    } else {
      return next(new ErrorHandler("Record Not Updated", 400));
    }
  });
};

exports.deleteProduct = (req, res, next) => {
  const query = "Delete from product where `productId`=?";
  const values = [req.params.id];
  db.query(query, values, (err, result) => {
    if (err) {
      return next(new ErrorHandler());
    }
    if (result.affectedRows === 1) {
      return res.status(200).json({
        success: true,
        message: `Record Deleted Successfully`,
      });
    } else {
      return next(new ErrorHandler("Record Not Found", 404));
    }
  });
};
