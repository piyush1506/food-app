const uniquecodegenerator = (prefix = 'REST')=>{
 const Random = Math.random().toString(36).substring(2,8).toUpperCase();
 const time = Date.now().toString().slice(-5);
 return `${prefix}-${time}-${Random}`
}
module.exports =  uniquecodegenerator;