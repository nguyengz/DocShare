import { useSelector } from "react-redux";
import { useEffect } from "react";

function PaymentApproval() {
  const approvalUrl = useSelector((state) => state.pay.approvalUrl);

  useEffect(() => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
    }
  }, [approvalUrl]);

  return <div>Redirecting to PayPal...</div>;
}

export default PaymentApproval;