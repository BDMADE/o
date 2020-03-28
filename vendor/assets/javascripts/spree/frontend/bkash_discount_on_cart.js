/* global accounting */
function PaymentTotalManager (input1) {
    this.input = input1
    this.paymentMethods = $('label[data-behavior="payment-method-selector"]')
    this.bkashPaymentTotal = $('[data-hook="bkash-payment-total"]')
    this.bkash_discount_total = $('#order_bkash_discount_total')
    this.orderTotal = this.input.orderTotal

    this.formatOptions = {
        symbol: this.bkashPaymentTotal.data('currency'),
        decimal: this.bkashPaymentTotal.attr('decimal-mark'),
        thousand: this.bkashPaymentTotal.attr('thousands-separator'),
        precision: this.bkashPaymentTotal.attr('precision')
    }
}

PaymentTotalManager.prototype.calculatePaymentTotal = function () {
    let checked = $('input[name="order[payments_attributes][][payment_method_id]"]').filter(':checked')
    this.sum = 0
    $.each(checked, function () {
        this.checked_discount = checked.closest('label').data('discount')
        this.checked_flat_rate = checked.closest('label').data('flat-rate')

        if(this.checked_flat_rate) {
             this.sum += this.parseCurrencyToFloat(this.checked_discount)
         }
        else {
            this.item_total = this.parseCurrencyToFloat($(".sub-total").data('item-total'))
            this.bkashDiscount = -((this.item_total * this.checked_discount) / 100.0)
            this.sum += this.parseCurrencyToFloat(this.bkashDiscount)
        }

    }.bind(this))
    return this.readjustSummarySection(
        this.parseCurrencyToFloat(this.orderTotal.html()),
        this.sum,
        this.parseCurrencyToFloat(this.bkashPaymentTotal.html())
    )
}

PaymentTotalManager.prototype.parseCurrencyToFloat = function (input) {
    return accounting.unformat(input, this.formatOptions.decimal)
}

PaymentTotalManager.prototype.readjustSummarySection = function (orderTotal, newBkashDiscountTotal, oldBkashDiscountTotal) {
    let newOrderTotal = orderTotal + (newBkashDiscountTotal - oldBkashDiscountTotal)
    let bkash_discount = accounting.formatMoney(newBkashDiscountTotal, this.formatOptions)
    this.bkashPaymentTotal.html(bkash_discount)
    this.bkash_discount_total.val(newBkashDiscountTotal)
    return this.orderTotal.html(accounting.formatMoney(accounting.toFixed(newOrderTotal, 10), this.formatOptions))
}

PaymentTotalManager.prototype.bindEvent = function () {
    this.paymentMethods.change(function () {
        return this.calculatePaymentTotal()
    }.bind(this))
}

Spree.ready(function ($) {
    let input = {
        orderTotal: $('#summary-order-total')
    }
    return new PaymentTotalManager(input).bindEvent()
})
