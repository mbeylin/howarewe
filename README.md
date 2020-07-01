# How Are We
`npm install` to install required packages

`truffle test` to execute tests 

NOTE: TESTS NO LONGER PASSING AS THE FINAL CONTRACT INCLUDES HARD-CODED ADDRESSES.

### Functionality

**1. How Are We Deployment**

When the contract is first deployed, a number of things occur:
    
- the admins are instantiated
    
- the *HOWNFT* ERC721 token is minted (and the initial owner is set as the contract itself)
    
- the *HOW* ERC20 token is deployed
    
- the *HOW* token is distributed to the token holders as specified by the parameters

**2. Donations**

Users may then contribute to the HowAreWe contract as they please, sending any ERC20 token or ETH directly to the address of the contract.

**3. Token Disbursement**

In order to disburse contributions to token holders, a number of steps occur:
    
- First, One of the admins calls `pauseTokens()`, and provides an array of addresses of tokens. The contract's balance (for each of these tokens) is stored to then be used to calculate payouts. 0x0 is used as the token address of ETH stored in the contract. This also pauses all transferability on the *HOW* token (while payouts are occurring)
    
- Next, one of the admins calls `payoutTokens()` and provides an array of addresses who hold *HOW* tokens, as well as token addresses to distribute. This is called as many times as necessary, before there are no other token holders left who have not been paid.
    
- Finally, one of the admins calls `resumetokens()` which resumes transfers on the *HOW* token.
    
    
While this does put significant responsibility and trust in the admins to perform these functions dutifully, the nature of the project (and real-world legal requirements) make this suitable.
    
