Spree::Admin::StoresController.class_eval do
  def update
    @store.assign_attributes(permitted_store_params)

    if @store.save
      variants = Spree::Variant.all
      student_discount_p = @store.try(:student_discount)/100.0
      bkash_discount_p = @store.try(:bkash_discount)/100.0
      festival_discount_p = @store.try(:festival_discount)/100.0

      variants.each do |variant|
        cost_price = variant.cost_price
        sale_discount_p = variant.sale_discount/100.0
        profit_p = variant.profit_percentage/100.0
        variant_price = cost_price * (1 + profit_p + sale_discount_p + student_discount_p + bkash_discount_p + festival_discount_p)
        variant.update!(price: variant_price)
      end

      flash[:success] = flash_message_for(@store, :successfully_updated)
      redirect_to admin_stores_path
    else
      flash[:error] = "#{Spree.t('store_errors.unable_to_update')}: #{@store.errors.full_messages.join(', ')}"
      render :edit
    end
  end
end