class APIFeatures {

    constructor(query, querystring) {
        this.query = query;
        this.querystring = querystring;
    }

    sort() {
        //querystring para sort should be passed like ?sort=age-desc,name-asc,city-desc
        let query = undefined;
        if (this.querystring.sort) {
            const sortBy = this.querystring.sort.split(',').map(e=>{ return e.split('-')}).map(e=> {return `['${e[0]}', '${e[1]}']`}).join(',');
            this.query = `{order : [${sortBy}]}`;
        } 
        return query;
    }

    limitFields() {
        //querystring para sort should be passed like ?sort=age,name,city
        let query = undefined;
        if (this.querystring.fields) {
            const projection = this.querystring.fields.split(',').join("','");
            this.query = `{attributes : ['${projection}'] }`
        }
        return query;
    }

    paginate() {
        let query = undefined;
        if (this.querystring.page && this.querystring.limit) {
            const page = this.querystring.page * 1 || 1; //default as 1
            const limit = this.querystring.limit * 1 || 100;//default as 100 
            const skip = (page - 1) * limit;

            query = `{offset : ${skip} , limit : ${limit} }`;

        }
        return query;
    }


}

module.exports = APIFeatures;