Spree::Admin::StoresController.class_eval do
  def update
    @store.assign_attributes(permitted_store_params)

    if @store.save
      variants = Spree::Variant.all
      student_discount_p = @store.try(:student_discount)/100.0
      bkash_discount_p = @store.try(:bkash_discount)/100.0
      festival_discount_p = @store.try(:festival_discount)/100.0

      variants.each do |variant|
        cost_price = variant.cost_price.nil? ? 0 : variant.cost_price
        sale_discount_p = variant.sale_discount/100.0
        profit_p = variant.profit_percentage/100.0
        total_cost_price = cost_price * (1 + sale_discount_p + profit_p)
        total_coupon_discount = student_discount_p + bkash_discount_p + festival_discount_p
        variant_price = total_cost_price / (1 -  total_coupon_discount)
        sale_price = variant_price * (1 - sale_discount_p)
        variant.update!(price: variant_price)
        variant.update!(sale_price: sale_price)
      end

      flash[:success] = flash_message_for(@store, :successfully_updated)
      redirect_to admin_stores_path
    else
      flash[:error] = "#{Spree.t('store_errors.unable_to_update')}: #{@store.errors.full_messages.join(', ')}"
      render :edit
    end
  end
end