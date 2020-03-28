class AddDiscountSpreePaymentMethods < ActiveRecord::Migration[6.0]
  def up
    add_column :spree_payment_methods, :discount, :integer, default: 0
    add_column :spree_payment_methods, :flat_rate, :boolean, default: true
  end

  def down
    remove_column :spree_payment_methods, :discount
    remove_column :spree_payment_methods, :flat_rate
  end
end
