$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    let student_discount = $("#student_discount").val()
    let bkash_discount = $("#student_discount").val()
    let festival_discount = $("#festival_discount").val()

    let student_discount_percentage = student_discount/100
    let bkash_discount_percentage = bkash_discount/100
    let festival_discount_percentage = festival_discount/100



    let student_discount_selector = $('label[for="student_discount"]')
    let bkash_discount_selector = $('label[for="bkash_discount"]')
    let festival_discount_selector = $('label[for="festival_discount"]')
    let variant_sale_discount_selector = $('label[for="variant_sale_discount"]')
    let variant_profit_percentage_selector = $('label[for="variant_profit_percentage"]')


    $("#variant_cost_price, #variant_sale_discount, #variant_profit_percentage").on('change', function () {

        let variant_price = $("#variant_price").val()
        let variant_cost_price = $("#variant_cost_price").val()
        let variant_sale_discount = $("#variant_sale_discount").val()
        let variant_profit = $("#variant_profit_percentage").val()

        let sale_percentage = variant_sale_discount/100
        let profit_percentage = variant_profit/100

        let total_coupon_discount = student_discount_percentage + festival_discount_percentage + bkash_discount_percentage
        let total_cost_price = variant_cost_price * (1 + sale_percentage + profit_percentage)
        let total_cost_price_without_sale_discount = variant_cost_price * (1 + profit_percentage - sale_percentage)

        let new_price = total_cost_price/(1 - total_coupon_discount)
        let new_sale_price = total_cost_price_without_sale_discount/(1 - total_coupon_discount)
        console.log(new_sale_price)

        //    update new price
        let int_new_price = Math.round(parseInt(new_price))
        let int_new_sale_price = Math.round(parseInt(new_sale_price))


        let total_bkash_discount = Math.round(new_price * bkash_discount/100)

        $("#variant_price").val(int_new_price)
        $("#variant_sale_price").val(int_new_sale_price)

        // update tooltip
        let currency = '৳ '
        let total_student_discount = Math.round(new_price * student_discount_percentage)
        // bkash discount calculation will be based on new price

        let total_festival_discount = Math.round(new_price * festival_discount_percentage)
        let total_variant_sale_discount = Math.round(variant_cost_price * sale_percentage)
        let total_variant_profit_percentage = Math.round(variant_cost_price * profit_percentage)

        student_discount_selector.attr('data-original-title', (currency + total_student_discount))
        bkash_discount_selector.attr('data-original-title', (currency + total_bkash_discount))
        festival_discount_selector.attr('data-original-title', (currency + total_festival_discount))
        variant_sale_discount_selector.attr('data-original-title', (currency + total_variant_sale_discount))
        variant_profit_percentage_selector.attr('data-original-title', (currency + total_variant_profit_percentage))
    })
})