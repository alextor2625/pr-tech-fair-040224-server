const { OpenAIClient, AzureKeyCredential } = require("@azure/openai")



const openAi = async (messages) =>{
    // Initialize OpenAI client
    const deploymentName = "pr-tech-fair-gpt-35-turbo";
    const azureOpenAIResourceUri = process.env.azureOpenAIResourceUri;
    const azureOpenAIApiKey = process.env.azureOpenAIApiKey;
    try{
        const client = new OpenAIClient(azureOpenAIResourceUri, new AzureKeyCredential(azureOpenAIApiKey));
        // Configure search service
        const searchEndpoint = process.env.searchEndpoint;
        const searchKey = process.env.searchAPIKey;
        const searchIndex = "prtechfaircensodataindex";
        
        const searchConfig = {
            searchEndpoint: new URL(searchEndpoint),
            authentication: { apiKey: searchKey },
            indexName: searchIndex
        };
        
        const chatCompletionsOptions = {
            azureExtensionsOptions: {
                extensions: [searchConfig]
            },
        };
    
        const response = await client.getChatCompletions(deploymentName,messages,searchConfig) 
        const responseMessage = response.choices[0].message;
        return responseMessage
    }catch(error){
        console.error(error);
    } 
}

module.exports = openAi