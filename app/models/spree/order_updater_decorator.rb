Spree::OrderUpdater.class_eval do
  # add bkash discount total
  def update_order_total
    order.total = order.item_total + order.shipment_total + order.adjustment_total + order.bkash_discount_total
  end
end
