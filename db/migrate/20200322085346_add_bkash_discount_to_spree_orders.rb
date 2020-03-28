class AddBkashDiscountToSpreeOrders < ActiveRecord::Migration[6.0]
  def up
    add_column :spree_orders, :bkash_discount_total, :integer, default: 0.0
  end

  def down
    remove_column :spree_orders, :bkash_discount_total
  end
end
