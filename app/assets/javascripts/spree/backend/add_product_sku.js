function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

$(document).on('click', '#product_name', function(){
    let store_name = $('#product_store').val();
    let product_name = $(this).val();
    let product_id = $('#product_id').val();
    if(product_id == undefined) {
        product_id = 'xxxx'
    }
    if(store_name == undefined) {
        store_name = 'Demo'
    }

    let new_product_id = pad(product_id, 4)
    let new_product_name = store_name + ' ' + product_name;
    let product_slug = product_name.split(" ").join('-').toLowerCase();
    let new_name = new_product_name.match(/\b\w/g).join('').toLowerCase();
    let new_sku = new_name + '-' + new_product_id
    $('#product_sku').val(new_sku);
    $('#product_slug').val(product_slug);
    }
)