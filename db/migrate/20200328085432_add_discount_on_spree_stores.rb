class AddDiscountOnSpreeStores < ActiveRecord::Migration[6.0]
  def up
    add_column :spree_stores, :student_discount, :integer, default: 10
    add_column :spree_stores, :bkash_discount, :integer, default: 10
    add_column :spree_stores, :festival_discount, :integer, default: 10
  end

  def down
    remove_column :spree_stores, :student_discount
    remove_column :spree_stores, :bkash_discount
    remove_column :spree_stores, :festival_discount
  end
end
