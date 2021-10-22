require("module-alias/register");
const request = require("@functions/request");
const getToken = require("@aveonline/getToken");

const exampleCheckouts = {
    origin: {
        country: "CO",
        postal_code: "5001",
        province: "NSA",
        city: "Cucuta",
        name: null,
        address1: "Ceina2 #3e-19",
        address2: null,
        address3: null,
        phone: "",
        fax: null,
        email: null,
        address_type: null,
        company_name: "TestingApps13",
    },
    destination: {
        country: "CO",
        postal_code: "5001",
        province: "GUA",
        city: "Cúcuta",
        name: "Francisco Blanco",
        address1: "Ceiba2 #3-19",
        address2: "",
        address3: null,
        phone: null,
        fax: null,
        email: null,
        address_type: null,
        company_name: null,
    },
    items: [
        {
            name: "Testing",
            sku: "1234",
            quantity: 1,
            grams: 10000,
            price: 100,
            vendor: "TestingApps13",
            requires_shipping: true,
            taxable: true,
            fulfillment_service: "manual",
            properties: null,
            product_id: 6840694833347,
            variant_id: 40381576282307,
        },
    ],
    currency: "COP",
    locale: "es",
};

const cotizar = async ({ config, checkout, productsShopify }) => {
    if (checkout.currency !== "COP" || (checkout.destination || {}).country !== "CO") {
        return [];
    }
    var valorrecaudo = 0;
    const products = checkout.items.map((e) => {
        const proudctShopify =  productsShopify.find((e)=>e.id==e.variant_id)
        if(!proudctShopify){
            throw new Error("No valido para Cotizar")
        }
        const {weigth,width,height,length,cotizar} = proudctShopify
        if(!cotizar){
            throw new Error("No valido para Cotizar")
        }
        valorrecaudo += e.quantity * e.price;
        return {
            alto: height, //pendiente
            largo: length, //pendiente
            ancho: width, //pendiente
            peso: weigth,
            unidades: e.quantity,
            valorDeclarado: e.price, //pendiente  valor declarado custom
        };
    });
    const origen = config.option_agente.find((e) => e.value == config.agente);
    const data = {
        tipo: "cotizarDoble",
        access: "",
        token: await getToken({ config }),
        idempresa: config.cuenta,
        origen: origen.idciudad,
        destino: "MEDELLIN(ANTIOQUIA)", //pendiente
        idasumecosto: 1,
        contraentrega: 1,
        valorrecaudo: valorrecaudo,
        productos: products, //pendiente
        valorMinimo: config.valorMinimo ? 1 : 0,
    };
    console.log(data);
    const result = await request({
        method: "POST",
        url: "https://aveonline.co/api/nal/v1.0/generarGuiaTransporteNacional.php",
        headers: {
            "Content-Type": "application/json",
        },
        data
    });
    if(result.type === "ok" && result.status === "ok"){
        return result.cotizaciones.map((e)=>{
            return {
                "service_name": `Aveonline ${e.nombreTransportadora} ${e.contraentrega ? " - Contraentrega" : ""}`,
                "service_code": `ave_${e.codTransportadora}`,
                "total_price": `${e.total}00`,
                "description": "Metodo de Envio de Aveonline",
                "currency": "COP"
            }
        })
    }
    return []
};
module.exports = cotizar;
