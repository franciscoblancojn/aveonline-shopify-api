require("module-alias/register");
const request = require("@functions/request");
const getToken = require("@aveonline/getToken");
const processDestination = require("@functions/processDestination");

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
    if (
        checkout.currency !== "COP" ||
        (checkout.destination || {}).country !== "CO"
    ) {
        return [];
    }
    const destino = await processDestination(checkout.destination);
    var valorrecaudo = 0;
    const products = checkout.items.map((e) => {
        const proudctShopify = productsShopify.find(
            (ele) => ele.id == e.variant_id
        );
        if (!proudctShopify) {
            throw {
                msj: `No valido para Cotizar ${e.variant_id} ${e.name}`,
            };
        }
        const { weigth, width, height, length, valorDeclarado } =
            proudctShopify;
        if (!proudctShopify.cotizar) {
            throw {
                msj: `No valido para Cotizar ${proudctShopify.id} ${proudctShopify.title}`,
            };
        }
        const priceProduct = e.price / 100;
        valorrecaudo += e.quantity * priceProduct;
        return {
            alto: height,
            largo: length,
            ancho: width,
            peso: weigth,
            unidades: e.quantity,
            valorDeclarado:
                valorDeclarado == undefined ||
                valorDeclarado == null ||
                valorDeclarado == ""
                    ? priceProduct
                    : valorDeclarado,
        };
    });
    const origen = config.option_agente.find((e) => e.value == config.agente);
    const data = {
        tipo: "cotizar2",
        access: "",
        token: await getToken({ config }),
        idempresa: config.cuenta,
        origen: origen.idciudad,
        destino,
        idasumecosto: 0,
        contraentrega: 0,
        valorrecaudo: 0,
        productos: products,
        valorMinimo: config.valorMinimo ? 1 : 0,
    };
    const result = await request({
        method: "POST",
        url: "https://aveonline.co/api/nal/v1.0/generarGuiaTransporteNacional.php",
        headers: {
            "Content-Type": "application/json",
        },
        data,
    });
    var envioGratis = false;
    if (config.envioGratis) {
        if (config.minEnvioGratis != "" && config.minEnvioGratis != null) {
            if (parseFloat(config.minEnvioGratis) <= valorrecaudo) {
                envioGratis = true;
            }
        } else {
            envioGratis = true;
        }
    }

    if (result.type === "ok" && result.status === "ok") {
        delete data.token;
        return result.cotizaciones.map((e) => {
            const dataRequestJson = {
                idt: e.codTransportadora,
                con: e.contraentrega,
                val: valorrecaudo,
                des: destino,
                eng: envioGratis ? 1 : 0,
            };
            const requestJson = Buffer.from(
                JSON.stringify(dataRequestJson)
            ).toString("base64");
            const price = envioGratis ? 0 : e.total;
            return {
                service_name: `Aveonline ${e.nombreTransportadora} ${
                    e.contraentrega ? " - Contraentrega" : ""
                }`,
                service_code: `ave_${e.codTransportadora}_${requestJson}`,
                total_price: `${price}00`,
                description: "Metodo de Envio de Aveonline",
                currency: "COP",
            };
        });
    } else {
        throw {
            msj: "Error Cotizar API Aveonline",
            result,
        };
    }
};
module.exports = cotizar;
