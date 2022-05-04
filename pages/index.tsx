import {
  useAddress,
  useEdition,
  useMetamask,
  useNetwork, 
  useCoinbaseWallet, 
  useDisconnect, 
  useWalletConnect

} from "@thirdweb-dev/react";
import { ChainId, EditionMetadata } from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from 'next/link'
import React from 'react';
import { Grid } from "@material-ui/core";


const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnectWallet = useDisconnect();

  const edition = useEdition("0xcD0148C3DB323CaD4597D8f0F028522850d2186e");
  const [nftData, setNftData] = useState<EditionMetadata["metadata"] | null>(
    null
  );
  const [addWalletLoading, setAddWalletLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const network = useNetwork();


  useEffect(() => {
    edition?.get("0").then((nft) => {
      setNftData(nft.metadata);
    });
  }, [edition]);

  const addWallet = async () => {
    setAddWalletLoading(true);
    const payload = await fetch(`/api/add-to-allowlist`, {
      method: "POST",
      body: JSON.stringify({ address }),
    });

    const payloadJson = await payload.json();
    setAddWalletLoading(false);

    if (payloadJson.success) {
      alert(payloadJson.message);
    } else {
      alert(payloadJson.error);
    }
  };
  var React = require('react');
  var { SocialIcon } = require('react-social-icons');

  return (
    <div className={styles.container}>
          <Head>
        <title>Braxxaz - BRXZ-8833</title>
        <meta name="description" content="Braxxaz - AirDrop list" />
        <link rel="icon" href="/favicon.gif" />
 
      </Head>   
      <div>
        <button className={styles.btn2} onClick={disconnectWallet}>Disconnect</button>
      </div>
    );
       <div className={styles.NFT}>
        <div>
          <h1 className={styles.title}>Welcome to BRXZ-8833!</h1>
          <div className={styles.description}>
          BRXZ-8833 is a collection of artworks by Braxxaz, based in a surrealistic and psychedelic universe.
          </div>
        </div>
      </div>
      {address ? (
        <div className={styles.NFT}>
          {nftData?.image && (
            <Image
              src="/braxxaz-icon.jpg"
              width="273"
              height="273"
              objectFit="contain"
            />
          )}
      <button
            className={styles.btn}
            disabled={addWalletLoading}
            onClick={addWallet}
          >
            {addWalletLoading ? "loading..." : "Add wallet to AirDrop list"}
          </button>
          <div className={styles.btn}>
    <Link href="https://opensea.io/collection/brxz-8833">
      <a onClick={() => console.log("clicked")}>Explore the Collection</a>
    </Link>
  </div>
        </div>  
      ) : (
        <div >
        <button  className={styles.btn} onClick={() => connectWithCoinbaseWallet()}>
          Connect Coinbase Wallet
        </button><br></br>
        <button  className={styles.btn} onClick={() => connectWithMetamask()}>Connect MetaMask</button><br></br>
        <button  className={styles.btn} onClick={() => connectWithWalletConnect()}>
          Connect WalletConnect
        </button><br></br>
      </div>
      )}
      <footer className={styles.footer}>
       ©2022 Braxxaz. All Rights Reserved
       <br></br>
       <Grid  container spacing={2} direction="row" justifyContent="space-around" alignItems="center" color= "black" style={{ margin: "1.5em 0" }}>
      <Grid      >
       <SocialIcon url="https://instagram.com/braxxaz" network="instagram" style={{ height:33, width: 33 }} />
      </Grid>  <br></br>
      <Grid      >
       <SocialIcon url="https://twitter.com/braxxaz" network="twitter" style={{ height:33, width: 33 }}  />
      </Grid>  <br></br>
      <Grid      >
       <SocialIcon url="https://facebook.com/braxxaz" network="facebook" style={{ height:33, width: 33 }}  />
      </Grid>  <br></br>
      <Grid      >
       <SocialIcon url="https://pinterest.com/braxxaz13" network="pinterest" style={{ height:33, width: 33 }} />
      </Grid>  <br></br>
      <Grid      >
       <SocialIcon url="https://www.behance.net/braxxaz" network="behance" style={{ height:33, width: 33 }} />
       </Grid>  <br></br>
      {/* add social media*/}
    </Grid> 

      </footer>
    </div>
  );

};

export default Home;