// import { useRef, useState } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { numberToWords } from "../utils/numberToWords";
// import './Bill.css'
// import logo from "../assets/logo.jpg";
// import { useReactToPrint } from "react-to-print";
// import html2pdf from "html2pdf.js";

// export default function BillForm() {
//   const pdfRef = useRef();

//   const [data, setData] = useState({
//     partyName: "",
//     hsn: "",
//     taxable: 5000,
//     sgstRate: 0,
//     cgstRate: 0,
//     igstRate: 0,
//   });

//   const taxable = Number(data.taxable || 0);
//   const sgstAmt = (taxable * data.sgstRate) / 100;
//   const cgstAmt = (taxable * data.cgstRate) / 100;
//   const igstAmt = (taxable * data.igstRate) / 100;
//   const totalGST = sgstAmt + cgstAmt + igstAmt;
//   const totalAmount = taxable + totalGST;

// // // 📄 DOWNLOAD PDF (FINAL FIX)
//   const downloadPDF = async () => {
//     const canvas = await html2canvas(pdfRef.current, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const width = 210;
//     const height = (canvas.height * width) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, width, height);
//     pdf.save("invoice.pdf");
//   };

//   return (
//     <div>

//       {/* LEFT: INPUT FORM */}
//       <div style={{ width: "40%" }}>
//         <h3>Invoice Inputs</h3>

//         <input
//           placeholder="Party Name"
//           value={data.partyName}
//           onChange={(e) => setData({ ...data, partyName: e.target.value })}
//         />

//         <input
//           placeholder="HSN"
//           value={data.hsn}
//           onChange={(e) => setData({ ...data, hsn: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="Taxable Amount"
//           value={data.taxable}
//           onChange={(e) => setData({ ...data, taxable: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="SGST %"
//           value={data.sgstRate}
//           onChange={(e) => setData({ ...data, sgstRate: e.target.value })}
//         />

//         <input
//           type="number"
//           placeholder="CGST %"
//           value={data.cgstRate}
//           onChange={(e) => setData({ ...data, cgstRate: e.target.value })}
//         />

//         <button onClick={downloadPDF}>Download PDF</button>
//       </div>

//       {/* RIGHT: PDF PREVIEW (LIVE) */}
//       <div className="pdf-wrapper">
//       <div ref={pdfRef} className="pdf-page">
//         <img src={logo} alt="logo" />
//          <div className="header">
//           <b style={{fontSize:'30px'}}>DWIVEDI LOGISTICS</b>
//           <p>
//             OFFICE NO 103, 84 LAL SINGH BUILDING,  
//             MAHIPALPUR, NEW DELHI – 110037
//           </p>
//           <p><b>GSTIN NO:</b> 07BDPPD2513J1ZN</p>
//         </div>

//         <div style={{ margin: "15px 0" }}>
//             <h2 className="title">TAX INVOICE</h2>
//             </div>

//         <div className="row space-between">
//           <div className="party">
//             <p style={{color:'red'}}><b>To,</b></p>
//             <p style={{fontWeight:'bold'}}>M/S VIGNAHARTA LOGISTICS</p>
//             <p>REG OFFICE: G-99 Haware Fantasia business Complex,
//             Plot no - 47, Next to Inorbit Mall, Sector - 30
//             Vashi, Navi Mumbai - 400703
//             </p>
//             <p><b>GSTIN NO:</b> 27AAXFV8303J1ZFS</p>
//           </div>

//           {/* <div className="">
//             <p><b>BILL NO:</b> INV-846289</p>
//             <p><b>DATED:</b> 28/01/2026</p>
//             <p><b>SB NO:</b> 123</p>
//             <p><b>SB DATE:</b> 11-01-2026</p>
//           </div> */}
//         </div>

//         <div className="grid">
//             <div>
//                 <p><b>PARTY NAME:</b></p>
//                 <p>CI CAR INTERNATIONAL PVT LTD</p>
//             </div>

//             <div>
//                 <p><b>BILL NO:</b></p>
//                 <p>INV-846289</p>
//             </div>

//             <div>
//                 <p><b>DATED:</b></p>
//                 <p>28/01/2026</p>
//             </div>

