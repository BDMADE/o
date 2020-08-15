Spree::Variant.class_eval do

  def size_object
    return @size_object if @size_object
    @size_object = option_values.select { |ov| ov.option_type_id == 1 }.first
    @size_object
  end

  def color_object
    return @color_object if @color_object
    @color_object = option_values.select { |ov| ov.option_type_id == 2 }.first
    @color_object
  end

  def size
    size_object&.name
  end

  def color
    color_object&.name
  end

  def autofill_sku
    return if product.sku.empty? || color_object.nil? || size_object.nil?
    update(sku: compose_sku)
  end

  private

  def compose_sku
    "#{product.sku}-#{size_object.name.downcase.split(' ').join('-')}-#{color_object.name.downcase.split(' ').join('-')}"
  end

end