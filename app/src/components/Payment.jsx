import Circle from "./Circle"
import React from 'react'

function Payment() {
    return (
        <div className='w-96 h-96 flex flex-col  pl-28 place-content-center'> 
<div id="wrapper" className=" w-80 h-60 justify-center overflow:hidden">
  <div className='row m-0 flex overflow:hidden border-width border-style: scroll-px-0 solid justy-content'>
    <div className="col-xs-5">
      <div id="cards" className="flex justify-center">
        <img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Visa-icon.png" className="w-30 h-24"/>
        <img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Master-Card-icon.png" className="w-30 h-24"/>
      </div>
      <div className="form-check">
</div>
    </div>
  
  </div>
  <div className="row justify-center">
    <div className="col-xs-5">
      <i className="fa fa fa-user flex-col"></i>
      <label for="cardholder" className='flex p-2'>Cardholder's Name</label>
      <input type="text" id="cardholder" className="rounded-lg border-2 border-gray-400"/>
    </div>
    <div className="col-xs-5">
      <i className="fa fa-credit-card-alt"></i>
      <label for="cardnumber" className='flex p-2'>Card Number</label>
      <input type="text" id="cardnumber" className='border-2 border-gray-400 rounded-lg'/>
    </div>
  </div>
  <div className="row row-three">
    <div className="col-xs-2">
      <i className="fa fa-calendar flex justify-center"></i>
      <label for="date" className='flex p-2'>Valid thru</label>
      <input type="text" placeholder="MM/YY" className="rounded-lg rounded-lg border-2 border-gray-400 flex justify-around" id="date"/>
    </div>
    <div className="col-xs-2">
      <i className="fa fa-lock"></i>
      <label className="flex p-2    " for="date">CVV / CVC *</label>
      <input className="flex justify-around rounded-lg rounded-lg border-2 border-gray-400" type="text"/>
    </div>
    
  </div>
  <div className="flex justify-between flex justify-center">
    <button className="btn flex rounded-lg mx-10 bg-red-600 text-white cursor-pointer">Next Step </button>
  </div>

</div>
</div>
                  


    );
  }
  
  export default Payment