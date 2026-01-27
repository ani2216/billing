import './Bill.css';

export default function Bill() {
  return (
    <div className="page">
      <div className="invoice">

        <h2 className="title">TAX INVOICE</h2>

        <div className="row space-between">
          <div>
            <p><b>To,</b></p>
            <p>M/S ABCDS</p>
            <p>ddfwef</p>
            <p><b>GSTIN NO:</b> 123fgtt</p>
          </div>

          <div>
            <p><b>BILL NO:</b> INV-846289</p>
            <p><b>DATED:</b> 28/01/2026</p>
            <p><b>SB NO:</b> 123</p>
            <p><b>SB DATE:</b> 11-01-2026</p>
          </div>
        </div>

        <div className="grid">
          <div>PARTY NAME: abcds</div>
          <div>MAWB / BL: 1</div>
          <div>HAWB / BL: 1</div>
          <div>POL: 1</div>
          <div>POD: 1</div>
          <div>PKGS: 1</div>
          <div>GROSS WEIGHT: 1</div>
          <div>VOLUME WEIGHT:</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Description</th>
              <th>HSN</th>
              <th>Taxable</th>
              <th>SGST%</th>
              <th>SGST</th>
              <th>CGST%</th>
              <th>CGST</th>
              <th>IGST%</th>
              <th>IGST</th>
              <th>Total GST</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>LUGAGE</td>
              <td>12345</td>
              <td>5000.00</td>
              <td>9%</td>
              <td>450.00</td>
              <td>9%</td>
              <td>450.00</td>
              <td>9%</td>
              <td>450.00</td>
              <td>1350.00</td>
              <td>6350.00</td>
            </tr>

            {[...Array(11)].map((_, i) => (
              <tr key={i}>
                <td>{i + 2}</td>
                <td colSpan="11"></td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="3"><b>TOTAL</b></td>
              <td>5000.00</td>
              <td></td>
              <td>450.00</td>
              <td></td>
              <td>450.00</td>
              <td></td>
              <td>450.00</td>
              <td>1350.00</td>
              <td>6350.00</td>
            </tr>
          </tfoot>
        </table>

        <p className="words">
          <b>AMOUNT IN WORDS:</b> INR SIX THOUSAND THREE HUNDRED FIFTY RUPEES ONLY
        </p>

        <div className="bank">
          <p><b>BANK NAME:</b> ICICI BANK</p>
          <p><b>ACCOUNT NUMBER:</b> 040005000652</p>
          <p><b>IFSC CODE:</b> ICIC0000400</p>
        </div>

        <div className="terms">
          <b>General Terms & Conditions:</b>
          <ol>
            <li>Invoice payable immediately.</li>
            <li>As per agreed terms.</li>
            <li>Discrepancy within 7 days.</li>
            <li>24% interest on delay.</li>
            <li>Delhi jurisdiction.</li>
          </ol>
        </div>

        <div className="pay">
          <p>PLEASE PAY THIS AMOUNT</p>
          <hr />
          <h3>Rs. 6,350.00</h3>
        </div>

        <div className="sign">
          <p>FOR DWIVEDI LOGISTICS</p>
          <p>Authorized Signatory</p>
        </div>

        <div className="footer">
          <b>DWIVEDI LOGISTICS</b>
          <p>
            OFFICE NO 103, 84 LAL SINGH BUILDING,  
            MAHIPALPUR, NEW DELHI – 110037
          </p>
          <p><b>GSTIN NO:</b> 07BDPPD2513J1ZN</p>
          <div className="thanks">THANK YOU</div>
        </div>

      </div>
    </div>
  );
}
