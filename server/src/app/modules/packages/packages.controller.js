const catchAsync = require('../../../shared/catchasync');
const Packages = require('./packages.model');
const { PackageService } = require('./packages.service');

const AddProduct = async (req, res) => {
    try {
        const pkg = new Packages(req.body);
        await pkg.save();
        return res.status(200).send({
            status: '200',
            message: 'Package created successfully',
            data: pkg,
        });
    } catch (error) {
        return res.status(500).send({
            status: '500',
            message: 'Server Error',
        });
    }
};



const GetAllProducts = async (req, res) => {
    try {
        // const { listingType } = req.query;
        // const pkg = await Packages.find().sort({ price: -1 });
        //   await pkg.save();

        const pkg = await Packages.aggregate([
            {
                $addFields: {
                    priceAsNumber: { $toDouble: "$price" } // Convert price from string to double
                }
            },
            {
                $sort: { priceAsNumber: 1 } // Sort by the numeric price
            },
            {
                $project: { __v: 0, createdAt: 0, updatedAt: 0, priceAsNumber: 0 } // Exclude fields including temporary priceAsNumber
            }
        ]);
        return res.status(200).send({
            status: '200',
            message: 'Package found successfully',
            data: pkg,
        });
    } catch (error) {
        return res.status(500).send({
            status: '500',
            message: 'Server Error',
        });
    }
};

const PackagesContoller = {
    AddProduct,
    GetAllProducts,
};
module.exports = { PackagesContoller };

