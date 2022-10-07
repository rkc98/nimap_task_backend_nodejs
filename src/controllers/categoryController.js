const { db } = require("../db/connection");
const ErrorHandler = require("../utils/ErrorHandler");

exports.getCategory = (req, res, next) => {
  const countquery = "Select count(*) as total from category";
  const paginationQuery =
    "Select * from category ORDER BY id DESC limit ? OFFSET ?";
  db.query(countquery, (err, result) => {
    if (err) {
      return next(new ErrorHandler());
    }
    total = result[0].total;
    db.query(
      paginationQuery,
      [Number(req.query.limit?req.query.limit:100), Number(req.query.offset?req.query.offset:0)],
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

exports.getCategoryById = (req, res, next) => {
  const query = "select * from category where `Id`=?";
  const values = [req.params.id];
  db.query(query, values, (err, result) => {
    if (err) {
      return next(new ErrorHandler());
    }
    return res.status(200).json({ success: true, result:result[0] });
  });
};

exports.createCategory = (req, res, next) => {
  const query = "Insert into category(`categoryName`) values (?)";
  const values = [req.body.categoryName];
  db.query(query, values, (err, result) => {
    if (err) {
      return next(new ErrorHandler(err.code));
    }
    return res.status(200).json({
      success: true,
      message: `Record Inserted Successfully`,
    });
  });
};

exports.updateCategory = (req, res, next) => {
  const query = "Update category set `categoryName`=? where `Id`=? ";
  const values = [req.body.categoryName, req.body.id];
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
      return next(new ErrorHandler("Record Not Found", 404));
    }
  });
};

exports.deleteCategory = (req, res, next) => {
  const query = "Delete from category where `id`=?";
  const values = [req.params.id];
  db.query(query, values, (err, result) => {
    if (err) {
      return next(new ErrorHandler());
    }
    console.log(result);
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
