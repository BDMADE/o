Spree::Product.class_eval do
  after_save :autofill_variants_sku

  def autofill_variants_sku
    variants.map(&:autofill_sku)
  end
end