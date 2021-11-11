const Insurance = require("./insurance");

const main = async () => {

    const insurance = new Insurance();
    await insurance.getMostHiredInsuranceLast24Hrs();
    
}

main();