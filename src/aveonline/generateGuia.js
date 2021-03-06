require("module-alias/register");
const request = require("@functions/request");
const getToken = require("@aveonline/getToken");
const processDestination = require("@functions/processDestination");

const exampleOrder = {
    id: 4224029688003,
    admin_graphql_api_id: "gid://shopify/Order/4224029688003",
    app_id: 580111,
    browser_ip: "181.33.185.246",
    buyer_accepts_marketing: false,
    cancel_reason: null,
    cancelled_at: null,
    cart_token: null,
    checkout_id: 22608072474819,
    checkout_token: "5883bf3a677e7cc8b2fb502d44190db3",
    client_details: {
        accept_language: "es-419,es;q=0.9",
        browser_height: 979,
        browser_ip: "181.33.185.246",
        browser_width: 1905,
        session_hash: null,
        user_agent:
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
    },
    closed_at: null,
    confirmed: true,
    contact_email: "blancofrancisco34@gmail.com",
    created_at: "2021-10-26T13:00:35-05:00",
    currency: "COP",
    current_subtotal_price: "1.00",
    current_subtotal_price_set: {
        shop_money: { amount: "1.00", currency_code: "COP" },
        presentment_money: { amount: "1.00", currency_code: "COP" },
    },
    current_total_discounts: "0.00",
    current_total_discounts_set: {
        shop_money: { amount: "0.00", currency_code: "COP" },
        presentment_money: { amount: "0.00", currency_code: "COP" },
    },
    current_total_duties_set: null,
    current_total_price: "7635.15",
    current_total_price_set: {
        shop_money: { amount: "7635.15", currency_code: "COP" },
        presentment_money: { amount: "7635.15", currency_code: "COP" },
    },
    current_total_tax: "0.15",
    current_total_tax_set: {
        shop_money: { amount: "0.15", currency_code: "COP" },
        presentment_money: { amount: "0.15", currency_code: "COP" },
    },
    customer_locale: "es",
    device_id: null,
    discount_codes: [],
    email: "blancofrancisco34@gmail.com",
    estimated_taxes: false,
    financial_status: "paid",
    fulfillment_status: null,
    gateway: "bogus",
    landing_site: "/wallets/checkouts.json",
    landing_site_ref: null,
    location_id: null,
    name: "#1004",
    note: null,
    note_attributes: [],
    number: 4,
    order_number: 1004,
    order_status_url:
        "https://testingapps13.myshopify.com/58723500227/orders/e1aad74b12b973a95f9a6cb05a6ae42f/authenticate?key=a11474d5f69793d5218e300135a8f44b",
    original_total_duties_set: null,
    payment_gateway_names: ["bogus"],
    phone: null,
    presentment_currency: "COP",
    processed_at: "2021-10-26T13:00:34-05:00",
    processing_method: "direct",
    reference: null,
    referring_site: "https://testingapps13.myshopify.com/products/testing",
    source_identifier: null,
    source_name: "web",
    source_url: null,
    subtotal_price: "1.00",
    subtotal_price_set: {
        shop_money: { amount: "1.00", currency_code: "COP" },
        presentment_money: { amount: "1.00", currency_code: "COP" },
    },
    tags: "",
    tax_lines: [
        {
            price: "0.15",
            rate: 0.15,
            title: "VAT",
            price_set: [Object],
            channel_liable: false,
        },
    ],
    taxes_included: false,
    test: true,
    token: "e1aad74b12b973a95f9a6cb05a6ae42f",
    total_discounts: "0.00",
    total_discounts_set: {
        shop_money: { amount: "0.00", currency_code: "COP" },
        presentment_money: { amount: "0.00", currency_code: "COP" },
    },
    total_line_items_price: "1.00",
    total_line_items_price_set: {
        shop_money: { amount: "1.00", currency_code: "COP" },
        presentment_money: { amount: "1.00", currency_code: "COP" },
    },
    total_outstanding: "0.00",
    total_price: "7635.15",
    total_price_set: {
        shop_money: { amount: "7635.15", currency_code: "COP" },
        presentment_money: { amount: "7635.15", currency_code: "COP" },
    },
    total_price_usd: "2.03",
    total_shipping_price_set: {
        shop_money: { amount: "7634.00", currency_code: "COP" },
        presentment_money: { amount: "7634.00", currency_code: "COP" },
    },
    total_tax: "0.15",
    total_tax_set: {
        shop_money: { amount: "0.15", currency_code: "COP" },
        presentment_money: { amount: "0.15", currency_code: "COP" },
    },
    total_tip_received: "0.00",
    total_weight: 10000,
    updated_at: "2021-10-26T13:00:36-05:00",
    user_id: null,
    billing_address: {
        first_name: "Francisco",
        address1: "Ceiba2 #3-19",
        phone: null,
        city: "bogota",
        zip: "5001",
        province: "Bogot??, D.C.",
        country: "Colombia",
        last_name: "Blanco",
        address2: "",
        company: null,
        latitude: null,
        longitude: null,
        name: "Francisco Blanco",
        country_code: "CO",
        province_code: "DC",
    },
    customer: {
        id: 5495223124163,
        email: "blancofrancisco34@gmail.com",
        accepts_marketing: false,
        created_at: "2021-08-12T12:45:26-05:00",
        updated_at: "2021-10-26T13:00:36-05:00",
        first_name: "Francisco",
        last_name: "Blanco",
        orders_count: 0,
        state: "disabled",
        total_spent: "0.00",
        last_order_id: null,
        note: null,
        verified_email: true,
        multipass_identifier: null,
        tax_exempt: false,
        phone: null,
        tags: "",
        last_order_name: null,
        currency: "COP",
        accepts_marketing_updated_at: "2021-08-12T12:45:26-05:00",
        marketing_opt_in_level: null,
        tax_exemptions: [],
        admin_graphql_api_id: "gid://shopify/Customer/5495223124163",
        default_address: {
            id: 6892930334915,
            customer_id: 5495223124163,
            first_name: "Francisco",
            last_name: "Blanco",
            company: null,
            address1: "Ceiba2 #3-19",
            address2: "",
            city: "bogota",
            province: "Bogot??, D.C.",
            country: "Colombia",
            zip: "5001",
            phone: null,
            name: "Francisco Blanco",
            province_code: "DC",
            country_code: "CO",
            country_name: "Colombia",
            default: true,
        },
    },
    discount_applications: [],
    fulfillments: [],
    line_items: [
        {
            id: 10845190947011,
            admin_graphql_api_id: "gid://shopify/LineItem/10845190947011",
            fulfillable_quantity: 1,
            fulfillment_service: "manual",
            fulfillment_status: null,
            gift_card: false,
            grams: 10000,
            name: "Testing",
            origin_location: [Object],
            price: "1.00",
            price_set: [Object],
            product_exists: true,
            product_id: 6840694833347,
            properties: [],
            quantity: 1,
            requires_shipping: true,
            sku: "1234",
            taxable: true,
            title: "Testing",
            total_discount: "0.00",
            total_discount_set: [Object],
            variant_id: 40381576282307,
            variant_inventory_management: "shopify",
            variant_title: "",
            vendor: "TestingApps13",
            tax_lines: [Array],
            duties: [],
            discount_allocations: [],
        },
    ],
    payment_details: {
        credit_card_bin: "1",
        avs_result_code: null,
        cvv_result_code: null,
        credit_card_number: "???????????? ???????????? ???????????? 1",
        credit_card_company: "Bogus",
    },
    refunds: [],
    shipping_address: {
        first_name: "Francisco",
        address1: "Ceiba2 #3-19",
        phone: null,
        city: "bogota",
        zip: "5001",
        province: "Bogot??, D.C.",
        country: "Colombia",
        last_name: "Blanco",
        address2: "",
        company: null,
        latitude: null,
        longitude: null,
        name: "Francisco Blanco",
        country_code: "CO",
        province_code: "DC",
    },
    shipping_lines: [
        {
            id: 3539049152707,
            carrier_identifier: "1a64b8c1dae66a772da67e4506443cd4",
            code: "ave_1022",
            delivery_category: null,
            discounted_price: "7634.00",
            discounted_price_set: [Object],
            phone: null,
            price: "7634.00",
            price_set: [Object],
            requested_fulfillment_service_id: null,
            source: "Aveonline",
            title: "Aveonline SAFERBO - nacional",
            tax_lines: [],
            discount_allocations: [],
        },
    ],
};

