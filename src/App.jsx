import { useEffect, useState } from 'react'
import './App.css'
import DateJsComponent from "./components/DateJsComponent.jsx";
import Search from "./components/Search.jsx";

function App() {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [pid, setPid] = useState(null);
  const [isgroupLoading, setIsgroupLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [id, setId] = useState("");
  const [groupId, setGroupId] = useState("");

  let names = [
    'test-session-1',
    'harsha-device',
    "test-session-678"
  ]

  // const backendUrl = "https://whatsapp.local"; // nginx server 
  // const backendUrl = "http://localhost:8000"
  const backendUrl = "https://lp313wlgz9.execute-api.us-east-2.amazonaws.com/production"
  // const backendUrl = "http://13.127.84.237"
  // const backendUrl = "http://210.79.128.162:8000"
  // const backendUrl = "https://koago0jzb4.execute-api.ap-south-1.amazonaws.com/dev"

  const fetchQr = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/sessions/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          id: id,
          isLegacy: false
        })
      });

      const data = await res.json();
      setQrCode(data.data.qr);
      console.log("qr code fetched successfully", data.data.qrImage);
    } catch (error) {
      console.log("something went wrong while fetching qr code", error);
    } finally {
      setLoading(false);
    }
  }

  const fetchChats = async () => {
    try {
      setIsgroupLoading(true);
      const res = await fetch(`${backendUrl}/groups/list/?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      console.log("chats fetched successfully", data.data);

      // setPid(data.processData.taskId);
      setGroups(data.data);

      console.log(data.data);

    } catch (error) {
      console.log("something went wrong while fetching chats", error);
    } finally {
      setIsgroupLoading(false);
    }
  };


  const fetchDeviceStatus = async () => {
    try {
      const res = await fetch(`${backendUrl}/sessions/status/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      console.log("device status fetched successfully", data);

      if (data.valid_session) {
        setStatus('connected');
      }
    } catch (error) {
      console.log("something went wrong while fetching device status", error);
    }
  }

  // the same function can be used to send the message to community and group both 
  const sendMessageToGroup = async (groupId, message) => {
    try {
      const res = await fetch(`${backendUrl}/groups/send/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reciever: groupId,
          message
        })
      });

      const data = await res.json();
      console.log("message sent successfully", data);

    } catch (error) {
      console.error("Something went wrong while sending the message to the group", error);
    }
  }

  const setGroupID = (id) => {
    setGroupId(id);
  }

  const logout = async () => {
    try {
      const res = await fetch(`${backendUrl}/sessions/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      console.log("device logged out successfully", data);
    }
    catch (error) {
      console.log("something went wrong while logging out", error);
    }
  }

  useEffect(() =>{
    console.log("id changed:", id)
  },[id])

  return (
    <div className="app-container" style={{
      maxWidth: 400,
      margin: "40px auto",
      padding: 24,
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      background: "#fff",
      fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Enter Device Name</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Device name"
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16
          }}
        />
        <button
          onClick={fetchQr}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "none",
            background: "#0078d4",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>

      {status && <p style={{ color: "#555", fontSize: 14 }}>Status: <span style={{ fontWeight: 600 }}>{status}</span></p>}
      <button onClick={fetchDeviceStatus}>fetch status</button>

      <p>The selected groupId : {groupId}</p>
      <button onClick={() => sendMessageToGroup(groupId, "Hello Community or group!")}>Send Message</button>

      <button onClick={logout}>logout</button>

      {pid && <p style={{ color: "#555", fontSize: 14 }}>Process ID From the server: <span style={{ fontWeight: 600 }}>{pid}</span></p>}

      {loading && <p style={{ color: "#0078d4" }}>Loading QR...</p>}

      {qrCode ? (
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <p style={{ marginBottom: 8 }}>Scan the QR code for WhatsApp login</p>
          <img
            src={qrCode}
            alt="QR Code"
            style={{
              width: 180,
              height: 180,
              borderRadius: 8,
              border: "1px solid #eee",
              background: "#fafafa"
            }}
          />
        </div>
      ) : !loading && (
        <p style={{ color: "#888", textAlign: "center" }}>No QR code available.</p>
      )}

      <button
        onClick={fetchChats}
        style={{
          width: "100%",
          padding: "10px 0",
          borderRadius: 6,
          border: "none",
          background: "#28a745",
          color: "#fff",
          fontWeight: 500,
          cursor: "pointer",
          margin: "16px 0"
        }}
      >
        {isgroupLoading ? "Loading Groups..." : "Fetch Groups"}
      </button>

      {groups && groups.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 12 }}>Groups:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {groups.map((group, index) => (
              <li
                key={group.groupId}
                onClick={() => setGroupID(group.groupId)}
                style={{
                  background: "#f4f6fa",
                  borderRadius: 8,
                  padding: "12px 16px",
                  marginBottom: 10,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                }}
              >
                 <p style={{ margin: 0, fontWeight: 600 }}>
                    <span style={{ color: "#0078d4" }}>Name:</span> {group.subject || "No Name"}
                  </p>
                  <p style={{ margin: "4px 0 0 0", color: "#555" }}>
                    <span style={{ color: "#28a745" }}>ID:</span> {group.id || "N/A"}
                  </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <DateJsComponent/>
      <Search />
    </div>
  )
}

export default App;