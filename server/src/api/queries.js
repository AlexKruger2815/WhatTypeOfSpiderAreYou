const getSpidersQuery = 'SELECT * FROM "public"."Spiders"';
const getQuestionsQuery = 'SELECT * FROM "public"."Questions"';
const getOptionsQuery = 'SELECT * FROM "public"."Options"';
const getSpiderByIdQuery  = 'SELECT * FROM "public"."Spiders" WHERE  "SpiderId" = $1';


module.exports = {
    getQuestionsQuery,
    getSpidersQuery,
    getOptionsQuery,
    getSpiderByIdQuery,
}