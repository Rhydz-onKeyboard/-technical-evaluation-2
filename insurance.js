const axios = require('axios');

class Insurance {

    basePath = 'https://hack.kunderlabs.com/exam/insurance/api/insurance'

    async getInsurance(){
        try {
            const res = await axios.get(`${ this.basePath }`);
            const { insurance } = res.data;
            //console.log(insurance);
            return insurance;
        } catch (error) {
            console.log(error)
        }
    };

    async getContrated(){
        try {
            const res = await axios.get(`${ this.basePath }/contracted/today`);
            const { results: contracted } = res.data.contracted;
            //console.log(contracted);
            return contracted;
        } catch (error) {
            console.log(error)
        }
    };

    async getMostHiredInsuranceLast24Hrs(){
        try {
            const insurance = await this.getInsurance();
            const contracted = await this.getContrated();
            const repeatValues = {};
            contracted.forEach(e => repeatValues[e.insuranceId] = (repeatValues[e.insuranceId] || 0) + 1);
            const orderByContracted = Object.entries(repeatValues).sort((a, b) => b[1] - a[1]);
            const searchTopFive = orderByContracted.slice(0, 5);
            const topFive = searchTopFive.map(e => {
                return insurance.filter(j => j.id === e[0] );
            })
            console.log(topFive);
        } catch (error) {
            console.log(error)
        }
    };
};

module.exports = Insurance;