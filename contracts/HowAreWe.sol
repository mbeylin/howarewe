pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/// @title HowAreWe
/// @dev A contract to issue the HOW ERC20 token, the HOW ARE WE NFT, and to collect donations for the project
/// @author Mark Beylin <beylin.mark@gmail.com>, code reviewed by Dean Eignmann <dean@eigenmann.me> and Sylvain Laurent <s@6120.eu>

contract HowAreWe is ERC721{

    using SafeMath for uint256;

    address[] public admins = [0x6934476e807605C85c0702b4C672F35986e12a72, 0x51f940307620F28c03A992d6cbD93e08aDd8b598, 0xbfDb50Dc66C8Df9fd9688D8fe5A0C34126427645, 0x611B13d54F0423Bc87Abdc113Aa9d2512A472735];

    PausableToken public token;
    
    PausedBalanceSet[] savedBalances;
    
    string public plaque = "In loving memory of those who lost their lives during the COVID-19 crisis.";
    
    
    struct PausedBalanceSet {
        mapping(address => uint) tokenBalances;
        mapping(address => bool) paidTokenHolders;
    }


    modifier onlyAdmin(uint _adminId)
    {
        require(msg.sender == admins[_adminId]);
        _;
    }
    
    modifier isPaused()
    {
        require(token.paused());
        _;
    }


    constructor() 
        ERC721("HOW ARE WE - UNIQUE EDITION", "HOWNFT") 
        public {
        
        
        // Mint the NFT representing the video, set the owner as this contract
        _mint(address(this), 0);
        _setTokenURI(0, "ipfs://ipfs/QmQhNZiMjSxobi67RrRCsuiukq2T3w9s8rdUA8hNrjxGyD");
                
        // Mint the HOW token associated with the project
        token = new PausableToken("HOWAREWE",
                                    "HOW",
                                    msg.sender,
                                    100000000000000000000000);
                                    
    }
    
    function pauseTokens(uint _adminId, address[] memory _tokens) public onlyAdmin(_adminId) {
        require(!token.paused());

        savedBalances.push(PausedBalanceSet());
        uint lastBalanceId = savedBalances.length - 1;
        
        for(uint i = 0; i < _tokens.length; i++){
            if (_tokens[i] == address(0)){
                savedBalances[lastBalanceId].tokenBalances[_tokens[i]] = address(this).balance;
            } else {
                savedBalances[lastBalanceId].tokenBalances[_tokens[i]] = ERC20(_tokens[i]).balanceOf(address(this));
            }
        }
        
        token.pause();
    }
    
    function resumeTokens(uint _adminId) public onlyAdmin(_adminId) {
        require(token.paused());
        token.unpause();
    }
    
    function payoutTokens(uint _adminId, address payable[] memory _tokenHolders, address[] memory _tokens) public onlyAdmin(_adminId) isPaused {
        PausedBalanceSet storage lastBalance = savedBalances[savedBalances.length - 1];
        
        for (uint i = 0; i < _tokenHolders.length; i++){
            require(!lastBalance.paidTokenHolders[_tokenHolders[i]]);

            lastBalance.paidTokenHolders[_tokenHolders[i]] = true;
            for(uint j = 0; j < _tokens.length; j++){
                uint transferAmount = (lastBalance.tokenBalances[_tokens[j]] * 
                                       token.balanceOf(_tokenHolders[i])) /
                                       token.totalSupply(); 
                if (_tokens[j] == address(0)){
                    _tokenHolders[i].transfer(transferAmount);
                } else {
                    ERC20(_tokens[j]).transfer(_tokenHolders[i], transferAmount);

                }
            }
        }
    }
    
    function getSavedBalance(uint _balanceId, address _token) public view returns(uint){
        require(_balanceId < savedBalances.length);
        return savedBalances[_balanceId].tokenBalances[_token];
    }
    
    function transferVideoNFT(uint _adminId, address _newOwner) public onlyAdmin(_adminId) {
        require(ownerOf(0) == address(this)); // Can only transfer in the beginning, when this address is the owner
        _transfer(address(this), _newOwner, 0);
    }
    
    fallback() external payable { }
}


contract PausableToken is ERC20Pausable, Ownable{
    
    constructor (
        string memory name,
        string memory symbol,
        address initialAccount,
        uint256 initialBalance
    ) public ERC20(name, symbol) {
        _mint(initialAccount, initialBalance);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
