import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [pid, setPid] = useState(null);

  const [id, setId] = useState("");

  let names = [
    'test-session-1',
    'harsha-device',
    "test-session-678"
  ]

  const backendUrl = "http://localhost";
  // const backendUrl = "http://learn-sticky-lb-419680506.ap-south-1.elb.amazonaws.com"

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
      setQrCode(data.data.qrImage);
      console.log("qr code fetched successfully", data.data.qrImage);
    } catch (error) {
      console.log("something went wrong while fetching qr code", error);
    } finally {
      setLoading(false);
    }
  }

  const fetchChats = async () => {
    try {
      const res = await fetch(`${backendUrl}/groups?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      console.log("chats fetched successfully", data.data);
      const objArray = [];

      Object.keys(data.data).forEach(key => objArray.push({
        groupdId: key,
        members: data.data[key]
      }));

      setPid(data.taskId);
      setGroups(objArray);
    } catch (error) {
      console.log("something went wrong while fetching chats", error);
    }
  };


  return (
    <>

      <h1>enter device name</h1>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={fetchQr}>add</button>

      {
        pid && <p>pid: {pid}</p>
      }

      {loading && <p>Loading QR...</p>}

      {qrCode ? (
        <>
          <p>Scan the QR code for WhatsApp login</p>
          <img src={qrCode} alt="QR Code" />
        </>
      ) : !loading && (
        <p>No QR code available.</p>
      )}

      <button onClick={fetchChats}>Click here for fetching the chats</button>

      {
        groups?.length > 0 && (
          <div>
            <h2>Groups:</h2>
            <ul>
              {groups.map((group) => (
                <li key={group.groupdId}>
                  <p><strong>Name:</strong> {group.name}</p>
                  <p><strong>ID:</strong> {group.groupdId}</p>
                  <p><strong>Members:</strong> {group.members.length}</p>
                </li>
              ))}
            </ul>
          </div>
        )
      }
    </>
  )
}

export default App
