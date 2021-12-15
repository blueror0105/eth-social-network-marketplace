import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Main from './Main';
import logo from '../logo.png';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json';


const App = () => {
  const [account, setAccount] = useState('');
  const [socialNetwork, setSocialNetwork] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      await loadWeb3();
      await loadBlockchainData();
    }

    initialize();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected. You should connect your browser to Ethereum");
    }
  };

  async function loadBlockchainData() {
    const web3 = window.web3;

    // Load Account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    // Load Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];

    if (networkData) {
      const socialNetwork = new web3.eth.Contract(SocialNetwork.abi, networkData.address);
      setSocialNetwork(socialNetwork);

      const postCount = await socialNetwork.methods.postCount().call();
      setPostCount(postCount);

      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call();
        setPosts([...posts, post]);
      }
      setLoading(false);
    } else {
      window.alert('Social Network contract not deloyed to detect network ');
    }
  }

  function createPost(content) {
    setLoading(true);
    socialNetwork.methods.createPost(content).send({ from: account })
      .once('receipt', (receipt) => {
        setLoading(false);
      });
  }

  function tipPost(id, tipAmount) {
    setLoading(true);
    socialNetwork.methods.tipPost(id).send({ from: account, value: tipAmount })
      .once('receipt', (receipt) => {
        setLoading(false);
      });
  }

  return (
    <div>
      <Navbar account={account} />
      {
        loading ?
          <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          :
          <Main
            posts={posts}
            createPost={createPost}
            tipPost={tipPost}
          />
      }
    </div>
  );
}

export default App;
