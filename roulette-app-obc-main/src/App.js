import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import {loadContract} from "./loadContract"
import {useEffect,useState} from "react";
import { Wheel } from 'react-custom-roulette'
function App() {
  const [connected,setConnected]=useState(false);
  const [wallet,setWallet]=useState();
  const [betNumber,setBetNumber]=useState(0);
  const [betAmount,setBet]=useState();
  const [betLanded,setBetLanded]=useState();
  const [betStatus,setBetStatus]=useState("");
  const [mustSpin,setmustSpin]=useState(false);
  const [showResult,setShowResult]=useState();
  const [roundStart,setroundStart]=useState(false);
  
  useEffect(()=>{
    console.log(betLanded)
    if(betLanded==betNumber){
      setBetStatus(" WIN!");
    }
    else if (betLanded){
      setBetStatus(" Lost");
    }

  },[betLanded])
  const initWallet=async()=>{
    try{
      const accounts=await window.ethereum.request({ method: 'eth_requestAccounts' });
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x13881'}]});
      setWallet(accounts[0]);
      const web3=new Web3("wss://ws-mumbai.matic.today/");
      const provider=await detectEthereumProvider();
      const contractT=await loadContract("RandomNumberConsumer",provider);
      const contractN=new web3.eth.Contract(contractT.abi,"0x9375eA9c3c726F9Ab3Ee2fd2fd7af79C267C1E60");
      const blockNum=await web3.eth.getBlockNumber();
      contractN.events.DiceLanded({fromBlock:blockNum}).on("data",event=>{
        if(event.returnValues.usersAddress.toUpperCase()==accounts[0].toUpperCase()){
          console.log(event)
          setroundStart(true);
          setmustSpin(true);
          setBetLanded(event.returnValues.result);
        }
        })
      setConnected(true);
    }
    catch(err){
      setConnected(false);
    }
  }
  useEffect(async()=>{
  await initWallet();
  },[])
 
  const getRand=async()=>{
    setShowResult(false);
    if(connected){
      setBetStatus("Loading");
      try{
        if(!betAmount || betAmount==0){
          throw true;
        }
        const accounts=await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
        const provider=await detectEthereumProvider();
        const contractT=await loadContract("RandomNumberConsumer",provider);
        const res=await contractT.getRandomNumber(betNumber,{from:accounts[0],value:Web3.utils.toWei(betAmount.toString(), 'ether')});
      }
      catch(err){
        setBetStatus("Cancelled");
      }
    
    }
    else{
      console.log("not logged in")
    }
   

  }
  const data = [
    { option: '0', style: { backgroundColor: 'green', textColor: 'white' } },
    { option: '1', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '2', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '3', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '4', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '5', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '6', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '8', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '9', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '10', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '11', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '12', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '13', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '14', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '15', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '16', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '17', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '18', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '19', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '20', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '21', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '22', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '23', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '24', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '25', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '26', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '27', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '28', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '29', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '30', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '31', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '32', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '33', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '34', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '35', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '36', style: { backgroundColor: 'black', textColor: 'white' } },
  ]

  const LoadSpinner=()=>{
    return <Wheel
    mustStartSpinning={mustSpin}
    prizeNumber={parseInt(betLanded)}
    data={data}
    innerRadius={40}
    innerBorderColor={"gold"}
    radiusLineWidth={0}
    innerBorderWidth={5}
    textDistance={90}
    onStopSpinning={() => {
   
      setTimeout(()=>{
        setShowResult(true);
        setmustSpin(false)
        setroundStart(false);
      },5000)
      
    }}
  />
  }

  return (
   <>
   
   <br/>
   <div className="container">
     <div className="card">
       <div className="card-body">
       <table className="d-flex flex-column align-items-center w-100">
     <tr>
     {roundStart?<LoadSpinner/>:<img width="350px" src="./wheel.png"/>}

     </tr>
     <tr className="fs-3 fw-bold">Win 36x of your deposit</tr>
     <tr className=" card fw-bold wallet-text m-2 p-1">Wallet: {wallet?wallet:<button onClick={initWallet} type="button" class="btn btn-primary">Connect</button>}</tr>
     <tr> <input onChange={(e)=>{setBet(e.target.value)}} type="number" class="form-control my-1 w-35" placeholder="Bet Amount (MATIC)"/></tr>
     <tr><button onClick={getRand} type="button" class="btn btn-success w-100 bet-button">BET</button></tr>
     <tr className="fs-3 result-row card p-1 mt-2">Result:{(showResult||betStatus=="Loading"||betStatus=="Cancelled")&&betStatus}</tr>
    <tr className="fw-bold">Pick a Number</tr>
     <tr>
       
       <table>
         <tr>
           <td>
           <button onClick={()=>{setBetNumber(0)}} type="button" class={`btn btn-pick ${betNumber===0&&"selected-bet"}`}>00</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(1)}} type="button" class={`btn btn-pick ${betNumber===1&&"selected-bet"}`}>01</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(2)}} type="button" class={`btn btn-pick ${betNumber===2&&"selected-bet"}`}>02</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(3)}} type="button" class={`btn btn-pick ${betNumber===3&&"selected-bet"}`}>03</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(4)}} type="button" class={`btn btn-pick ${betNumber===4&&"selected-bet"}`}>04</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(5)}} type="button" class={`btn btn-pick ${betNumber===5&&"selected-bet"}`}>05</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(6)}} type="button" class={`btn btn-pick ${betNumber===6&&"selected-bet"}`}>06</button>
           </td>
         </tr>

         <tr>
           <td>
           <button onClick={()=>{setBetNumber(7)}} type="button" class={`btn btn-pick ${betNumber===7&&"selected-bet"}`}>07</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(8)}} type="button" class={`btn btn-pick ${betNumber===8&&"selected-bet"}`}>08</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(9)}} type="button" class={`btn btn-pick ${betNumber===9&&"selected-bet"}`}>09</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(10)}} type="button" class={`btn btn-pick ${betNumber===10&&"selected-bet"}`}>10</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(11)}} type="button" class={`btn btn-pick ${betNumber===11&&"selected-bet"}`}>11</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(12)}} type="button" class={`btn btn-pick ${betNumber===12&&"selected-bet"}`}>12</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(13)}} type="button" class={`btn btn-pick ${betNumber===13&&"selected-bet"}`}>13</button>
           </td>
         </tr>

         <tr>
           <td>
           <button onClick={()=>{setBetNumber(14)}} type="button" class={`btn btn-pick ${betNumber===14&&"selected-bet"}`}>14</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(15)}} type="button" class={`btn btn-pick ${betNumber===15&&"selected-bet"}`}>15</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(16)}} type="button" class={`btn btn-pick ${betNumber===16&&"selected-bet"}`}>16</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(17)}} type="button" class={`btn btn-pick ${betNumber===17&&"selected-bet"}`}>17</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(18)}} type="button" class={`btn btn-pick ${betNumber===18&&"selected-bet"}`}>18</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(19)}} type="button" class={`btn btn-pick ${betNumber===19&&"selected-bet"}`}>19</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(20)}} type="button" class={`btn btn-pick ${betNumber===20&&"selected-bet"}`}>20</button>
           </td>
         </tr>

         <tr>
           <td>
           <button onClick={()=>{setBetNumber(21)}} type="button" class={`btn btn-pick ${betNumber===21&&"selected-bet"}`}>21</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(22)}} type="button" class={`btn btn-pick ${betNumber===22&&"selected-bet"}`}>22</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(23)}} type="button" class={`btn btn-pick ${betNumber===23&&"selected-bet"}`}>23</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(24)}} type="button" class={`btn btn-pick ${betNumber===24&&"selected-bet"}`}>24</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(25)}} type="button" class={`btn btn-pick ${betNumber===25&&"selected-bet"}`}>25</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(26)}} type="button" class={`btn btn-pick ${betNumber===26&&"selected-bet"}`}>26</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(27)}} type="button" class={`btn btn-pick ${betNumber===27&&"selected-bet"}`}>27</button>
           </td>
         </tr>

         <tr>
           <td>
           <button onClick={()=>{setBetNumber(28)}} type="button" class={`btn btn-pick ${betNumber===28&&"selected-bet"}`}>28</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(29)}} type="button" class={`btn btn-pick ${betNumber===29&&"selected-bet"}`}>29</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(30)}} type="button" class={`btn btn-pick ${betNumber===30&&"selected-bet"}`}>30</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(31)}} type="button" class={`btn btn-pick ${betNumber===31&&"selected-bet"}`}>31</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(32)}} type="button" class={`btn btn-pick ${betNumber===32&&"selected-bet"}`}>32</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(33)}} type="button" class={`btn btn-pick ${betNumber===33&&"selected-bet"}`}>33</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(34)}} type="button" class={`btn btn-pick ${betNumber===34&&"selected-bet"}`}>34</button>
           </td>
         </tr>

         
         <tr>
           <td>
           <button onClick={()=>{setBetNumber(35)}} type="button" class={`btn btn-pick ${betNumber===35&&"selected-bet"}`}>35</button>
           </td>
           <td>
           <button onClick={()=>{setBetNumber(36)}} type="button" class={`btn btn-pick ${betNumber===36&&"selected-bet"}`}>36</button>
           </td>
         </tr>
       </table>
     </tr>
   </table>
       </div>
     </div>
   </div>
 
   
   
   </>
  );
}

export default App;
