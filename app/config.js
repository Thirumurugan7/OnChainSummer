import Web3 from "web3";
import abi from "./abi.json";
import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
const { ethereum } = isBrowser();
if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const Address = "0xeD5eaeDE1F93584Fb03261CD9219c36E98925901";

export const minting = async () => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();

  console.log(provider);
  const signer = provider.getSigner();
  console.log(signer);
  const valueInWei = ethers.utils.parseEther("0.0069");

  const Role = new ethers.Contract(Address, abi, signer);
  console.log(Role);

  const tokenId = await Role.mint({
    value: valueInWei,
  });
  console.log(tokenId);
  return tokenId;
};
