var express = require('express');
var router = express.Router();
const Prompt = require('../models/Prompt')
var openAi = require("../config/openai")
// const messages = [
//     // The system message represents instructions or other guidance about how the assistant should behave
//     { role: "system", content: "Eres un experto en el censo de Puerto Rico." },

// ]

/* GET home page. */
router.post('/', async (req, res, next) => {
    const {message} = req.body
  try{
    // messages.push({role:"user", content: message})
    const prompt = new Prompt({content:message})
    prompt.save()
    const messages = await Prompt.find({}).then(response => response.map((msg) => {return {role: msg.role, content: msg.content}}))
    console.log(messages);
    
    const responseMessage = await openAi(messages)
    // prompt.responseMessage = responseMessage
    // prompt.save()
    console.log(`[${responseMessage.role.toUpperCase()}]: ${responseMessage.content}`);
    return res.status(200).json({message: `${responseMessage.content}`})
  }catch(error){
    console.error(error);
    return
  }
});


router.delete("/newChat", async (req,res) => {
    try {
        await Prompt.deleteMany({role:"user"})
        return res.status(200).send("OK")
    } catch (error) {
        console.error(error)
        return
    }
})

module.exports = router;
