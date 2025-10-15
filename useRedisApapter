// import { BufferJSON, proto, initAuthCreds } from "baileys";
// import { redis } from "./redis.js";


// export default async function useRedisAuthState(sessionId) {

//     const writeData = async (state, id) => {
//         const info = JSON.stringify(state, BufferJSON.replacer);  // Store as string
//         return await redis.set(`baileys:${id}`, info);
//     };

//     const readData = async (id) => {
//         const data = await redis.get(`baileys:${id}`);
//         if (!data) return null;
//         try {
//             return JSON.parse(data, BufferJSON.reviver);
//         } catch (err) {
//             console.error(`Error parsing data for ${id}:`, err);
//             return null;
//         }
//     };

//     const creds = (await readData(`${sessionId}-creds`)) || initAuthCreds();

//     const state = {
//         creds,
//         keys: {
//             get: async (type, ids) => {
//                 const data = {};
//                 await Promise.all(
//                     ids.map(async (id) => {
//                         let value = await readData(`${sessionId}-${type}-${id}`);

//                         if (value && type === 'app-state-sync-key') {
//                             value = proto.Message.AppStateSyncKeyData.fromObject(value);
//                         }
//                         data[id] = value;
//                     })
//                 );
//                 return data;
//             },

//             set: async (data) => {
//                 const tasks = [];
//                 for (const category of Object.keys(data)) {
//                     for (const id of Object.keys(data[category])) {
//                         const value = data[category][id];
//                         const key = `${sessionId}-${category}-${id}`;
//                         tasks.push(value ? writeData(value, key) : redis.del(key));
//                     }
//                 }
//                 await Promise.all(tasks);
//             }
//         }
//     }
//     return {
//         state,
//         saveCreds: async () => await writeData(state.creds, `${sessionId}-creds`) 
//     };
// }

// async function deleteState(sessionId) {
//     const keys = await redis.keys(`baileys:${sessionId}*`);
//     if (keys.length) {
//         await redis.del(keys);
//     }
//     await redis.del(`baileys:${sessionId}-creds`);
//     console.log(`Deleted session data for ${sessionId}`);
// }

// async function getSession(sessionId) {
//     const data = await redis.get(`baileys:${sessionId}`);
//     if (!data) return null;
//     return JSON.parse(data);
// }

// async function getCredSession(sessionId){
//     const data = await redis.get(`baileys:${sessionId}-creds`);
//     if (!data) return null;
//     return JSON.parse(data);
// }

// export { deleteState, getSession, getCredSession };

import { BufferJSON, proto, initAuthCreds } from "baileys";
import { redis } from "./redis.js";

export default async function useRedisAuthState(sessionId) {
    const writeData = async (state, id) => {
        const info = JSON.stringify(state, BufferJSON.replacer);
        return await redis.set(`baileys:${id}`, info);
    };

    const readData = async (id) => {
        const data = await redis.get(`baileys:${id}`);
        if (!data) return null;
        try {
            return JSON.parse(data, BufferJSON.reviver);
        } catch (err) {
            console.error(`Error parsing data for ${id}:`, err);
            return null;
        }
    };

    const removeData = async (id) => {
        try {
            await redis.del(`baileys:${id}`);
        } catch (err) {
            console.error(`Error removing data for ${id}:`, err);
        }
    };

    const creds = (await readData(`${sessionId}-creds`)) || initAuthCreds();

    const state = {
        creds,
        keys: {
            get: async (type, ids) => {
                const data = {};
                await Promise.all(
                    ids.map(async (id) => {
                        let value = await readData(`${sessionId}-${type}-${id}`);

                        if (value && type === 'app-state-sync-key') {
                            value = proto.Message.AppStateSyncKeyData.fromObject(value);
                        }
                        data[id] = value;
                    })
                );
                return data;
            },

            set: async (data) => {
                const tasks = [];
                for (const category of Object.keys(data)) {
                    for (const id of Object.keys(data[category])) {
                        const value = data[category][id];
                        const key = `${sessionId}-${category}-${id}`; // This will be prefixed in writeData/removeData
                        tasks.push(value ? writeData(value, key) : removeData(key));
                    }
                }
                await Promise.all(tasks);
            }
        }
    };

    return {
        state,
        saveCreds: async () => await writeData(state.creds, `${sessionId}-creds`) 
    };
}

async function deleteState(sessionId) {
    const pattern = `baileys:${sessionId}*`;
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
        await redis.del(keys);
    }
    console.log(`Deleted session data for ${sessionId}`);
}

async function getSession(sessionId) {
    const data = await redis.get(`baileys:${sessionId}-creds`);
    if (!data) return null;
    return JSON.parse(data, BufferJSON.reviver);
}

async function getCredSession(sessionId) {
    const data = await redis.get(`baileys:${sessionId}-creds`);
    if (!data) return null;
    return JSON.parse(data, BufferJSON.reviver);
}

export { deleteState, getSession, getCredSession };
