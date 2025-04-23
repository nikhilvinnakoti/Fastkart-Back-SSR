const mongoose = require("mongoose");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  id: Number,
  order_number: Number,
  consumer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User collection
  tax_total: Number,
  shipping_total: Number,
  points_amount: Number,
  wallet_balance: Number,
  amount: Number,
  total: Number,
  coupon_total_discount: Number,
  payment_method: String,
  payment_status: String,
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, // Reference to Store collection
  billing_address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }, // Reference to Address collection
  shipping_address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }, // Reference to Address collection
  delivery_description: String,
  delivery_interval: String,
  order_status_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus' }, // Reference to OrderStatus model
  coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  created_by_id: String,
  invoice_url: String,
  status: { type: Number, default: 1 },
  delivered_at: Date,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
  store: { type: Object }, // Embedded store details
  consumer: { type: Object }, // Embedded consumer details (can be a reference to User model)
  products: [{ // Array of product objects with details
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number,
    total_price: Number,
    discount: Number
  }],
  order_status: { type: Object }, // Embedded order status details
  sub_orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // Reference to sub-orders
}, { strict: false });

const Order = mongoose.model("Order", OrderSchema, "orders");

module.exports = Order;

