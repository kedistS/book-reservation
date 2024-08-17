const Reservation = require('../models/Reservation');
const Book = require('../models/Book');

exports.createReservation = async (req, res) => {
    try {
      const { bookId } = req.body;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      const newReservation = new Reservation({
        user: req.user.id,
        book: bookId,
        startDate: new Date(), // Set to current date
        status: 'pending' // Set initial status to pending
      });
      const reservation = await newReservation.save();
      res.json(reservation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user', 'name').populate('book', 'title');
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user', 'name').populate('book', 'title');
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    if (reservation.user._id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to view this reservation' });
    }
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateReservationStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      
      reservation.status = status;
      
      if (status === 'approved') {
        const approvalDate = new Date();
        reservation.startDate = approvalDate;
        
        // Set end date to 2 days after approval
        const endDate = new Date(approvalDate);
        endDate.setDate(endDate.getDate() + 2);
        reservation.endDate = endDate;
      }
      
      await reservation.save();
      res.json(reservation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };