var Sequelize = require('sequelize');


var Serializer = async function (instance,options = {}) {
    if(!instance) 
        throw new Error("NO_INSTANCE");
    try {
        const allAttr = Object.keys(instance.get({plain:true}));
        var attributes = options.attributes||[];
        var include = options.include||[];
        var exclude = options.exclude||[];
        var result ={};

        if(attributes){
            exclude = [];
            for(let attr in attributes){
                result[attr]=instance.get(attr);
            }
        }

        if(exclude){
            let othersAttr = allAttr;
            othersAttr.filter((attr)=>{
                return exclude.includes(attr);
            });
            for(let attr in othersAttr){
                result[attr]=instance.get(attr);
            }
        }

        if(include){


        }

    } catch (e) {
        
    }
}