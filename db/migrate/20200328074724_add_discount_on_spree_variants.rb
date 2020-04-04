class AddDiscountOnSpreeVariants < ActiveRecord::Migration[6.0]
  def up
    add_column :spree_variants, :sale, :boolean, default: false
    add_column :spree_variants, :sale_price, :integer, default: 0
    add_column :spree_variants, :sale_discount, :integer, default: 10
    add_column :spree_variants, :profit_percentage, :float, default: 10.0
  end

  def down
    remove_column :spree_variants, :sale
    remove_column :spree_variants, :sale_price
    remove_column :spree_variants, :sale_discount
    remove_column :spree_variants, :profit_percentage
  end
end