//             <div>
//                 <p><b>SB NO:</b></p>
//                 <p>123</p>
//             </div>

//             <div>
//                 <p><b>SB DATE:</b></p>
//                 <p>11-01-2026</p>
//             </div>

//             <div>
//                 <p><b>MAWB / BL:</b></p>
//                 <p>1</p>
//             </div>

//             <div>
//                 <p><b>HAWB / BL:</b></p>
//                 <p>1</p>
//             </div>

//             <div>
//                 <p><b>POL:</b></p>
//                 <p>1</p>
//             </div>

//             <div>
//                 <p><b>POD:</b></p>
//                 <p>1</p>
//             </div>

//             <div>
//                 <p><b>PKGS:</b></p>
//                 <p>1</p>
//             </div>

//             <div>
//                 <p><b>GROSS WEIGHT:</b></p>
//                 <p>1</p>
//             </div>

//             <div>
//                 <p><b>VOLUME WEIGHT:</b></p>
//                 <p>1</p>
//             </div>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Description</th>
//               <th>HSN</th>
//               <th>Taxable</th>
//               <th>SGST%</th>
//               <th>SGST</th>
//               <th>CGST%</th>
//               <th>CGST</th>
//               <th>IGST%</th>
//               <th>IGST</th>
//               <th>Total GST</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>LUGAGE</td>
//               <td>12345</td>
//               <td>5000.00</td>
//               <td>9%</td>
//               <td>450.00</td>
//               <td>9%</td>
//               <td>450.00</td>
//               <td>9%</td>
//               <td>450.00</td>
//               <td>1350.00</td>
//               <td>6350.00</td>
//             </tr>

//             {[...Array(11)].map((_, i) => (
//               <tr key={i}>
//                 <td>{i + 2}</td>
//                 <td colSpan="11"></td>
//               </tr>
//             ))}
//           </tbody>

//           <tfoot>
//             <tr>
//               <td colSpan="10"><b>TOTAL</b></td>
//               {/* <td>5000.00</td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td> */}
//               <td>1350.00</td>
//               <td>6350.00</td>
//             </tr>
//           </tfoot>
//         </table>
//         <div className="pay">
//             <div className="pays">
//           <p>PLEASE PAY THIS AMOUNT: </p>
//           <h3>Rs. 6,350.00</h3>
//           </div>
//         </div>

//         <p className="words">
//           <b>AMOUNT IN WORDS:</b> INR SIX THOUSAND THREE HUNDRED FIFTY RUPEES ONLY
//         </p>

//         <hr />

//         <div className="bank">
//           <p><b>BANK NAME:</b> ICICI BANK</p>
//           <p><b>ACCOUNT NUMBER:</b> 040005000652</p>
//           <p><b>IFSC CODE:</b> ICIC0000400</p>
//         </div>

//         <div className="terms">
//           <b>General Terms & Conditions:</b>
//           <ol>
//             <li>This Invoice is payable with immediate effect on presentation</li>
//             <li>Invoice is raised as per the agreed terms & conditions between companies.</li>
//             <li>In case of any discrepancy Please revert Back to us within 7 days from the date of this invoice.</li>
//             <li> Interest will be charged @ 24% per annum in case of delay in payments from the date of invoice.
// </li>
//             <li>All disputes are subject to relevant courts of Delhi Jurisdiction.</li>
//           </ol>
//         </div>

//         <div className="sign">
//           <p>FOR DWIVEDI LOGISTICS</p>
//           {/* <p>Authorized Signatory</p> */}
//         </div>

//         <div className="thanks">THANK YOU</div>

//       </div>
//       </div>
//     </div>
//   );
// }

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../assets/logo.jpg";

// --- 1. UTILITY: Number To Words ---
function numberToWords(num, currency) {
  if (!num) return "";
  
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred " + (n % 100 !== 0 ? " " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand " + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh " + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
    return "";
  };

  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 100);

  let currencyName = "Rupees";
  let coinName = "Paise";

  if (["USD", "HKD", "SGD"].includes(currency)) {
    currencyName = "Dollars";
    coinName = "Cents";
  }

  let str = `${currency} ${inWords(integerPart)} ${currencyName}`;
  
  if (decimalPart > 0) {
    str += ` and ${inWords(decimalPart)} ${coinName}`;
  }
  
  return (str + " Only").toUpperCase();
}

