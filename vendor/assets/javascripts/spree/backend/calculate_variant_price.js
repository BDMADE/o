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

        let variant_cost_price = $("#variant_cost_price").val()
        let variant_sale_discount = $("#variant_sale_discount").val()
        let variant_profit = $("#variant_profit_percentage").val()

        let variant_sale_discount_percentage = variant_sale_discount/100
        let variant_profit_percentage = variant_profit/100

        let new_price = variant_cost_price * (1 + student_discount_percentage + bkash_discount_percentage + festival_discount_percentage + variant_sale_discount_percentage + variant_profit_percentage)
        let new_sale_price = variant_cost_price * (1 + student_discount_percentage + bkash_discount_percentage + festival_discount_percentage + variant_profit_percentage)

        //    update new price
        let int_new_price = parseInt(new_price)
        let int_new_sale_price = parseInt(new_sale_price)

        $("#variant_price").val(int_new_price)
        $("#variant_sale_price").val(int_new_sale_price)

        // update tooltip
        let currency = '৳ '
        let total_student_discount = variant_cost_price * student_discount_percentage
        let total_bkash_discount = variant_cost_price * bkash_discount_percentage
        let total_festival_discount = variant_cost_price * festival_discount_percentage
        let total_variant_sale_discount = variant_cost_price * variant_sale_discount_percentage
        let total_variant_profit_percentage = variant_cost_price * variant_profit_percentage

        student_discount_selector.attr('data-original-title', (currency + total_student_discount))
        bkash_discount_selector.attr('data-original-title', (currency + total_bkash_discount))
        festival_discount_selector.attr('data-original-title', (currency + total_festival_discount))
        variant_sale_discount_selector.attr('data-original-title', (currency + total_variant_sale_discount))
        variant_profit_percentage_selector.attr('data-original-title', (currency + total_variant_profit_percentage))

        console.log(total_student_discount)
    })
})