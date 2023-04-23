const fs = require('fs')

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

exports.chekID = (req,res,next, val) => {
  if(req.params.id > tours.length) {
    return res.status(404).json({
      status:'fail',
      message:"Invalid Id"
    })
  }
  next()
}

exports.checkBody = (req, res, next) => {
  console.log(req.body)
  if(!req.body.name || !req.body.price) {
    return res.status(400).json({
      status:'fail',
      message:"Missing Price or Name"
    })
  }
  next()
}
  
exports.getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  }
  
exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
  
    tours.push(newTour);
  
    fs.writeFile(
      `${__dirname}/../dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    );
  }
  
exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((ele) => ele.id === id);
  
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tour,
      },
    });
  }
  
exports.updateTour = (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here>',
      },
    });
  }
  
exports.deleteTour = (req, res) => {
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  }