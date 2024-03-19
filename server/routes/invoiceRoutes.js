//routes/invoiceRoutes.js
const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.get("/invoice", invoiceController.getAllInvoice);
router.get("/invoice/:id", invoiceController.getInvoiceById);
router.post("/invoice", invoiceController.createInvoice);
router.put("/invoice/:id", invoiceController.updateInvoice);
router.delete("/invoice/:id", invoiceController.deleteInvoice);
router.get("/test-visma-token", invoiceController.testVismaToken);
router.post("/invoice/visma", invoiceController.sendInvoiceToClient);

//Unpaid  Invoices
router.get("/invoice/unpaid/total", invoiceController.getTotalUnpaidInvoices);

// Route for getting total invoices by user
router.get(
  "/invoice/organizer/:organizerID/total-unpaid",
  invoiceController.getTotalUnpaidInvoicesByOrganizer
);

module.exports = router;