// --- 2. CURRENCY CONFIGURATION ---
const CURRENCIES = {
  INR: { symbol: "₹", name: "INR" },
  USD: { symbol: "$", name: "USD" },
  HKD: { symbol: "HK$", name: "HKD" },
  SGD: { symbol: "S$", name: "SGD" },
};

export default function BillForm() {
  const pdfRef = useRef();

  // --- STATE ---
  const [currency, setCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isFetchingRate, setIsFetchingRate] = useState(false);

  const [data, setData] = useState({
    receiverName: "",
    receiverAddress: "",
    receiverGstin: "",
    partyName: "",
    billNo: "",
    billDate: "",
    sbNo: "",
    sbDate: "",
    mawb: "", hawb: "", pol: "", pod: "", pkgs: "", grossWeight: "", volWeight: "",
    items: [
      { description: "", hsn: "", taxable: 0, sgstRate: 0, cgstRate: 0, igstRate: 0 }
    ]
  });

  // --- API: Fetch Rate ---
  const fetchExchangeRate = async (targetCurrency) => {
    if (targetCurrency === "INR") {
      setExchangeRate(1);
      return;
    }
    setIsFetchingRate(true);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${targetCurrency}`);
      const json = await res.json();
      const rate = json.rates.INR; 
      if (rate) setExchangeRate(rate);
    } catch (error) {
      console.error("Error fetching rate", error);
    } finally {
      setIsFetchingRate(false);
    }
  };

  const handleCurrencyChange = (e) => {
    const newCur = e.target.value;
    setCurrency(newCur);
    fetchExchangeRate(newCur);
  };

  // --- HANDLERS ---
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData({ ...data, items: newItems });
  };

  const addItem = () => setData({ ...data, items: [...data.items, { description: "", hsn: "", taxable: 0, sgstRate: 0, cgstRate: 0, igstRate: 0 }] });
  
  const removeItem = (index) => setData({ ...data, items: data.items.filter((_, i) => i !== index) });

  // --- CALCULATIONS ---
  const totals = data.items.reduce((acc, item) => {
    const taxable = parseFloat(item.taxable) || 0;
    const sgst = (taxable * (parseFloat(item.sgstRate) || 0)) / 100;
    const cgst = (taxable * (parseFloat(item.cgstRate) || 0)) / 100;
    const igst = (taxable * (parseFloat(item.igstRate) || 0)) / 100;

    return {
      gstTotal: acc.gstTotal + (sgst + cgst + igst),
      grandTotal: acc.grandTotal + taxable + (sgst + cgst + igst)
    };
  }, { gstTotal: 0, grandTotal: 0 });

  const amountInWords = numberToWords(totals.grandTotal, currency);
  const curSymbol = CURRENCIES[currency].symbol;

  // Calculate Equivalent INR
  const equivalentINR = totals.grandTotal * exchangeRate;

  // --- DOWNLOAD PDF ---
  const downloadPDF = async () => {
    const element = pdfRef.current;
    window.scrollTo(0, 0); 
    await new Promise(r => setTimeout(r, 100));
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, scrollY: 0 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    const fileName = data.billNo && data.billNo.trim() !== ""
  ? data.billNo
  : "invoice";

pdf.save(`${fileName}.pdf`);
  };

  return (
    <div className="flex gap-5 p-5 bg-gray-100 min-h-screen font-sans">

      {/* ================= LEFT: INPUT FORM ================= */}
      <div className="w-[45%] bg-white p-6 rounded-lg shadow-xl h-[95vh] overflow-y-auto sticky top-5">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Invoice Editor</h3>

        <div className="space-y-6">
          
          {/* Currency */}
          <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
             <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
               Currency {isFetchingRate && <span className="text-xs animate-pulse">(Updating...)</span>}
             </h4>
             <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-xs font-bold text-gray-500">Select Currency</label>
                  <select value={currency} onChange={handleCurrencyChange} className="w-full border p-2 rounded bg-white font-bold">
                    {Object.keys(CURRENCIES).map(c => <option key={c} value={c}>{c} ({CURRENCIES[c].symbol})</option>)}
                  </select>
                </div>
                {currency !== "INR" && (
                   <div className="w-1/2">
                      <label className="text-xs font-bold text-gray-500">Rate (1 {currency} = ? INR)</label>
                      <input type="number" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} className="w-full border p-2 rounded" />
                   </div>
                )}
             </div>
          </div>

          {/* Receiver */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Receiver Details</h4>
            <input name="receiverName" value={data.receiverName} onChange={handleChange} className="w-full border p-2 mb-2 rounded text-sm" placeholder="Receiver Name" />
            <textarea name="receiverAddress" value={data.receiverAddress} onChange={handleChange} rows="2" className="w-full border p-2 mb-2 rounded text-sm" placeholder="Address" />
            <input name="receiverGstin" value={data.receiverGstin} onChange={handleChange} className="w-full border p-2 rounded text-sm" placeholder="GSTIN" />
          </div>

          {/* Invoice Meta */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Invoice Details</h4>
            <div className="space-y-2">
               <input name="partyName" value={data.partyName} onChange={handleChange} className="w-full border p-2 rounded text-sm" placeholder="Party Name" />
               <div className="grid grid-cols-2 gap-2">
                 <input name="billNo" value={data.billNo} onChange={handleChange} className="border p-2 rounded text-sm" placeholder="Bill No" />
                 <input name="billDate" value={data.billDate} onChange={handleChange} className="border p-2 rounded text-sm" placeholder="Bill Date" />
                 <input name="sbNo" value={data.sbNo} onChange={handleChange} className="border p-2 rounded text-sm" placeholder="SB No" />
                 <input name="sbDate" value={data.sbDate} onChange={handleChange} className="border p-2 rounded text-sm" placeholder="SB Date" />
               </div>
            </div>
          </div>

          {/* Logistics */}
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">Logistics Info</h4>
            <div className="grid grid-cols-3 gap-2">
               {['mawb', 'hawb', 'pol', 'pod', 'pkgs', 'grossWeight', 'volWeight'].map((field) => (
                 <input 
                   key={field}
                   name={field}
                   value={data[field]} 
                   onChange={handleChange} 
                   placeholder={field.toUpperCase()} 
                   className="border p-2 rounded text-sm" 
                 />
               ))}
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-blue-800">Items (Values in {currency})</h4>
              <button onClick={addItem} className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">+ Add Item</button>
            </div>
            <div className="space-y-3">
              {data.items.map((item, index) => {
                const t = parseFloat(item.taxable) || 0;
                const r = t + (t * (parseFloat(item.sgstRate||0) + parseFloat(item.cgstRate||0) + parseFloat(item.igstRate||0)) / 100);
                return (
                <div key={index} className="border p-3 rounded bg-blue-50 relative">
                   {data.items.length > 1 && <button onClick={() => removeItem(index)} className="absolute top-2 right-2 text-red-500 text-xs font-bold">Remove</button>}
                   <div className="grid grid-cols-2 gap-2 mb-2">
                      <input value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="border p-1 rounded text-sm" placeholder="Description" />
                      <input value={item.hsn} onChange={(e) => handleItemChange(index, 'hsn', e.target.value)} className="border p-1 rounded text-sm" placeholder="HSN" />
                   </div>
                   <div className="grid grid-cols-4 gap-2">
                      <input type="number" value={item.taxable} onChange={(e) => handleItemChange(index, 'taxable', e.target.value)} className="border p-1 rounded text-sm font-bold text-blue-900" placeholder={`Taxable`} />
                      <input type="number" value={item.sgstRate} onChange={(e) => handleItemChange(index, 'sgstRate', e.target.value)} className="border p-1 rounded text-sm" placeholder="SGST %" />
                      <input type="number" value={item.cgstRate} onChange={(e) => handleItemChange(index, 'cgstRate', e.target.value)} className="border p-1 rounded text-sm" placeholder="CGST %" />
                      <input type="number" value={item.igstRate} onChange={(e) => handleItemChange(index, 'igstRate', e.target.value)} className="border p-1 rounded text-sm" placeholder="IGST %" />
                   </div>
                   <p className="text-xs text-right mt-1 text-gray-500">Total: {curSymbol} {r.toFixed(2)}</p>
                </div>
              )})}
            </div>
          </div>

          <button onClick={downloadPDF} className="w-full bg-red-600 text-white py-3 rounded-lg font-bold shadow hover:bg-red-700">
            DOWNLOAD PDF
          </button>
        </div>
      </div>

      {/* ================= RIGHT: PREVIEW (A4) ================= */}
      <div className="w-full flex justify-center overflow-x-auto pb-10">
        <div ref={pdfRef} className="w-[794px] min-h-[1123px] bg-white p-8 border border-gray-300 text-xs text-black leading-tight relative shadow-2xl flex flex-col justify-between">
          
          <div> 
            {/* Header */}
            <div className="relative mb-2">
               <img src={logo} alt="logo" className="w-[100px] h-[40px] absolute top-0 left-0" />
               <div className="text-center">
                  <b className="text-[30px] block mb-[5px] tracking-wide">DWIVEDI LOGISTICS</b>
                  <p>OFFICE NO 103, 84 LAL SINGH BUILDING, MAHIPALPUR, NEW DELHI – 110037</p>
                  <p className="mt-1"><b>GSTIN NO:</b> 07BDPPD2513J1ZN</p>
                  <p className="mt-1"><b>Email:</b> info@dwivedilogistics.in</p>

               </div>
            </div>

            <div className="mt-5 mb-4">
                <h2 className="text-center font-bold text-lg bg-red-600 text-white py-1 print:bg-red-600 print:text-white">
                  TAX INVOICE
                </h2>
            </div>

            {/* Receiver */}
            <div className="flex justify-between mb-4 border border-black p-2">
              <div className="w-full">
                <p className="text-red-600 font-bold mb-1">To,</p>
                <p className="font-bold">{data.receiverName}</p>
                <p className="mt-1 whitespace-pre-line">{data.receiverAddress}</p>
                <p className="mt-1"><b>GSTIN NO:</b> {data.receiverGstin}</p>
              </div>
            </div>

            {/* Logistics Grid */}
            <div className="grid grid-cols-4 border-t border-l border-black mb-3">
                {[
                  { label: "PARTY NAME:", val: data.partyName },
                  { label: "BILL NO:", val: data.billNo },
                  { label: "DATED:", val: data.billDate },
                  { label: "SB NO:", val: data.sbNo },
                  { label: "SB DATE:", val: data.sbDate },
                  { label: "MAWB / BL:", val: data.mawb },
                  { label: "HAWB / BL:", val: data.hawb },
                  { label: "POL:", val: data.pol },
                  { label: "POD:", val: data.pod },
                  { label: "PKGS:", val: data.pkgs },
                  { label: "GROSS WEIGHT:", val: data.grossWeight },
                  { label: "VOLUME WEIGHT:", val: data.volWeight },
                ].map((item, idx) => (
                  <div key={idx} className="border-r border-b border-black p-1 pl-2 h-full">
                    <p className="font-bold">{item.label}</p>
                    <p>{item.val}</p>
                  </div>
                ))}
            </div>

            {/* Table - DYNAMIC ROWS ONLY */}
            <table className="w-full border-collapse border border-black mb-4">
              <thead>
                <tr className="bg-gray-100">
                  {["S.No", "Description", "HSN", "Taxable", "SGST%", "SGST", "CGST%", "CGST", "IGST%", "IGST", "Total GST", "Total"].map((h) => (
                    <th key={h} className="border border-black p-1 text-center font-bold text-[10px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, i) => {
                    const taxable = parseFloat(item.taxable) || 0;
                    const sgst = (taxable * (parseFloat(item.sgstRate) || 0)) / 100;
                    const cgst = (taxable * (parseFloat(item.cgstRate) || 0)) / 100;
                    const igst = (taxable * (parseFloat(item.igstRate) || 0)) / 100;
                    const totalGst = sgst + cgst + igst;
                    const totalRow = taxable + totalGst;

                    return (
                      <tr key={i}>
                        <td className="border border-black p-1 text-center">{i + 1}</td>
                        <td className="border border-black p-1 text-center font-bold">{item.description}</td>
                        <td className="border border-black p-1 text-center">{item.hsn}</td>
                        <td className="border border-black p-1 text-center">{curSymbol} {taxable.toFixed(2)}</td>
                        <td className="border border-black p-1 text-center">{item.sgstRate}%</td>
                        <td className="border border-black p-1 text-center">{curSymbol} {sgst.toFixed(2)}</td>
                        <td className="border border-black p-1 text-center">{item.cgstRate}%</td>
                        <td className="border border-black p-1 text-center">{curSymbol} {cgst.toFixed(2)}</td>
                        <td className="border border-black p-1 text-center">{item.igstRate}%</td>
                        <td className="border border-black p-1 text-center">{curSymbol} {igst.toFixed(2)}</td>
                        <td className="border border-black p-1 text-center">{curSymbol} {totalGst.toFixed(2)}</td>
                        <td className="border border-black p-1 text-center font-bold">{curSymbol} {totalRow.toFixed(2)}</td>
                      </tr>
                    )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="10" className="border border-black p-1 font-bold text-right bg-gray-50">TOTAL</td>
                  <td className="border border-black p-1 text-center font-bold">{curSymbol} {totals.gstTotal.toFixed(2)}</td>
                  <td className="border border-black p-1 text-center font-bold">{curSymbol} {totals.grandTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            {/* Payment Box */}
            <div className="flex justify-end mb-3">
               <div className="flex border border-black w-fit">
                  <p className="bg-red-600 text-white p-2 m-0 font-bold print:bg-red-600 print:text-white flex items-center">
                    PLEASE PAY THIS AMOUNT:
                  </p>
                  <h3 className="p-2 m-0 font-bold text-lg">
                    {curSymbol} {totals.grandTotal.toFixed(2)}
                  </h3>
               </div>
            </div>

           {/* Amount In Words & Equivalent INR */}
<div className="mb-2">
  <p className="uppercase">
    <b>AMOUNT IN WORDS:</b> {amountInWords}
  </p>

  {currency !== "INR" && (
    <>
      <p className="mt-1 font-bold text-gray-700">
        (Equivalent to INR: ₹{" "}
        {equivalentINR.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })})
      </p>

      <p className="text-right text-[10px] italic mb-2">
        Exchange Rate Applied: 1 {currency} = {exchangeRate} INR
      </p>
    </>
  )}
</div>

            <hr className="border-t border-black my-2" />

            <div className="mt-2 space-y-1">
              <p><b>BANK NAME:</b> ICICI BANK</p>
              <p><b>ACCOUNT NUMBER:</b> 040005000652</p>
              <p><b>IFSC CODE:</b> ICIC0000400</p>
            </div>

            <div className="mt-4">
              <b className="underline block mb-1">General Terms & Conditions:</b>
              <ol className="list-decimal pl-5 space-y-0.5 text-[11px] leading-snug">
                <li>This Invoice is payable with immediate effect on presentation.</li>
                <li>Invoice is raised as per the agreed terms & conditions between companies.</li>
                <li>In case of any discrepancy Please revert Back to us within 7 days.</li>
                <li>Interest will be charged @ 24% per annum in case of delay in payments.</li>
                <li>All disputes are subject to relevant courts of Delhi Jurisdiction.</li>
              </ol>
            </div>
          </div>

          <div>
            <div className="flex justify-end mt-8 mr-4">
              <div className="text-center">
                <p className="font-bold">FOR DWIVEDI LOGISTICS</p>
                <div className="h-10"></div> 
                <p className="text-[10px] text-gray-500">Authorized Signatory</p>
              </div>
            </div>
            <div className="mt-5 mb-0">
              <div className="bg-red-600 text-white text-center py-1 font-bold print:bg-red-600 print:text-white">
                THANK YOU
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}