"use client";
import Image from "next/image";
import React, { useState } from "react";

import logo from "./logooncha.png";
import hero from "./hero.png";
import pic from "./pic.png";
import footerPic from "./footericon.png";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  polygonMumbai,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "nft",
  projectId: "eec13610aaaff4b38eda673c101feed0",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const [mintedCount, setMintedCount] = useState(0);
  const [nftPrice, setNftPrice] = useState(10);

  const handleIncrement = () => {
    setMintedCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (mintedCount > 0) {
      setMintedCount((prevCount) => prevCount - 1);
    }
  };

  const handleMint = () => {
    // Implement minting logic here
    // You can add an API call or any other logic for minting
    console.log("Minting NFTs...");
  };
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <main className="flex min-h-screen flex-col bg-[#0570B7]  ">
          <div className="flex flex-row items-center  mt-[64px]">
            <div className="ml-[130px]">
              <Image src={logo} alt="logo" />
            </div>

            <div className=" flex justify-end space-x-4 mr-[70px] items-center w-full  text-white">
              <div>
                <p className="text-xl font-normal">About</p>
              </div>

              <div>
                <p className="text-xl font-normal">Marketplace</p>
              </div>
              <div>
                <ConnectButton />
              </div>
            </div>
          </div>

          <div className="flex text-white mt-[20px] ">
            <div className="w-[570px] ml-[110px] mt-[80px] font-bold font-sans ">
              <div>
                <h1 className="text-[100px] capitalize">ONCHAIN SUMMER</h1>
                <p className="text-xl font-bold">
                  Seize your Onchain Summer if you love memes, CCO and Summer.
                  No Utility just Summer! Creating a community of the greatest
                  memers in Web3.
                </p>
              </div>
            </div>

            <div className="ml-[160px]">
              <Image src={hero} alt="hero" height={"600"} width={"500"} />
            </div>
          </div>

          <div className="flex bg-white py-[90px] justify-around gap-x-[100px] items-center">
            <div className="ml-[110px]">
              <Image src={pic} />
            </div>

            <div className="flex flex-col items-center space-y-4 mr-[90px] pr-[50p]">
              {/* Progress Bar */}
              <div className="flex justify-between px-[5px] w-[400px] text-xl font-semibold">
                <div>10% Minted</div>
                <div>150/1500</div>
              </div>
              <div className="bg-[#FFDAE7] w-[400px] h-8 rounded-xl">
                <div
                  className="bg-[#FE1C6D] h-full rounded-xl "
                  style={{ width: `${(mintedCount / 100) * 100}%` }}
                />
              </div>

              {/* Increment/Decrement Counter */}
              <div className="flex items-center space-x-4">
                <div className="bg-white px-9 py-3 rounded shadow-md text-4xl ">
                  {mintedCount}
                </div>
              </div>

              {/* NFT Price */}
              <div className=" rounded text-center text-xl font-normal uppercase">
                {nftPrice} ETH
              </div>

              {/* Mint Button */}
              <button
                className="bg-[#FE1C6D] text-white px-28 py-4 rounded-2xl text-3xl uppercase font-semibold"
                onClick={handleMint}
              >
                Mint
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-2 my-3">
            <div>
              <Image src={footerPic} alt="footer" />
            </div>
            <div>
              <span className="inline text-white text-xl font-extrabold ">
                ONCHAIN SUMMER
              </span>
            </div>
          </div>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
