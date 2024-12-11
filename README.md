## Akave Client Library
### Overview
The Akave Client SDK is our JavaScript library, providing an intuitive interface for interacting with the Akave Link API, a decentralized protocol for managing on-chain data lakes.

For documentation and more information, refer to the [akave-client](https://www.npmjs.com/package/akave-client) on npm.

### Installation
```bash
npm install akave-client
```

### Starting the Akave Link API
```bash
docker pull akave/akavelink:latest

docker run -d \
  -p 8000:3000 \
  -e NODE_ADDRESS="connect.akave.ai:5500" \
  -e PRIVATE_KEY="your_private_key_on_your_wallet" \
  akave/akavelink:latest
```
Akave faucet to claim 10 AKVF: https://faucet.akave.ai/

---

# Wandereum

Wandereum is an innovative platform designed for travelers and vloggers to monetize their unique travel content, including pictures and videos. By leveraging blockchain technology, Wandereum empowers content creators to retain ownership of their work while providing buyers with exclusive access to their favorite travel influencers.

---

## Key Features

### **1. Content Ownership and Monetization**
- Travelers and vloggers can sell their original travel photos and videos, ensuring fair compensation for their creative work.
- Content creators retain full rights to their content, allowing them to set prices that reflect their worth.

### **2. Subscription-Based Model**
- Buyers can subscribe to their favorite vloggers to gain access to exclusive content and behind-the-scenes insights.
- This subscription model fosters closer relationships between creators and their audience, encouraging frequent content updates.

### **3. Interactive Travel Experiences**
- Vloggers can share their travel plans, enabling followers to visit the same locations and engage in similar experiences.
- Enhances community interaction and promotes a shared love for travel.

### **4. Dynamic Platform Fees**
- Platform fees decrease as content creators become more active, incentivizing regular content updates and engagement.

### **5. Tour Bounty: Revolutionizing the Tourism Industry**
- **Bounty Creation**: Hosts (individuals, groups, or government entities) can offer bounties for specific locations, encouraging content submissions related to those areas.
- **Public Participation**: Anyone can upload their moments tagged with the bounty, making the process inclusive and community-driven.
- **Voting Mechanism**: Free voting on submissions with gas fees covered by the platform ensures accessibility.
- **Reward Distribution**: Bounties are awarded to winners based on the percentage of votes received, fostering healthy competition and motivating quality content creation.

---

## Technology Stack

### **Core Technologies**
- **Scaffold-ETH 2**: A modern Ethereum development framework using Next.js, TypeScript, Wagmi, and Hardhat.
- **Akave SDK**: Our SDK for using akave datastore.
- **Coinbase Onchain SDK**: For secure and scalable on-chain interactions.
- **Next.js**: The React framework for server-rendered applications.
- **Solidity**: For writing smart contracts.

### **Additional Tools**
- **Tailwind CSS**: For responsive and efficient UI design.
- **Hardhat**: Ethereum development environment for compiling, deploying, and testing smart contracts.
- **Viem**: A modern library for Ethereum interactions.

---

## License
Wandereum is licensed under the [MIT License](LICENSE). Feel free to use and modify the code for your own projects.

---

