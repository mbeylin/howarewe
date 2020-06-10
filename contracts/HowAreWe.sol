pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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


/// @title HowAreWe
/// @dev A contract for issuing bounties on Ethereum paying in ETH, ERC20, or ERC721 tokens
contract HowAreWe is ERC721{

    using SafeMath for uint256;

    // - pause all token Transfers (only admin)
    // - pay out money to an array of addresses
    // - claim money
    // - resume token Transfers


    address[] public admins;

    PausableToken public token;
    
    PausedBalanceSet[] savedBalances;
    
    
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


    constructor(address[] memory _admins, address[] memory _contributors, uint[] memory _disbursements, string memory _hash) 
        ERC721("HowAreWePiece", "HOWNFT") 
        public {
        require(_admins.length > 0);
        require(_contributors.length > 0);
        require(_contributors.length == _disbursements.length);
        
        admins = _admins;

        // Mint the token associated with the project
        token = new PausableToken("HowAreWe",
                                    "HOW",
                                    address(this),
                                    100000);
        _mint(address(this), 0);
        _setTokenURI(0, _hash);
                                            
        for (uint i = 0; i < _contributors.length; i++){
            token.transfer(_contributors[i], _disbursements[i]);
        }
        
        //TODO: make this a 721 token, embed the IPFS hash
    }
    
    function pauseTokens(uint _adminId, address[] memory _tokens) public onlyAdmin(_adminId) {
        require(!token.paused());

        savedBalances.push(PausedBalanceSet());
        uint lastBalanceId = savedBalances.length - 1;
        
        savedBalances[lastBalanceId].tokenBalances[address(0)] = address(this).balance;
        for(uint i = 0; i < _tokens.length; i++){
            savedBalances[lastBalanceId].tokenBalances[_tokens[i]] = ERC20(_tokens[i]).balanceOf(address(this));
        }
        
        token.pause();
    }
    
    function resumeTokens(uint _adminId) public onlyAdmin(_adminId) {
        require(token.paused());
        token.unpause();
    }
    
    function payoutTokens(uint _adminId, address payable [] memory _tokenHolders, address[] memory _tokens) public onlyAdmin(_adminId) isPaused {
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
}
