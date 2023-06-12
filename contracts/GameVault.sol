// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
// import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
// import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

interface IERC20Ape {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

interface IERC20Usdc {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

interface UniswapRouter {

function swapExactTokensForTokens(
  uint amountIn,
  uint amountOutMin,
  address[] calldata path,
  address to,
  uint deadline
) external returns (uint[] memory amounts);

function swapExactInputSingle(uint256 amountIn) external returns (uint256 amountOut);
}

contract GameVault is AutomationCompatibleInterface, Ownable {

    // Uniswap Router contract: 0x4648a43B2C14Da09FdF82B161150d3F634f40491
    // Address of the APE Contract: 0x328507DC29C95c170B56a1b3A758eB7a9E73455c
    // Address for USDC: 0x07865c6E87B9F70255377e024ace6630C1Eaa37F ( onRamp execution ) 

    IERC20Ape public apeToken;
    IERC20Usdc public usdcToken;
    UniswapRouter public uniswapRouter;

    address public buyerAddress;
    address payable public redeemer;
    address public giftTokenAddress; //Token of APEcoin ERC 20 
    string private redemptionKey; //key to redeem tokens
    uint256 public deployedTimestamp; 
    uint expirationTimeInMinutes;
    bool redeemed = false;
    event CouponExpired(uint timestamp);

    uint24 public constant poolFee = 3000;

    constructor(uint _expirationTimeInMinutes) {
        apeToken = IERC20Ape(0x328507DC29C95c170B56a1b3A758eB7a9E73455c);
        usdcToken = IERC20Usdc(0x07865c6E87B9F70255377e024ace6630C1Eaa37F);
        uniswapRouter = UniswapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
        expirationTimeInMinutes = _expirationTimeInMinutes;
    }

    function giftCard(address _buyer, string memory _email) public onlyOwner {
        require(_buyer != address(0));
        require(bytes(_email).length > 0, "redemption key cannot be empty");
        buyerAddress = _buyer;
        redemptionKey = _email;
        deployedTimestamp = block.timestamp;
    }

    function getRedemptionKey() public view onlyOwner returns (string memory) {
        return redemptionKey;
    }

    function withdraw(string memory _email) public {
        require(redeemed == false, "already redeemed");
        require (keccak256(abi.encodePacked(_email)) == keccak256(abi.encodePacked(redemptionKey)),"key does not match");

        uint256 usdcBalance = usdcToken.balanceOf(address(this));

        usdcToken.transferFrom(address(this), msg.sender, usdcBalance);
        redeemed = true;
    }

    function approve(uint256 _amount) public {
        usdcToken.approve(address(this), _amount);
    }

    function getBalanceOfContract() public view returns(uint256){
        return usdcToken.balanceOf(address(this));
    }


    function checkUpkeep(
        bytes calldata
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory)
    {
        // Check if redemption key has expired beyond the 60 day limit                
        upkeepNeeded = (block.timestamp - deployedTimestamp > (expirationTimeInMinutes * 60)) && redeemed == false; // 60 days have passed since creation of redemptionKey and key has not been redeemed
    }

    function performUpkeep(bytes calldata) external override {
        
         if ((block.timestamp - deployedTimestamp > (expirationTimeInMinutes * 60)) && redeemed == false) {
             _couponExpired();
         }        
    }

    function _couponExpired() private  {
        require(redeemed == false, "already redeemed so cannot expire");

        uint256 usdcBalance = usdcToken.balanceOf(address(this));
        require(usdcBalance > 0);
        redeemed = true;
        emit CouponExpired(block.timestamp);
        //return funds back to owner
        
        usdcToken.transferFrom(address(this), buyerAddress, usdcBalance);
    }


}


    // function Swap(string memory _email, uint256 _amountIn) public {
    //     require(redeemed == false, "coupon already redeemed");
    //     require(bytes(_email).length > 0, "redemption key cannot be empty");
    //     require (keccak256(abi.encodePacked(_email)) == keccak256(abi.encodePacked(redemptionKey)),"key does not match");
    //     uint256 usdcBalance = usdcToken.balanceOf(address(this));

    //     usdcToken.approve(0x4648a43B2C14Da09FdF82B161150d3F634f40491, usdcBalance);

    //     uniswapRouter.swapExactInputSingle(usdcBalance);


    //     // address[] memory path = new address[](2);
    //     // path[0] = 0x07865c6E87B9F70255377e024ace6630C1Eaa37F;
    //     // path[1] = 0x328507DC29C95c170B56a1b3A758eB7a9E73455c;

    //     // uniswapRouter.swapExactTokensForTokens(usdcBalance, 0, 
    //     //                                     [],
    //     //                                      msg.sender, block.timestamp + 120);
    //                                                  _getApe();
    // }

    // function _getApe() public {
    //     uint256 apeBalance = apeToken.balanceOf(address(this));
    //     apeToken.transferFrom(address(this), msg.sender, apeBalance);
    // }