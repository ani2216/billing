import { useState, useEffect } from "react";
import { FileText, Plus, Edit, Calendar, User, ArrowLeft, RefreshCw, Loader2, Lock } from "lucide-react";
import BillForm from "./BillForm"; 

// ⚠️ YOUR GOOGLE SHEET URL
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzVcrboKiKc3Pxo1TFKffrVPMjs3hLZMwrE5V-RNtMzovXRP4kjvRAkvzfVISJebqGHSg/exec"; 

export default function Front() {
  // --- AUTHENTICATION STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  // --- APP STATE ---
  const [view, setView] = useState("history"); // 'history' or 'editor'
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorData, setEditorData] = useState(null);

  // --- 1. CHECK LOGIN STATUS ON LOAD ---
  useEffect(() => {
    const loggedIn = localStorage.getItem("dwivedi_auth");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // --- 2. HANDLE LOGIN SUBMIT ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === "DL100793") {
      localStorage.setItem("dwivedi_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid passcode. Please try again.");
      setPasscode("");
    }
  };

  // --- 3. FETCH HISTORY FROM GOOGLE SHEETS ---
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(GOOGLE_SHEET_URL);
      const data = await res.json();
      // Reverse to show latest first
      setHistory(data.reverse());
    } catch (error) {
      console.error("Error fetching history:", error);
      alert("Failed to load invoice history.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch history only if authenticated and on history view
  useEffect(() => {
    if (isAuthenticated && view === "history") {
      fetchHistory();
    }
  }, [isAuthenticated, view]);

  // --- 4. HANDLE NEW INVOICE ---
  const handleNewInvoice = () => {
    setEditorData({
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
    setView("editor");
  };

  // --- 5. HANDLE EDIT INVOICE ---
  const handleEdit = (row) => {
    // Map Google Sheet Row (Array) back to Object
    const invoiceData = {
      billNo: row[1] || "",
      billDate: row[2] || "",
      receiverName: row[3] || "",
      receiverAddress: row[4] || "",
      receiverGstin: row[5] || "",
      partyName: row[6] || "",
      sbNo: row[7] || "",
      sbDate: row[8] || "",
      mawb: row[9] || "",
      hawb: row[10] || "",
      pol: row[11] || "",
      pod: row[12] || "",
      pkgs: row[13] || "",
      grossWeight: row[14] || "",
      volWeight: row[15] || "",
      currency: row[16] || "INR", 
      exchangeRate: row[17] || 1,
      items: row[20] ? JSON.parse(row[20]) : []
    };

    setEditorData(invoiceData);
    setView("editor");
  };

  // ==========================================
  // VIEW 1: LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-red-100 p-4 rounded-full text-red-600 mb-3">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Dwivedi Logistics</h2>
            <p className="text-sm text-gray-500 mt-1">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Enter Passcode</label>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500 transition tracking-widest text-center text-lg font-bold"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            
            {loginError && <p className="text-red-500 text-xs text-center font-bold">{loginError}</p>}
            
            <button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition shadow-md active:scale-95"
            >
              Access System
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: MAIN DASHBOARD (History or Editor)
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-6">
      
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          {view === "history" ? <><FileText /> Invoice History</> : "Invoice Editor"}
        </h1>
        
        {view === "history" && (
          <div className="flex gap-3">
             <button 
               onClick={fetchHistory} 
               className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-gray-600 transition"
               title="Refresh"
             >
               <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
             </button>
             <button 
               onClick={handleNewInvoice}
               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg transition transform active:scale-95"
             >
               <Plus size={20} /> New Invoice
             </button>
          </div>
        )}

        {view === "editor" && (
           <button 
             onClick={() => { setView("history"); fetchHistory(); }}
             className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-bold flex items-center gap-2"
           >
             <ArrowLeft size={18} /> Back to History
           </button>
        )}
      </div>

      {/* --- CONTENT --- */}
      {view === "history" ? (
        <div className="max-w-7xl mx-auto">
          
          {/* Loading State */}
          {loading && (
             <div className="flex justify-center items-center py-20 text-gray-500">
                <Loader2 className="animate-spin mr-2" /> Loading History...
             </div>
          )}

          {/* Empty State */}
          {!loading && history.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg shadow border border-dashed border-gray-300">
               <p className="text-gray-400 text-lg">No invoices found. Create your first one!</p>
            </div>
          )}

          {/* GRID CARD VIEW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((row, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition group relative">
                
                {/* Header Row */}
                <div className="flex justify-between items-start mb-3">
                   <div>
                     <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                       {row[1] || "No Bill #"}
                     </span>
                     <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                       <Calendar size={12}/> {row[2] || "N/A"}
                     </p>
                   </div>
                   <button 
                     onClick={() => handleEdit(row)}
                     className="text-gray-400 hover:text-blue-600 transition bg-gray-50 p-2 rounded-full"
                   >
                     <Edit size={18} />
                   </button>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm font-semibold truncate w-full" title={row[6]}>
                      {row[6] || "Unknown Party"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 pl-6 truncate">
                    To: {row[3]}
                  </div>
                </div>

                {/* Footer Total */}
                <div className="border-t pt-3 flex justify-between items-center">
                   <span className="text-xs font-bold text-gray-400">TOTAL AMOUNT</span>
                   <span className="text-lg font-bold text-green-600">
                      {row[16] === 'USD' ? '$' : row[16] === 'HKD' ? 'HK$' : row[16] === 'SGD' ? 'S$' : '₹'} 
                      {Number(row[19] || 0).toLocaleString()} 
                   </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      ) : (
        /* --- EDITOR VIEW --- */
        <BillForm initialData={editorData} />
      )}
    </div>
  );
}