const generateGuia = async ({ config, order, products, shop }) => {
    const shipping_lines = order.shipping_lines.find((e)=>e.source=="Aveonline")
    if(!shipping_lines){
        throw new Error("shipping_lines invalid")
    }
    const requestJson64 = shipping_lines.code.split("_")[2]
    const requestJsonS = Buffer.from(requestJson64, 'base64').toString('ascii')
    const requestJson = JSON.parse(requestJsonS)
    
    const origen = config.option_agente.find((e) => e.value == config.agente);
    const productsOrder = []
    var dscontenido = ""
    for (var i = 0; i < order.line_items.length; i++) {
        const productOrder = order.line_items[i];
        const product = products.find((ele)=>ele.id==productOrder.variant_id)
        if(product){
            productsOrder.push({
                "alto"              : product.height,
                "largo"             : product.length,
                "ancho"             : product.width, 
                "peso"              : product.weigth, 
                "unidades"          : productOrder.quantity,
                "nombre"            : product.title,
                "ref"               : product.sku,
                "urlProducto"       : `https://${shop}/admin/products/${product.id}`,
                "valorDeclarado"    : (product.valorDeclarado == undefined || product.valorDeclarado == null || product.valorDeclarado == "") ? productOrder.price : product.valorDeclarado
            })
            dscontenido += product.title+","
        }
        
    }
    const data = {
        "tipo"              : "generarGuia2",
        "token"             : await getToken({ config }),
        "idempresa"         : config.cuenta,
        "codigo"            : "",
        "dsclavex"          : "",
        "plugin"            : "shopify",

        "origen"            : origen.idciudad,
        "dsdirre"           : config.dsdirre,
        "dsbarrioo"         : "",

        "destino"           : requestJson.des,
        "dsdir"             : order.shipping_address.address1,
        "dsbarrio"          : "",

        "dsnitre"           : config.dsnitre,
        "dstelre"           : config.dstelre,
        "dscelularre"       : config.dscelularre,
        "dscorreopre"       : config.dscorreopre,

        "dsnit"             : "none",//pendiente
        "dsnombre"          : order.shipping_address.first_name,
        "dsnombrecompleto"  : order.shipping_address.name,
        "dscorreop"         : order.email,
        "dstel"             : order.phone || config.dstelre,
        "dscelular"         : order.phone || config.dscelularre,

        "idtransportador"   : requestJson.idt,

        "unidades"          : 1,
        "productos"         : productsOrder,

        "dscontenido"       : dscontenido,
        "dscom"             : order.note,

        "idasumecosto"      : 1,
        "contraentrega"     : (requestJson.con)?1:0,
        "valorrecaudo"      : requestJson.val,

        "idagente"          : config.agente,
        
        "dsreferencia"      : "",
        "dsordendecompra"   : "",
        "bloquegenerarguia" : "1",
        "relacion_envios"   : "1",
        "enviarcorreos"     : "1",
        "guiahija"          : "",
        "accesoila"         : "",
        "cartaporte"        : "",
        "valorMinimo"       : (config.valorMinimo)?1:0,
        "envioGratis"       : requestJson.eng,
    }
    const result = await request({
        method: "POST",
        url: "https://aveonline.co/api/nal/v1.0/generarGuiaTransporteNacional.php",
        headers: {
            "Content-Type": "application/json",
        },
        data,
    })
    return result
};
module.exports = generateGuia;
