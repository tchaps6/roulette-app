import contract from"@truffle/contract";
export const loadContract=async(name,provider)=>{
 const request=await fetch(`/contracts/${name}.json`);
 const data=await request.json();
 const _contract=contract(data);
 _contract.setProvider(provider);
 const deployedContract=await _contract.deployed();

 return deployedContract
}