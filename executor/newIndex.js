require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');
const mongoose = require('mongoose');
const {Requests} = require('./models/Requests');
const {saveRequestedTxs} = require('./modules/saveRequestedTx');
const {saveExecutedTxs} = require('./modules/saveExecutedTx');
const {executeRequestedTxs} = require('./modules/executeRequestedTxs');
const HDWalletProvider = require("@truffle/hdwallet-provider");


// Connect to database
function connect() {mongoose.connect(process.env.aionExecutor_dbHost, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( ()=> console.log('Connected to aion executor database'))
    .catch( (err) => console.error('Could not connect to database', error));
}

// Inject Web3
let provider = new HDWalletProvider({
  mnemonic: {
    phrase: process.env.aionExecutor_mnemonic
  },
  providerOrUrl: "http://localhost:8545",
  addressIndex: 9,
  numberOfAddresses: 10
});
var web3 = new Web3(provider);



// Contract definition and account setting
const ABI = JSON.parse(fs.readFileSync('Aion_ABI.json'));
const aionContract = new web3.eth.Contract(ABI, process.env.aionExecutor_aionContractAddress)
const account = web3.eth.accounts.privateKeyToAccount(process.env.aionExecutor_privateKey);
const reqConfirmations = 0;

// Global variables

function run() {

connect()
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
            
            // Get scheduleCallEvent events and save
            var events = await aionContract.getPastEvents('ScheduleCallEvent', {fromBlock: currentBlock-reqConfirmations, toBlock: block.number-reqConfirmations}) 
            for(var i = 0; i<events.length; i++){
                console.log('Registering new request to the database...');
                await saveRequestedTxs(events[i],web3);
            }                                     
            
            var events = await aionContract.getPastEvents('ExecutedCallEvent', {fromBlock: currentBlock-reqConfirmations,toBlock: block.number-reqConfirmations})
            for(var i = 0; i < events.length; i++){
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
},4000)};

module.exports.run = run
