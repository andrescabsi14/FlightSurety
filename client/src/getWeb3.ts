import Web3 from "web3";

const getWeb3 = async (url: string) => {
  // @ts-ignore
  const ETH: any = window && window.ethereum;
  // @ts-ignore
  const WEB3: any = window && window.web3;

  if (ETH) {
    const web3 = new Web3(ETH);
    try {
      await ETH.enable();
      return web3;
    } catch (err) {
      console.error(err);
    }
  } else if (WEB3) {
    const web3 = WEB3;
    console.log("Injected web3 detected");
    return web3;
  } else {
    const web3Fallback = await new Web3(new Web3.providers.HttpProvider(url));

    return web3Fallback;
  }
};

export default getWeb3;
