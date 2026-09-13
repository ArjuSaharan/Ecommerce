import React from 'react'
import {PayPalButtons,PayPalScriptProvider} from '@paypal/react-paypal-js';

const Payapl = ({amount, onSuccess,onError}) => {
  return (
    <PayPalScriptProvider options={{"client-id":"BAANM_An56s19Ja5L3UcLz9f8bwquKmHBN1iDIqfu0wJRdRf-wiubaQLm3aRhNkypQSde7RobfePo5GefQ"}}>
        <PayPalButtons style={{layout:'vertical'}}>
            createOrder={(data,action)=>{
                return useActionState.order.create({
                    purchase_units:[{amount:{value:parseFloat(amount).toFixed(2)}}]
                })
            }}
            onApprove={(data,actions)=>{
                return actions.order.capture().then(onSuccess);
            }}
            onError={onError}
            </PayPalButtons> 
    </PayPalScriptProvider>
  )
}

export default Payapl