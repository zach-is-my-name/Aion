const Web3 = require('web3');
const fs = require('fs');
const mongoose = require('mongoose');
const {Requests} = require('./models/Requests');
const {saveRequestedTxs} = require('./modules/saveRequestedTx');
const {saveExecutedTxs} = require('./modules/saveExecutedTx');
const {executeRequestedTxs} = require('./modules/executeRequestedTxs');
const HDWalletProvider = require('truffle-hdwallet-provider');

let secureEnv = require('secure-env');
global.env = secureEnv({secret:'GZgoalZappAion!'});

const dbHost = global.env.aionExecutor_dbHost
const mnemonic =  global.env.aionExecutor_mnemonic
const aionContractAddress = global.env.aionExecutor_aionContractAddress
const privateKey = global.env.aionExecutor_privateKey
const reqConfirmations = 1

console.log("aionContractAddress", aionContractAddress)
console.log("privateKey", privateKey)
// Connect to database
mongoose.connect(dbHost, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( ()=> console.log('Connected to aion executor database @@', dbHost))
    .catch( (err) => console.error('Could not connect to database', error));


// Inject Web3
var provider = new HDWalletProvider(teamsMnemonic, ""http://dockerhost:8545", 0, 10, false);
var web3 = new Web3(provider);

// Contract definition and account setting
const ABI = JSON.parse(fs.readFileSync('Aion_ABI.json'));
const aionContract = new web3.eth.Contract(ABI, aionContractAddress)
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const reqConfirmations = reqConfirmations;

// Global variables
var currentBlock = 0;
web3.eth.getBlockNumber()
    .then((number)=>{
        currentBlock = number;
        console.log(currentBlock);
    });

setInterval(function(){
    web3.eth.getBlock('latest',async (err,block)=>{
        if(err){
            return;
        }
        if(currentBlock<=block.number){
            console.log(`New block received, Number: ${block.number}`);            
            
            // Get scheduleCallEvent events adn save
            var events = await aionContract.getPastEvents('ScheduleCallEvent', {fromBlock: currentBlock-reqConfirmations,toBlock: block.number-reqConfirmations}) 
            for(var i = 0; i<events.length; i++){
                console.log('Registering new request to the database...');
                await saveRequestedTxs(events[i],web3);
            }                                     
            
            var events = await aionContract.getPastEvents('ExecutedCallEvent', {fromBlock: currentBlock-reqConfirmations,toBlock: block.number-reqConfirmations})
            for(var i = 0; i<events.length; i++){
                console.log('Registering successfully executed Tx...');
                await saveExecutedTxs(events[i],web3);
            }           

            //Execute pending transactions if any, Block and time based schedules
            await executeRequestedTxs(block.number,false,web3,account,aionContract);
            await executeRequestedTxs(block.timestamp,true,web3,account,aionContract);    
            
            // Save last processed block
            currentBlock = block.number+1;
        }
    })
},4000);


